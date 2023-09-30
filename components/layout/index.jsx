import React from 'react';
import { useRouter } from 'next/router'; 

// Components
import Header from '../header';

const Layout = ({ children }) => {

  const router = useRouter();

  if (router.pathname === '/' || router.pathname === '/404' ) {
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
