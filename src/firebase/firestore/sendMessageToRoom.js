import { db } from "../firebase.config.js";
import {
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import messagesDocument
 from "../schema/RoomsCollection/MessagesCollection/MessagesDocument.js";

 export default async function sendMessageToRoom(
  messageContents,
  roomId,
  userId
) {
  let result = null;
  let error = null;
  let messageBody = messagesDocument;
  messageBody.content = messageContents;
  messageBody.room_id = roomId;
  messageBody.user_id = userId;
  // console.log("messageBody", messageBody);
  try {
    const docRef = doc(collection(db, "rooms", `${roomId}`, "messages"));
    await setDoc(docRef, { ...messageBody, id: docRef.id });
    result = "success";
  } catch (e) {
    // console.log("error", e);
    error = e;
  }

  return { result, error };
}
