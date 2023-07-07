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
} from "firebase/firestore";
import { db } from "./../firebase/firebase.config.js";

export default function Messages(props) {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "messages"), where("user", "==", user.uid));
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
