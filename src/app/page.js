"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import getMessagesByUser from "./../firebase/firestore/getMessagesByUser";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
// const fetchMap = new Map();
// function queryClient(name, query) {
//   // console.log("query");
//   if (!fetchMap.has(name)) {
//     fetchMap.set(name, query());
//   }
//   return fetchMap.get(name);
// }
import Link from "next/link";
import sendMessageToRoom from "@/firebase/firestore/sendMessageToRoom";
import replyToMessage from "@/firebase/firestore/replyToMessage";
import getUserFromUsersCollection from "@/firebase/firestore/getUserFromUsersCollection";

export default function Home(props) {
  const { auth, user } = useAuthContext();
  // console.log(auth, auth.signOut, user);
  const router = useRouter();
  // useEffect(() => {
  //   fetchUsers();
  // }, [])
  // const fetchUsers = async () => {
  //   let user1 = await getUserFromUsersCollection("ngoh.ryan@gmail.com");
  //   let user2 = await getUserFromUsersCollection("rngoh@getmegiddy.com");
  //   // console.log(user1, user2)
  // }
  const handleSignIn = () => {
    router.push('/signin');
  }
  // const messages = use(
  //   queryClient("hello", () => getMessagesByUser("qsKSi3lz12UrKQc3Ql1G"))
  // );
  // // console.log("props", messages);
  return (
    <main className={styles.main}>
      {user ? (
        <div>
          <div>Find a chat room!</div>
          <InputField roomId="WdQ7uZ7PrPR2ua9HPEWh" onSubmit={sendMessageToRoom} />
          <InputField roomId="WdQ7uZ7PrPR2ua9HPEWh" messageId="rXUTbhT1882VhOKzsv1S" onSubmit={replyToMessage} />

        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <p>Welcome to eMSG</p>
          <button className="btn-4" onClick={handleSignIn}>
            Log in
          </button>
        </div>
      )}
    </main>
  );
}
