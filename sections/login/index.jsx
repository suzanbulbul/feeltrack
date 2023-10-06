import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

//Firebase
import { login } from "../../utilities/firebase";

//Redux
import { loginHandle, updateSelectedItems } from "../../redux/userSlice"; // userSlice dosyanıza uygun yolu vermelisiniz
import { infoHandle } from "../../redux/userSlice"; 

//Icons
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = inputValidation();

    try {
      if (isValid) {
        const user = await login(email, password);
        if (user) {
          dispatch(loginHandle(JSON.stringify(user)));
          dispatch(infoHandle(user.userData));
          dispatch(updateSelectedItems(user.userData.completedDays['16.12.2023']));
          updateSelectedItems
          toast.success("Login successful.");
          router.push("/home");
        }
      }
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setEmailError(true);
          setPasswordError(true);
          setEmailErrorText("User not found. Please enter a valid email.");
          break;
        case "auth/wrong-password":
          setPasswordError(true);
          setPasswordErrorText("Please enter the correct password.");
          break;
        default:
          if (email && password) {
            toast.error('An error occurred while logging in.')
            console.log(error)
          } else {
            console.log(error)
          }
          break;
      }
    }
  };

  const inputValidation = () => {
    let isValid = true;
    if (!email) {
      setEmailError(true);
      setEmailErrorText("Please fill out this field.");
      isValid = false;
    }
    if (!password) {
      setPasswordError(true);
      setPasswordErrorText("Please fill out this field.");
      isValid = false;
    }
    return isValid;
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="input input-icon">
        <AiOutlineMail className="icon" />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className={`w-full ${emailError ? "test error" : email && "success"}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailError(false)}
        />
        {emailError && (
          <label className="label text-red-500">{emailErrorText}</label>
        )}
      </div>
      <div className="input input-icon">
        <RiLockPasswordLine className="icon" />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={`w-full ${passwordError ? "test error" : password && "success"}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordError(false)}
        />
        {passwordError && (
          <label className="label text-red-500">{passwordErrorText}</label>
        )}
      </div>
      <button type="submit" className="secondaryButton">
        LOGIN
      </button>
    </form>
  );
}
