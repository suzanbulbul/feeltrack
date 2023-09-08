import React from 'react';
import Link from 'next/link';

//Icons
import { BiUserCircle } from "react-icons/bi";
import { MdAutoGraph } from "react-icons/md";

const Header = () => {
  return (
    <div className="header">
      <div className="flex justify-between items-center">
        <span></span>
        <Link href="/home">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/feel-track.appspot.com/o/logo-white.svg?alt=media&token=854088fa-f9fc-4a83-a965-e22f77b7daa2"
            alt="logo"
          />
        </Link>
        <div className="flex justify-between items-center">
          <Link href="/analysis">
            <MdAutoGraph className="icon"/>
          </Link>
          <BiUserCircle className="icon"/>
        </div>
      </div>
    </div>
  );
}

export default Header;
