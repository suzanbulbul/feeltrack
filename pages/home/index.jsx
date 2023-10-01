import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Store
import { selectUser, selectUserInfo, selecLoggingOut } from "../../redux/userSlice";

//Components
import Modal from '../../components/modal';
import Loading from '../../components/loading';
import Head from '../../components/head';

// Sections
import InitialModal from '../../sections/initialModal'
import DailyList from '../../sections/dailyList';


const Home = () => {

  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const user = useSelector(selectUser);
  const info = useSelector(selectUserInfo);
  const loggingOut = useSelector(selecLoggingOut);


  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return <Loading/>;
  }
  if (loggingOut) {
    return <p>Çıkış Yapılıyor...</p>;
  }

  return (
    <div>
      <Head title="Feel Track - Home" />
      {user && (
        <p className="subtitle mb-10">
          Hey <b className='custom-capitalize'>{user.displayName}</b>
          <br />
          FeedTrick ile güne başla
        </p>
      )}
      {!info ? (
        <Modal isOpen={modalIsOpen}>
          <InitialModal onClose={closeModal} />
        </Modal>
      ) : (
        <DailyList />
      )}
    </div>
  );
}

export default Home;
