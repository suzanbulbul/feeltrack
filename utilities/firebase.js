import { initializeApp } from "firebase/app";
// import firebase  from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore fonksiyonlarını içe aktarın

const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STROAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAING_SENDER_ID,
   appId: process.env.REACT_APP_ID,
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


// // Firebase daha önce başlatılmadıysa başlatın
// if (!app.apps.length) {
//   // Firebase daha önce başlatılmadıysa başlat
//   initializeApp(firebaseConfig);
// }


// // This step is intended to prevent Firebase from being initialized multiple times, as Firebase should only be initialized once anywhere in the project.
// if(!firebase.apps.length){ 
//   firebase.initializeApp(firebaseConfig);
// };


export const register = async (email, password, firstname, lastname) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", user.uid), {
      firstname: firstname,
      lastname: lastname,
    });
    return user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default app;

