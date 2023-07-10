"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import getMessagesByUser from "./../firebase/firestore/getMessagesByUser";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
// const fetchMap = new Map();
// function queryClient(name, query) {
//   console.log("query");
//   if (!fetchMap.has(name)) {
//     fetchMap.set(name, query());
//   }
//   return fetchMap.get(name);
// }
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home(props) {
  const { auth, user } = useAuthContext();
  console.log(auth, auth.signOut, user);

  // const messages = use(
  //   queryClient("hello", () => getMessagesByUser("qsKSi3lz12UrKQc3Ql1G"))
  // );
  // console.log("props", messages);
  return (
    <main className={styles.main}>
      {user ? (
        <div>
          <div>
            HOME
          </div>
        </div>
      ) : (
        <Link href="/signin">Log in</Link>
      )}
    </main>
  );
}
