import React from 'react';
import { useRouter } from 'next/router';

// Firebase
import { logout } from "../../utilities/firebase";

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
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
