import { db } from "../firebase.config.js";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default async function getAllGroups() {
  let result = null;
  let error = null;
  try {
    const q = query(collection(db, "groups"));
    const querySnapshot = await getDocs(q);
    const groupsList = querySnapshot.docs.map((doc) => doc.data());
    result = groupsList;
  } catch (e) {
    // console.log("error", e);
    error = e;
  }
  // // console.log('results', result)
  return { result, error };
}
