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
    <div className="flex flex-col justify-around items-center h-auto max-h-full lg:flex-row-reverse lg:items-start">
      {/* Messages Wrapper */}
      <div className="bg-neutral-100 ms-4 me-10 my-10 h-4/6 w-4/6 max-h-full rounded-lg shadow-xl">
        <div className="flex flex-col items-center h-screen">
          {/* Chat Area */}
          <div className="bg-white rounded-md mt-7 h-5/6 w-5/6">
            <div className="h-72 w-full">
              {/* //TODO Show Chat Messages */}
              {messages.map((message, i) => {
                let messageCreatedOn = message.createdOn && format(message.createdOn.toDate(), 'h:mm a d/M/y')
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
        </div>
      </div>
    </div>
    // {/* <div>
    //   {messages?.map((el, index) => {
    //     return <div key={index}>{el.content}</div>;
    //   })}
    // </div> */}
  );
}
