import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Firebase
import { logout } from "../../lib/firebase";

const handleLogout = async () => {
  try {
    await logout();
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
 }
};
const Home = () => {
  return (
    <div>
      <button onClick={handleLogout}>Çıkış</button>
    </div>
  );
}

export default Home;
