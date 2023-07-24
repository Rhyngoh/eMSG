"use client";

import Image from "next/image";
import { useState, useEffect, use } from "react";
import setMessagesByUser from "@/firebase/firestore/setMessagesByUser";
import { useAuthContext } from "@/context/AuthContext";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// import sendMessageToRoom from "@/firebase/firestore/sendMessageToRoom";
// import replyToMessage from "@/firebase/firestore/replyToMessage";

export default function InputField(props) {
  const { user } = useAuthContext();
  const { roomId, messageId, onSubmit } = props;
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    if (!inputValue) return;
    if (!user) return;
    
    e.preventDefault();

    // setMessagesByUser(inputValue, groupId, user.uid);
    if (messageId) {
      // replyToMessage(inputValue, messageId, roomId, user.uid);
      onSubmit(inputValue, messageId, roomId, user.uid);
    } else {
      // sendMessageToRoom(inputValue, roomId, user.uid);
      onSubmit(inputValue, roomId, user.uid);
    }
    setInputValue('');
  }
  return (
    <form onSubmit={handleSubmit} className="my-10 h-4/6 w-5/6">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg flex flex-row-reverse items-center justify-between">
          <BsFillArrowRightCircleFill
            onClick={handleSubmit}
            className="cursor-pointer"
            size={32}
          />
          <input
            id="message-input"
            onChange={handleInputChange}
            value={inputValue}
            className="w-full p-3 me-3 rounded-xl outline-none border-2 border-sky-200 focus:border-sky-400"
            type="text"
            placeholder="Start typing here. . ."
          />
        </div>
      </div>
    </form>
  );
}
