import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

// Firebase
import { logout } from "../../utilities/firebase";
// Store
import { logout as logoutHandle, logoutComplete } from "../../redux/userSlice";

// Icons
import { BiUserCircle } from "react-icons/bi";
import { MdAutoGraph } from "react-icons/md";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userEditor, setUserEditor] = useState(false);

  const userEditorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userEditorRef.current && !userEditorRef.current.contains(event.target)) {
        setUserEditor(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setUserEditor(false);

      dispatch(logoutHandle());
      await logout();
      dispatch(logoutComplete());

      router.push("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const routeringPage = (page) => () => {
    setUserEditor(false);
    router.push(page);
  }

  return (
    <div className="header">
      <div className="flex justify-between items-center">
        <Link className="logo" href="/home">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/feel-track.appspot.com/o/logo-white.svg?alt=media&token=854088fa-f9fc-4a83-a965-e22f77b7daa2"
            alt="logo"
          />
        </Link>
        <div className="flex justify-between items-center">
          <Link href="/analysis">
            <MdAutoGraph className="icon" />
          </Link>
          <div ref={userEditorRef}>
            <BiUserCircle onClick={() => setUserEditor(!userEditor)} className={`icon ${userEditor && `active`}`} />
            {userEditor && (
              <div className="user-editor">
                <ul>
                  <li>
                    <button onClick={routeringPage("/analysis")}>Analysis</button>
                  </li>
                  <li>
                    <button onClick={routeringPage("/settings")}>Settings</button>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Çıkış</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
