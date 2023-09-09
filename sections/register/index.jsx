import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';

//Firebase
import { register } from "../../utilities/firebase";

// Utilities
import { emailValidation, fNameValidation, lNameValidation } from "../../utilities/helpers/inputValidation";

// Context
import usePasswordValidation from "../../utilities/hooks/usePasswordValidation";

//Icons
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiPencilAlt } from "react-icons/hi";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [firstnameErrorText, setFirstnameErrorText] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [lastnameErrorText, setLastnameErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [setPasswordErrorText] = useState("");

  const [showDirectories, setShowDirectories] = useState(false);  
  const [showPassword, setShowPassword] = useState(true);

  const { validLength, hasNumber, upperCase, lowerCase, specialChar } = usePasswordValidation({
    password: password,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    inputValidation();
  
    try {
      if(inputValidation()) {
        const user = await register(email, password, firstname, lastname);

        if(user) {
          resetForm();
          toast.success("Registration successful.")
        }
     }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          console.log("email already in use");
          setEmailError(true);
          setEmailErrorText("Email Already In Use");
          break;
        case "auth/invalid-email":
          if(!email){
            setEmailError(true);
            setEmailErrorText("Please fill out this field.");
          }
          else{
            setEmailError(true);
            setEmailErrorText("Invalid Email");
          }         
          break;
        case "auth/weak-password":
          console.log("weak password");
          setPasswordError(true);
          setPasswordErrorText("Weak Password");
          break;
          default:
            if(email && password && firstname && lastname){
              toast.error('An error occurred while logging in.')
            }
            else{
              console.log(error)
            }
            break;
      }
    }
  };


  const inputValidation = () => {
    let isValid = true;

    if (!fNameValidation(firstname)  ) {
      setFirstnameError(true);
      setFirstnameErrorText("Please fill out this field.");
      isValid = false;
    }
    if (!lNameValidation(lastname)) {
      setLastnameError(true);
      setLastnameErrorText("Please fill out this field.");
      isValid = false;
    }
    if (!emailValidation(email) || !email) {
      setEmailError(true);
      setEmailErrorText("Please fill out this field.");
      isValid = false;
    }
    if (!validLength || !hasNumber || !upperCase || !lowerCase || !specialChar) {
      createPassword();
      setPasswordError(true);
      isValid = false;
    }
    return isValid;
  }

  const createPassword = () => {
    return (
      <ul className="passwordImprovedValidation">
        <li className={`listItem ${validLength ? "success" : passwordError && "error"}`}>minimum 6 characters</li>
        <li className={`listItem ${upperCase ? "success": passwordError && "error"}`}>one uppercase character</li>
        <li className={`listItem ${lowerCase ? "success": passwordError && "error"}`}>one lowercase character</li>
        <li className={`listItem ${specialChar ? "success" : passwordError && "error"}`}>one special character</li>
        <li className={`listItem ${hasNumber ? "success" : passwordError && "error"}`}>one number</li>
      </ul>
    );
  };

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setPasswordError(false);
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <div className="input input-icon mr-10">
          <HiPencilAlt className="icon" />
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            className={`w-full ${firstnameError ? "test error" : firstname && "success"}`}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            onFocus={() => setFirstnameError(false)}
          />
          {firstnameError && (
             <label className="label text-red-500">{firstnameErrorText}</label>
          )}
        </div>
        <div className="input input-icon ml-10">
          <HiPencilAlt className="icon" />
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            className={`w-full ${lastnameError ? "error" : lastname && "success"}`}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            onFocus={() => setLastnameError(false)}
          />
          {lastnameError && (
            <label className="label">{lastnameErrorText}</label>
          )}
        </div>
      </div>
      <div className="input input-icon">
        <AiOutlineMail className="icon" />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className={`w-full ${emailError ? "error" : email && "success"}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailError(false)}
        />
          {emailError && (
              <label className="label">{emailErrorText}</label>
        )}
      </div>
      <div className={`input input-icon mr-10  ${(showDirectories ||  passwordError) && "improvedContainer"}`}>
        <RiLockPasswordLine className="icon" />
        <input
          type={showPassword ? "password" : "text"}
          id="password"
          placeholder="Password"
          className={`w-full ${passwordError ? "error" : (validLength && hasNumber && upperCase && lowerCase && specialChar) ? "success" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setShowDirectories(true)}
        />
        {password && (
          <span
            className="icon-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BsEyeSlash className="icon right" />
            ) : (
              <BsEye className="icon right" />
            )}
          </span>
        )}
        {(showDirectories ||  passwordError) && createPassword(password)}
      </div>
      <button
        type="submit"
        className="secondaryButton"
      >
        SIGN UP
      </button>
    </form>
  );
}
