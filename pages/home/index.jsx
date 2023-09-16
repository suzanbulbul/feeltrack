import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

// Firebase
import { logout } from "../../utilities/firebase";

// Store
import { logout as logoutHandle } from "../../redux/authSlice";
import { logoutComplete } from "../../redux/authSlice";
import { logoutInfo } from "../../redux/infoSlice";
import { logoutInfoComplete } from "../../redux/infoSlice";

//Components
import Modal from '../../components/modal';

// Sections
import InitialModal from '../../sections/initialModal'

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const user = useSelector((state) => state.auth.user?.providerData[0]);
  const userInfo = useSelector((state) => state.auth.info);

 useEffect(() => {
   setTimeout(() => {
     setLoading(false);
   });
 }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutInfo());
      dispatch(logoutInfoComplete());
      dispatch(logoutHandle());
      dispatch(logoutComplete());

      router.push("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div>
     {user && (
        <p>
          Hey <b>{user.displayName}</b> FeedTrick ile güne başla
        </p>
      )}
      <button onClick={handleLogout}>Çıkış</button>
      {!userInfo && <Modal isOpen={modalIsOpen}>
        <InitialModal onClose={closeModal}/>
      </Modal> }
      
    </div>
  );
}

export default Home;
