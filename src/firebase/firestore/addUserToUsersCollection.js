import { db } from "../firebase.config.js";
import {
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import userDocument from "../schema/UsersCollection/UserDocument.js";

export default async function addUserToUsersCollection(
  displayName,
  roomIds = [],
  username,
  email,
  profilePic,
) {
  let result = null;
  let error = null;
  let documentBody = userDocument;
  documentBody.display_name = displayName;
  documentBody.room_ids = roomIds;
  documentBody.username = username;
  documentBody.email = email;
  documentBody.profile_pic = profilePic;
  console.log("documentBody", documentBody);
  if (!username) return { error: 'username is required' };
  if (!email) return { error: 'email is required' };

  try {
    const docRef = doc(collection(db, "users"));
    await setDoc(docRef, { ...documentBody, id: docRef.id });
    result = "success";
  } catch (e) {
    console.log("error", e);
    error = e;
  }

  return { result, error };
}
