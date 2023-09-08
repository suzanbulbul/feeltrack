import React from 'react';

// Components
import Header from '../header';
const Layout = ({ children }) => {

  return (
    <div>
      <Header />
      <main className='px-10'>{children}</main>
    </div>
  );
};

export default Layout;
