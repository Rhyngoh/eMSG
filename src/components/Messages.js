"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "./../firebase/firebase.config.js";
import format from "date-fns/format";
import InputField from "./InputField.js";

export default function Messages(props) {
  const { user } = useAuthContext();
  const { groupId } = props;
  const [messages, setMessages] = useState([]);
  console.log(props);
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("group", "==", groupId),
      orderBy("createdOn", "asc")
    );
    const unsub = onSnapshot(q, (docsSnap) => {
      setMessages(docsSnap.docs.map((doc) => doc.data()));
    });
    return unsub;
  }, []);
  if (!user)
    return (
      <div className="flex flex-col items-center py-10 font-bold text-5xl">
        Loading...
      </div>
    );
  return (
    <div className="flex flex-col justify-around items-center h-auto max-h-full lg:items-start shadow-xl">
      <div className="bg-neutral-100 p-7 m-7 w-[95%] h-[400px] overflow-auto max-h-screen rounded-lg">
        <div className="h-[400px]">
          {messages.map((message, i) => {
            let messageCreatedOn =
              message.createdOn &&
              format(message.createdOn.toDate(), "h:mm a d/M/y");
            return (
              <div key={i}>
                <p>{message.user}</p>
                <p>{message.content}</p>
                <p>{messageCreatedOn}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <InputField groupId={groupId} />
      </div>
    </div>
  );
}
