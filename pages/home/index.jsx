import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

// Firebase
import { logout } from "../../utilities/firebase";

//Store
import { logoutHandle } from "../../redux/authSlice";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state);
  console.log(user, "user");

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutHandle());
      router.push("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
   }
  };

  return (
    <div>
      <button onClick={handleLogout}>Çıkış</button>
    </div>
  );
}

export default Home;
