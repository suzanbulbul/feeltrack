import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

// Firebase
import { logout } from "../../utilities/firebase";

// Store
import { logout as logoutHandle, logoutComplete, selectUser } from "../../redux/userSlice";

// Components
import Loading from '../loading';


const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  const maxInactiveTime = 60 * 60 * 1000;

  const [lastActiveTime, setLastActiveTime] = useState(new Date());

  useEffect(() => {
    const updateLastActiveTime = () => {
      setLastActiveTime(new Date());
    };

    window.addEventListener('mousemove', updateLastActiveTime);
    window.addEventListener('keydown', updateLastActiveTime);

    return () => {
      window.removeEventListener('mousemove', updateLastActiveTime);
      window.removeEventListener('keydown', updateLastActiveTime);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async() => {
      if (new Date() - lastActiveTime >= maxInactiveTime) {
        try {
    
          dispatch(logoutHandle());
          await logout();
          dispatch(logoutComplete());
    
          router.push("/");
          console.log("Logout successful");
        } catch (error) {
          console.error("Logout error:", error);
        }
      }
    }, 60000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lastActiveTime, dispatch, router]);

  useEffect(() => {
    if (router.pathname === "/404") {
      setLoading(false);
    } else if (!user && router.pathname !== "/") {
      router.push("/");
    } else if (user && router.pathname === "/") {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, [user, router.pathname]);

  if (loading) {
    return <Loading />;
  }

  return <main>{children}</main>;
};

export default Wrapper;
