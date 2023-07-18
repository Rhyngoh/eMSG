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
  orderBy
} from "firebase/firestore";
import { db } from "./../firebase/firebase.config.js";

export default function Messages(props) {
  const { user } = useAuthContext();
  const { groupId } = props;
  const [messages, setMessages] = useState([]);
  console.log(props);
  useEffect(() => {
    const q = query(collection(db, "messages"), where("group", "==", groupId), orderBy("createdOn", "asc"));
    const unsub = onSnapshot(q, (docsSnap) => {
      setMessages(docsSnap.docs.map((doc) => doc.data()));
    });
    return unsub;
  }, []);
  return (
    <div>
      {messages?.map((el, index) => {
        return <div key={index}>{el.content}</div>;
      })}
    </div>
  );
}
