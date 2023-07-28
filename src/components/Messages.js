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
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) {
    return (
      <div className="flex flex-col items-center py-10 font-bold text-5xl">
        Loading...
      </div>
    );
  }

  const buttonClick = () => {
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  return (
    <div className="bg-gray-700 rounded-lg shadow-lg flex flex-col justify-around items-center w-full h-auto max-h-full lg:items-start">
      <div className="px-8 py-5 w-full overflow-auto lg:min-h-[90dvh]">
        <div className="space-y-5">
          {messages &&
            messages.map((message, i) => {
              let messageCreatedOn =
                message.created_on &&
                format(message.created_on.toDate(), "h:mm a d/M/y");
              return (
                <div className="flex gap-3 bg-gray-300 p-2 rounded-md relative last:after:hidden after:contents-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-0.5 after:bg-black">
                  <img
                    src={"https://picsum.photos/300"}
                    width="40"
                    height="40"
                    className="inline w-10 h-10 rounded-full object-center"
                  />
                  <div>
                    <h3 className="text-xl">
                      User
                      <span className="text-xs leading-none">
                        {messageCreatedOn}
                      </span>
                    </h3>
                    <p>{message.content}</p>
                  </div>
                  {i == messages.length - 1 && <div ref={messageEndRef} />}
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full h-[10dvh]">
        <InputField roomId={roomId} onSubmit={sendMessageToRoom} />
      </div>
    </div>
  );
}
