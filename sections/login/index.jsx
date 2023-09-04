import React, { useState } from "react";
import { useRouter } from 'next/router';

//Firebase
import { login } from "../../lib/firebase";

//Icons
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(email, password);
      if(user){
        // router.push("/home");
      }
      else{
        console.log("user", user);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="input input-icon">
        <AiOutlineMail className="icon" />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input input-icon">
        <RiLockPasswordLine className="icon" />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        disabled={!email || !password}
        type="submit"
        className="secondaryButton"
      >
        GİRİŞ YAP
      </button>
    </form>
  );
}
