"use client";

import React from "react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebase_app from "@/firebase/firebase.config.js";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [currentRoom, setCurrentRoom] = React.useState('123')

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log('User, Auth: ', {user,auth})
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" })
    console.log(provider);
    return signInWithPopup(auth, provider);
  }
  return (
    <AuthContext.Provider value={{ auth, user, googleSignIn }}>
      {loading ? <div className="flex flex-col items-center py-10 font-bold text-5xl">Loading...</div> : children}
    </AuthContext.Provider>
  );
};
