import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";

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

export const register = async (email, password, firstname, lastname) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    const displayName = `${firstname} ${lastname}`;
    await updateProfile(user, { displayName });
    
    // Saved user information to Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstname: firstname,
      lastname: lastname,
      email: email,
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

export const saveUserInformation = async (userId, wakeupTime, bedtime, exercise, items) => {
  try {
    const userRef = doc(db, "users", userId);
    const dataToUpdate = {
      userInfo: {
        wakeupTime: wakeupTime,
        bedtime: bedtime,
        exercise: exercise,
        extraInfo: items,
      },
    };

    // Firestore dokümanı güncelleme işlemi
    await updateDoc(userRef, dataToUpdate);
    
    return "İşlem başarıyla tamamlandı", dataToUpdate.userInfo;
  } catch (error) {
    console.error("Veritabanı güncelleme hatası: ", error);
    throw error;
  }
};








export default app;

