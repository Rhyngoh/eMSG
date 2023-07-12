import { db } from "../config";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  query,
  where,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

//* Get Messages from the database
export const getMessages = async () => {
  //* Get a list of messages from the database
  // const querySnapshot = await getDocs(collection(db, "messages"));
  // console.log("Messages from database:", querySnapshot);

  //* Get a list of messages from the database
  const messageRef = collection(db, "messages");
  console.log("Messages", messageRef);

  const q = query(messageRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  //* Create an array of messages
  const messages = [];
  //* For each document in the querySnapshot, push the data into the messages array
  querySnapshot.forEach((doc) => {
    messages.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  console.log("Messages from database:", messages);
  return messages;
};

//* Set Messages in the database
export const setDatabaseMessages = async (user, inputValue) => {
  //* Add a new document in collection "messages" with ID "message-id"
  await setDoc(
    doc(db, "messages", "message-id"),
    {
      name: user?.uid,
      message: inputValue,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
};
