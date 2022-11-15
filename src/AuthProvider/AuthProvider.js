import React, { createContext, useEffect, useState } from "react";
import {
   createUserWithEmailAndPassword,
   getAuth,
   GoogleAuthProvider,
   onAuthStateChanged,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   const createUser = (email, password) => {
      setLoading(true); 
      return createUserWithEmailAndPassword(auth, email, password);
   };

   const LogIn = (email ,password) => {
      setLoading(true); 
      return signInWithEmailAndPassword(auth, email, password); 
   }

   const addInfo = (profile) => {
      setLoading(true); 
      return updateProfile(auth.currentUser, profile);
   };


   const logOut = () => {
      return signOut(auth); 
   }

  const forgetPassword = (email) => {
   return sendPasswordResetEmail(auth, email); 
  }

  const GoogleLogin = () => {
   setLoading(true); 
   return signInWithPopup(auth, googleProvider); 

  }

   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
         setUser(currentUser); 
         setLoading(false); 
      })


      return ()=> unsubscribe(); 
   })
   const authInfo = {
      createUser,
      addInfo,
      LogIn, 
      user, 
      setUser, 
      loading, 
      setLoading, 
      logOut,
      forgetPassword, 
      GoogleLogin
   };
   return <AuthContext.Provider value={authInfo}>
      {children}
   </AuthContext.Provider>;
};

export default AuthProvider;
