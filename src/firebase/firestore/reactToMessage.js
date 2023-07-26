import { db } from "../firebase.config.js";
import {
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

import reactionsDocument from "../schema/RoomsCollection/MessagesCollection/ReactionsCollection/ReactionsDocument.js";
// import reactionsDocument from "../schema/RoomsCollection/MessagesCollection/RepliesCollection/ReactionsCollection/ReactionsDocument.js";
export default async function reactToMessage(
  reactionName,
  messageId,
  roomId,
  userId
) {
  let result = null;
  let error = null;
  let messageBody = reactionsDocument;
  messageBody.name = reactionName;
  messageBody.user = userId;
  console.log("messageBody", messageBody);
  try {
    const docRef = doc(collection(db, "rooms", `${roomId}`, "messages", `${messageId}`, "reactions"));
    await setDoc(docRef, { ...messageBody, id: docRef.id });
    // const messageRef = doc(collection(db, "rooms", `${roomId}`, "messages", `${messageId}`));
    // await updateDoc(messageRef, { replyCount: messageRef.replyCount + 1 });
    result = "success";
  } catch (e) {
    console.log("error", e);
    error = e;
  }

  return { result, error };
}
