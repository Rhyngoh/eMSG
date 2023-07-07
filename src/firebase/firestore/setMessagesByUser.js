import { db } from "../firebase.config.js";
import {
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import message from "../schema/message.js";

export default async function setMessagesByUser(
  messageContents,
  groupId,
  userId
) {
  let result = null;
  let error = null;
  let messageBody = message;
  messageBody.content = messageContents;
  messageBody.group = groupId;
  messageBody.user = userId;
  console.log("messageBody", messageBody);
  try {
    const docRef = doc(collection(db, "messages"));
    await setDoc(docRef, { ...messageBody, id: docRef.id });
    result = "success";
  } catch (e) {
    console.log("error", e);
    error = e;
  }

  return { result, error };
}
