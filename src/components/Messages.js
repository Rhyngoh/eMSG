"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import InputField from "./InputField.js";
import { useRoomsContext } from "@/context/RoomsContext.js";
import sendMessageToRoom from "@/firebase/firestore/sendMessageToRoom.js";

export default function Messages(props) {
  const { user } = useAuthContext();
  const { roomId } = props;
  const { messages } = useRoomsContext();
  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  if (!user) {
    return (
      <div className="flex flex-col items-center py-10 font-bold text-5xl">
        Loading...
      </div>
    );
  }

  const buttonClick = () => {
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }
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
                {i == messages.length - 1 && <div ref={messageEndRef} />}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={buttonClick}>click</button>
      <div className="flex justify-center items-center w-full">
        {/* <InputField roomId={roomId} /> */}
        <InputField roomId={roomId} onSubmit={sendMessageToRoom} />
      </div>
    </div>
  );
}
