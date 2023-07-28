"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import getAllGroups from "@/firebase/firestore/getAllGroups";

export default function Layout(props) {
  // // console.log("proop", props);
  const { room: roomId } = props.params;
  const { auth, user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    // // console.log(auth, user);
    if (user === null) {
      router.push("/signup");
    }
  });

  // // console.log(router, props);
  // // console.log(auth, auth.signOut, user);
  return (
    <>
      {user && (
        <div className="flex flex-col justify-around items-center h-screen lg:flex-row-reverse lg:items-start">
          <div className="w-5/6">
            <Messages roomId={roomId} />
          </div>
        </div>
      )}
    </>
  );
}
