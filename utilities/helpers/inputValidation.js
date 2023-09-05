export const emailValidation = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return !(email && regex.test(email) === false);
};

export const fNameValidation = (fName) => {
  if (fName) {
    return true;
  }
  return false;
};

export const lNameValidation = (lName) => {
  if (lName) {
    return true;
  }
  return false;
};
