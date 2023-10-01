import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Loading from '../loading';
import { selectUser } from '../../redux/userSlice';

const Wrapper = ({ children }) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

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
