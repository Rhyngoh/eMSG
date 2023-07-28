import { db } from "../firebase.config.js";
import {
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import usersDocument from "../schema/RoomsCollection/UsersCollection/UsersDocument.js";

export default async function addUserToRoom(
  userId,
  roomId,
  displayName,
  roles = [],
  permissions = null,
) {
  let result = null;
  let error = null;
  let documentBody = usersDocument;
  documentBody.display_name = displayName;
  documentBody.roles = roles;
  documentBody.permissions = permissions;
  documentBody.id = userId;
  // console.log("documentBody", documentBody);
  if (!roomId) return { error: 'roomId is required' };

  try {
    const docRef = doc(collection(db, "rooms", `${roomId}`, "users"));
    await setDoc(docRef, documentBody);
    const roomRef = doc(collection(db, "users", `${userId}`));
    console.log(roomRef, roomRef?.room_ids, roomId);
    await setDoc(roomRef, { room_ids: [...roomRef.room_ids, roomId]});
    result = "success";
  } catch (e) {
    // console.log("error", e);
    error = e;
  }

  return { result, error };
}
