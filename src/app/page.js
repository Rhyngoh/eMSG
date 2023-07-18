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
//   console.log("query");
//   if (!fetchMap.has(name)) {
//     fetchMap.set(name, query());
//   }
//   return fetchMap.get(name);
// }
import Link from "next/link";
export default function Home(props) {
  const { auth, user } = useAuthContext();
  console.log(auth, auth.signOut, user);
  const router = useRouter();
  const handleSignIn = () => {
    router.push('/signin');
  }
  // const messages = use(
  //   queryClient("hello", () => getMessagesByUser("qsKSi3lz12UrKQc3Ql1G"))
  // );
  // console.log("props", messages);
  return (
    <main className={styles.main}>
      {user ? (
        <div>
          <div>Find a chat room!</div>
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
