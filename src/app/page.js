"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import getMessagesByUser from "./../firebase/firestore/getMessagesByUser";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home(props) {
  
  const fetchMap = new Map();
  function queryClient(name, query) {
    // console.log("query");
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query());
    }
    return fetchMap.get(name);
  }

  const { auth, user } = useAuthContext();

  const router = useRouter();
  const handleSignIn = () => {
    router.push('/signin');
  }

  // const messages = use(
  //   // queryClient("hello", () => getMessagesByUser("DwTGgEwuz0ZFiOElzPTkQ7Ekct22"))
  // );

  // console.log("Messages", messages);
  console.log("User", user);

  return (
    <div className='lg:flex lg:h-screen h-[90dvh]'>
    <aside className="hidden lg:block lg:w-1/5 lg:h-full p-2">
      <Sidebar mobileView={false}/>
    </aside>
    <main className={'flex flex-col justify-between items-center px-4 lg:p-2 h-[90dvh] lg:h-screen flex-1 lg:w-4/5'}>
      {user ? (
          <Messages groupId='1234' />
      ) : (
        <div className="flex flex-col justify-center">
          <p>Welcome to eMSG</p>
          <button className="btn-4" onClick={handleSignIn}>
            Log in
          </button>
        </div>
      )}
    </main>
      </div>
  );
}
