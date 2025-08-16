import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut} from 'firebase/auth';
import {    
    setDoc,
    doc,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyASDWP6x01DEdAv0t_tr8lC2bxdW5fl3FM",
  authDomain: "netflix-clone-6e320.firebaseapp.com",
  projectId: "netflix-clone-6e320",
  storageBucket: "netflix-clone-6e320.firebasestorage.app",
  messagingSenderId: "60438160665",
  appId: "1:60438160665:web:412bc4f50ff26e467d9188"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(                                          
            doc(db, "users", user.uid),
            { uid: user.uid, name, authProvider: "local", email }
        );  
    } catch (error) {
        console.log(error);
        toast.error(error.code);
        
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}