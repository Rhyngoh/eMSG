"use client";

import React from "react";
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

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUp = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password).then(user => {
      // Need to create a user collection record
      return user.user.updateProfile({
        displayName: username
      })
    });
  }
  const logOut = () => {
    return signOut(auth);
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" })
    // console.log(provider);
    return signInWithPopup(auth, provider);
  }
  return (
    <AuthContext.Provider value={{ auth, user, login, logOut, signUp, googleSignIn }}>
      {loading ? <div className="flex flex-col items-center py-10 font-bold text-5xl">Loading...</div> : children}
    </AuthContext.Provider>
  );
};
