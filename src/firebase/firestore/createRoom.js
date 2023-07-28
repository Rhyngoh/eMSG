import { db } from "../firebase.config.js";
import {
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import roomsDocument from "../schema/RoomsCollection/RoomsDocument.js";
 
export default async function createRoom(
  roomName,
  isPrivate = false,
  roomPicture,
) {
  let result = null;
  let error = null;
  let documentBody = roomsDocument;
  documentBody.name = roomName;
  documentBody.private = isPrivate;
  documentBody.room_picture = roomPicture;
  // // console.log("documentBody", documentBody);
  try {
    const docRef = doc(collection(db, "rooms"));
    await setDoc(docRef, { ...documentBody, id: docRef.id });
    result = "success";
  } catch (e) {
    // // console.log("error", e);
    error = e;
  }

  return { result, error };
}
