//! Add `use client` to prevent this page from being server side rendered
"use client";

import { useState, useEffect } from "react";

import { useAuthContext } from "@/context/AuthContext";

import { getMessages } from "@/firebase/firestore/firestoreConfig";

import MessengerCard from "@/components/MessengerCard";
import MessageBar from "@/components/MessageBar";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [messages, setMessages] = useState([]);

  const { user } = useAuthContext();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col items-center py-10 font-bold text-5xl">
        Loading...
      </div>
    );
  }

  useEffect(() => {
    if (user) {
      router.push("/inbox");
    }
  }, [user]);

  // console.log("Messages from Inbox Page:", messages);

  //* Get messages from the database
  useEffect(() => {
    getMessages().then((messages) => {
      // console.log(messages);
      setMessages(messages);
    });
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-row-reverse justify-around lg:justify-between px-2 lg:px-10 py-10">
        {/* User Information */}
        <div className="text-sm  font-bold  text-left">
          {user && (
            <>
              <p>{user?.displayName}</p>
              <p>{user?.email}</p>
              <p>{user?.metadata.lastSignInTime}</p>
            </>
          )}
        </div>

        {/* Inbox Page Title(s) */}
        <div className="hidden sm:flex  sm:text-2xl lg:text-5xl text-center font-bold  lg:hidden">
          eMSG
        </div>
        <div className="text-2xl lg:text-5xl text-center font-bold hidden lg:flex">
          eMessages Chat Room
        </div>

        {/* Sign Out Button */}
        <div>
          <Link className="btn-4" href="/signin">
            Sign Out
          </Link>
        </div>
      </div>
      <hr />

      {/* Messenger Title */}
      <p className=" pt-7 text-4xl font-bold text-center lg:hidden">Messages</p>

      {/* Chat Wrapper */}
      <div className="flex flex-col justify-around items-center h-screen lg:flex-row-reverse lg:items-start">
        {/* Messages Wrapper */}
        <div className="bg-neutral-100 ms-4 me-10 my-10 h-4/6 w-4/6 rounded-lg shadow-xl">
          <div className="flex flex-col items-center h-screen">
            {/* Chat Area */}
            <div className="bg-white rounded-md mt-7 h-5/6 w-5/6">
              <div className="h-72 w-full">
                {/* //TODO Show Chat Messages */}
                {messages.map((message) => {
                  return (
                    <div className="flex">
                      {/* <p>{message.user}</p> */}
                      <p>{message.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message Bar */}
            <MessageBar />
          </div>
        </div>

        {/* Conversations */}
        <div className="my-10">
          <div className="border-x-red-300 lg:border-x-8 lg:px-7 lg:h-screen rounded-xl">
            <p className="text-4xl font-bold">Conversations</p>
            <hr className="mt-5" />

            {/* Messenger Card */}
            <MessengerCard />
          </div>
        </div>
      </div>
    </>
  );
}
