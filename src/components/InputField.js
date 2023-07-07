"use client";

import Image from "next/image";
import { useState, useEffect, use } from "react";
import setMessagesByUser from "@/firebase/firestore/setMessagesByUser";
import { useAuthContext } from "@/context/AuthContext";
export default function InputField(props) {
  const { user } = useAuthContext();
  const { groupId } = props;
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    setMessagesByUser(inputValue, groupId, user.uid);
  }
  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Send</button>
    </>
  );
}
