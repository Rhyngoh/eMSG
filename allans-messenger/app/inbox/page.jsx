//! Add `use client` to prevent this page from being server side rendered
"use client";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";

import MessageBar from "@/components/MessageBar";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      return;
    }

    //* When user status is known, reset loading state to false
    setLoading(false);

    if (!user || user === null || user === undefined) {
      router.push("/");
    }
  }, [user]);

  if (loading) {
    return <div className="text-5xl font-bold">Loading...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-row-reverse justify-around lg:justify-between px-2 lg:px-10 py-10">
        {/* User Information */}
        <div className="">
          {user && (
            <>
              <p className="text-sm  font-bold  text-center">{user.uid}</p>
              <p className="text-sm  font-bold  text-center">{user.email}</p>
            </>
          )}
        </div>
        <div className="hidden sm:flex  sm:text-2xl lg:text-5xl text-center font-bold  lg:hidden">
          eMSG
        </div>
        <div className="text-2xl lg:text-5xl text-center font-bold hidden lg:flex">
          eMessages Chat Room
        </div>
        {/* Button */}
        <div>
          <Link className="btn-4" href="/signin">
            Sign Out
          </Link>
        </div>
      </div>
      <hr />

      {/* Title */}
      <div>
        <p className=" pt-7 text-4xl font-bold text-center"> Messages </p>
      </div>

      {/* Chat Wrapper */}
      <div className="flex flex-col justify-around items-center h-screen lg:flex-row-reverse lg:items-start">
        {/* Messages Wrapper */}
        <div className="bg-neutral-100 ms-4 me-10 my-10 h-4/6 w-5/6 rounded-lg shadow-xl">
          <div className="flex flex-col items-center h-screen">
            {/* Chat Area */}
            <div className="bg-white rounded-md mt-7 h-5/6 w-5/6 lg:w-4/6">
              <div className="h-72 w-full"> </div>
            </div>

            {/* Message Bar */}
            <MessageBar />
          </div>
        </div>
        {/* Conversations */}
        <div className="my-10 mx-5">
          <div className="border-x-red-300 lg:border-x-8 lg:px-7 lg:h-screen rounded-xl">
            <p className="text-4xl font-bold">Conversations</p>
            <hr className="mt-5" />
          </div>
        </div>
      </div>
    </>
  );
}
