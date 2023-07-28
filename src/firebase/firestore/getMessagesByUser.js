import { db } from "../firebase.config.js";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default async function getMessagesByUser(userId) {
  let result = null;
  let error = null;
  console.log("getMessagesByuser", result);
  try {
    console.log("db", db, userId);
    const q = query(collection(db, "messages"), where("user", "==", userId));
    console.log("q", q);
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot);
    const messagesList = querySnapshot.docs.map((doc) => doc.data());
    console.log("messagesList", messagesList);
    result = messagesList;
  } catch (e) {
    // // console.log("error", e);
    error = e;
  }
  // // // console.log('results', result)
  return { result, error };
}
