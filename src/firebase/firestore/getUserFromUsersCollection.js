import { db } from "../firebase.config.js";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import addUserToUsersCollection from "./addUserToUsersCollection.js";

export default async function getUserFromUsersCollection(user) {
  let result = null;
  let error = null;
  // // console.log(user);
  try {
    // const q = query(collection(db, "users"));
    const docRef = doc(db, "users", user.uid);
    // // // console.log("q", q);
    // // console.log(docRef);
    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
      // // console.log("Document data:", querySnapshot.data());
      result = querySnapshot.data();
    } else {
      // Create user document
      // // console.log('create user document');
      await addUserToUsersCollection(user.displayName, [], user.displayName, user.email, user.photoURL);
    }
    // // console.log("querySnapshot", querySnapshot);
  } catch (e) {
    // // console.log("error", e);
    error = e;
  }
  // // // console.log('results', result)
  return { result, error };
}
