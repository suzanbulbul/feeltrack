import React from 'react';
import { useRouter } from 'next/router'; 

// Components
import Header from '../header';
const Layout = ({ children }) => {

  const router = useRouter();

  if (router.pathname === '/' ) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <Header />
      <main className='px-10'>{children}</main>
    </div>
  );
};

export default Layout;
