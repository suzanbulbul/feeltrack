import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

// Firebase
import { logout } from "../../utilities/firebase";

// Store
import { logout as logoutHandle, logoutComplete, selectUser, selectUserInfo } from "../../redux/userSlice";

// Utilities
import { flattenUserInfo } from "../../utilities/helpers/flattenUserInfo";

//Components
import Modal from '../../components/modal';
import Table from '../../components/table';

// Sections
import InitialModal from '../../sections/initialModal'
import Head from '../../sections/head';


const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const user = useSelector(selectUser);
  const info = useSelector(selectUserInfo);

  // const flattendata= flattenUserInfo(info)

  useEffect(() => {
    if (!info || !user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [info, user]);

  const handleLogout = async () => {
    try {
      dispatch(logoutHandle());
      await logout();
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
     <Head title="Feel Track - Home"/>
     {user && (
        <p>
          Hey <b>{user.displayName}</b> FeedTrick ile güne başla
        </p>
      )}

      {!info ? (
        <Modal isOpen={modalIsOpen}>
          <InitialModal onClose={closeModal} />
        </Modal>
      ) : (
        <Table data={info} />
      )} 

     <button onClick={handleLogout}>Çıkış</button>
    </div>
  );
}

export default Home;
