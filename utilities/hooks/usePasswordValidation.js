import { useState, useEffect } from "react";

const usePasswordValidation = ({ password = "", requiredLength = 6}) => {
  const [validLength, setValidLength] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);
  const [upperCase, setUpperCase] = useState(null);
  const [lowerCase, setLowerCase] = useState(null);
  const [specialChar, setSpecialChar] = useState(null);

  useEffect(() => {
    setValidLength(password.length >= requiredLength);
    setUpperCase(password.toLowerCase() !== password);
    setLowerCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
  }, [password]);

  return { validLength, hasNumber, upperCase, lowerCase, specialChar };
};

export default usePasswordValidation;
