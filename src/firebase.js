import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut,        // ← Added missing comma here
    updateProfile   // ← Now this is properly imported
} from 'firebase/auth';
import {    
    setDoc,
    doc,
    getFirestore 
} from "firebase/firestore";

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
        
        // Update the user's display name
        await updateProfile(user, {
            displayName: name
        });
        
        // Save to Firestore
        await setDoc(                                          
            doc(db, "users", user.uid),
            { 
                uid: user.uid, 
                name: name, 
                authProvider: "local", 
                email: email,
                createdAt: new Date()
            }
        );  
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}