import React, { useState } from "react";
import { useRouter } from 'next/router';

//Firebase
import { register } from "../../lib/firebase";

//Icons
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiPencilAlt } from "react-icons/hi";

export default function Register() {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await register(email, password);
      if(user) {
        console.log("register", user);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
     <div className="flex justify-between items-center">
        <div className="input input-icon mr-10">
          <HiPencilAlt className="icon"/>
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            className="w-full  text-gray-700 focus:border-blue-500"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="input input-icon ml-10">
          <HiPencilAlt className="icon"/>
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            className="w-full  text-gray-700 focus:border-blue-500"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
      </div>
      <div className="input input-icon">
        <AiOutlineMail className="icon"/>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full  text-gray-700 focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input input-icon">
        <RiLockPasswordLine className="icon"/>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full  text-gray-700 focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        disabled={!email || !password}
        type="submit"
        className="secondaryButton"
      >
        KAYIT OL
      </button>
    </form>
  );
}
