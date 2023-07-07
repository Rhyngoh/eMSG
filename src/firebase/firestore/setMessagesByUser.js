import { db } from "../firebase.config.js";
import { setDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import message from "../schema/message.js";

export default async function setMessagesByUser(messageContents, groupId, userId) {
  let result = null;
  let error = null;
  let messageBody = message;
  messageBody.content = messageContents;
  messageBody.group = groupId;
  messageBody.user = userId;

  try {
    const docRef = doc(collection(db, "messages"));
    await setDoc(docRef, {...messageBody, id: docRef.id})
    // console.log('db', db, userId);
    // const q = query(collection(db, "messages"), where("user", "==", userId));
    // console.log('q', q);
    // const querySnapshot = await getDocs(q);
    // console.log('querySnapshot', querySnapshot);
    // const messagesList = querySnapshot.docs.map((doc) => doc.data());
    // console.log("messagesList", messagesList);
    // result = messagesList;
    result = "success";
  } catch (e) {
    console.log('error', e);
    error = e;
  }

  return { result, error };
}
