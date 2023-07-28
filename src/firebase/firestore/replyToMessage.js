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

import repliesDocument from "../schema/RoomsCollection/MessagesCollection/RepliesCollection/RepliesDocument.js";

export default async function replyToMessage(
  messageContents,
  messageId,
  roomId,
  userId
) {
  let result = null;
  let error = null;
  let messageBody = repliesDocument;
  messageBody.content = messageContents;
  messageBody.room_id = roomId;
  messageBody.user_id = userId;
  // // console.log("messageBody", messageBody);
  try {
    const docRef = doc(collection(db, "rooms", `${roomId}`, "messages", `${messageId}`, "replies"));
    await setDoc(docRef, { ...messageBody, id: docRef.id });
    // const messageRef = doc(collection(db, "rooms", `${roomId}`, "messages", `${messageId}`));
    // await updateDoc(messageRef, { replyCount: messageRef.replyCount + 1 });
    result = "success";
  } catch (e) {
    // // console.log("error", e);
    error = e;
  }

  return { result, error };
}
