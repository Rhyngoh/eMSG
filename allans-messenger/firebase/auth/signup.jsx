//* Import firebase_app from config.js, signInWithEmailAndPassword, and getAuth from firebase/auth
import firebase_app from "../config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

//* Initialize Firebase
const auth = getAuth(firebase_app);

//* Sign up (create user)
export default async function signUp(email, password, name) {
  let result = null,
    error = null;
  try {
    //* Create user with email and password (sign up)
    result = await createUserWithEmailAndPassword(auth, email, password);

    console.log("Result", result);
    console.log("Auth Current User", auth.currentUser);

    //* Update user profile
    await updateProfile(auth.currentUser, { displayName: name });

    return { result };
  } catch (e) {
    //! Handle errors here
    console.error("Error signing up:", error);
    error = e;
  }

  return { result, error };
}
