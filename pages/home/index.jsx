import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

// Firebase
import { logout } from "../../utilities/firebase";

// Store
import { logout as logoutHandle } from "../../redux/authSlice";
import { logoutComplete } from "../../redux/authSlice";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const isLoggingOut = useSelector((state) => state.auth.isLoggingOut);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutHandle());
      dispatch(logoutComplete());

      router.push("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div>
      {user &&
       <p>Hey <b>{user.displayName}</b> FeedTrick ile güne başla</p>}
      <button onClick={handleLogout}>Çıkış</button>
    </div>
  );
}

export default Home;
