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
import sendMessageToRoom from "@/firebase/firestore/sendMessageToRoom";
import replyToMessage from "@/firebase/firestore/replyToMessage";
import getUserFromUsersCollection from "@/firebase/firestore/getUserFromUsersCollection";
import createRoom from "@/firebase/firestore/createRoom";

export default function Home(props) {
  const { user } = useAuthContext();
  const router = useRouter();
  const handleSignIn = () => {
    router.push('/signin');
  }

  return (
    <div className='lg:flex lg:h-screen h-[90dvh]'>
    <aside className="hidden lg:block lg:w-1/5 lg:h-full p-2">
      <Sidebar mobileView={false}/>
    </aside>
    <main className={'flex flex-col justify-between items-center px-4 lg:p-2 h-[90dvh] lg:h-screen flex-1 lg:w-4/5'}>
      {user ? (
        <div>
          <div>Find a chat room!</div>
          <InputField roomId="WdQ7uZ7PrPR2ua9HPEWh" onSubmit={sendMessageToRoom} />
          <InputField roomId="WdQ7uZ7PrPR2ua9HPEWh" messageId="rXUTbhT1882VhOKzsv1S" onSubmit={replyToMessage} />
          <p>Create a room</p>
          <InputField addRoom={true} roomPicture="https://picsum.photos/200/300" onSubmit={createRoom} />
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
      </div>
  );
}
