import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Store
import { selectUser, selectUserInfo, selecLoggingOut } from "../../redux/userSlice";

//Components
import Modal from '../../components/modal';

// Sections
import InitialModal from '../../sections/initialModal'
import Head from '../../sections/head';
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
    return <p>Yükleniyor...</p>;
  }
  if (loggingOut) {
    return <p>Çıkış Yapılıyor...</p>;
  }

  return (
    <div>
     <Head title="Feel Track - Home"/>
     {user && (
        <p className='subtitle mb-10'>
          Hey <b>{user.displayName}</b>
          <br/>
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
