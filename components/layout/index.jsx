import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'; 

// Redux
import { selectUser } from '../../redux/userSlice';

// Components
import Header from '../header';

const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);

  const router = useRouter();

  if (router.pathname === '/' || router.pathname === '/404' || !user) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <Header />
      <main className='p-10'>{children}</main>
    </div>
  );
};

export default Layout;
