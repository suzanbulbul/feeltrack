// import { initializeApp } from "firebase/app";
import firebase  from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STROAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAING_SENDER_ID,
   appId: process.env.REACT_APP_ID,
};

// This step is intended to prevent Firebase from being initialized multiple times, as Firebase should only be initialized once anywhere in the project.
if(!firebase.apps.length){ 
  firebase.initializeApp(firebaseConfig);
};

const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user, "user");
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

export default firebase;

