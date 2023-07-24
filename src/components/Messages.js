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
  // console.log('Message Props: ', props);
  // useEffect(() => {
  //   const q = query(
  //     collection(db, "messages"),
  //     where("group", "==", groupId),
  //     orderBy("createdOn", "asc")
  //   );
  //   const unsub = onSnapshot(q, (docsSnap) => {
  //     setMessages(docsSnap.docs.map((doc) => doc.data()));
  //   });
  //   return unsub;
  // }, []);
  if (!user)
    return (
      <div className="flex flex-col items-center py-10 font-bold text-5xl">
        Loading...
      </div>
    );
  return (
    <div className="flex flex-col justify-around items-center w-full h-auto max-h-full lg:items-start">
      <div className="bg-blue-100 px-8 py-5 w-full overflow-auto lg:min-h-[90dvh] rounded-lg">
        <div className="space-y-5">
              <div className="flex gap-3 relative last:after:hidden after:contents-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-black">
                <img src={'https://picsum.photos/300'} width='40' height='40' className="inline w-10 h-10 rounded-full object-center"/>
                <div>
                  <h3 className="text-xl">User <span className="text-sm">{new Date().toLocaleDateString()}</span></h3>
                  <p>This is a message</p>                  
                </div>                
              </div>
              <div className="flex gap-3 relative last:after:hidden after:contents-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-black">
                <img src={'https://picsum.photos/300'} width='40' height='40' className="inline w-10 h-10 rounded-full object-center"/>
                <div>
                  <h3 className="text-xl">User <span className="text-sm">{new Date().toLocaleDateString()}</span></h3>
                  <p>This is a message</p>                  
                </div>                
              </div>
              <div className="flex gap-3 relative last:after:hidden after:contents-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-black">
                <img src={'https://picsum.photos/300'} width='40' height='40' className="inline w-10 h-10 rounded-full object-center"/>
                <div>
                  <h3 className="text-xl">User <span className="text-sm">{new Date().toLocaleDateString()}</span></h3>
                  <p>This is a message</p>                  
                </div>                
              </div>
          {console.log(messages)}
          {messages && messages.map((message, i) => {
            let messageCreatedOn =
              message.createdOn &&
              format(message.createdOn.toDate(), "h:mm a d/M/y");
            return (
              // <div key={i} className="group/msg-item">
              //   <p>{message.user}</p>
              //   <p>{message.content}</p>
              //   <p>{messageCreatedOn}</p>
              //   <hr className="border-0 h-0.5 bg-slate-900 group-last:hidden"/>
              // </div>

              <div key={i} className="flex gap-3 relative last:after:hidden after:contents-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-black">
                <img src={'https://picsum.photos/300'} width='40' height='40' className="inline w-10 h-10 rounded-full object-center"/>
                <div>
                  <h3 className="text-xl">{message.user} <span className="text-sm">{new Date(messageCreatedOn).toLocaleDateString()}</span></h3>
                  <p>{message.content}</p>                  
                </div>                
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-[10dvh]">
        <InputField groupId={groupId} />
      </div>
    </div>
  );
}
