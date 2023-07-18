"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import getAllGroups from "@/firebase/firestore/getAllGroups";

export default function Layout(props) {
  console.log("proop", props);
  const { group: groupId } = props.params;
  const { auth, user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    console.log(auth, user);
    if (user === null) {
      router.push("/signup");
    }
  });

  console.log(router, props);
  console.log(auth, auth.signOut, user);
  return (
    <>
      {user && (
        <div className="flex flex-col justify-around items-center h-screen lg:flex-row-reverse lg:items-start">
          <div className="bg-neutral-100 ms-4 me-10 my-10 h-4/6 w-4/6 rounded-lg shadow-xl">
            <div className="bg-white rounded-md mt-7 h-5/6 w-5/6">
              <div className="h-72 w-full">
                <Messages groupId={groupId} />
              </div>
            </div>
            <div>
              <InputField groupId={groupId} />
            </div>
          </div>
          {/* <div className="my-10">
            <div className="border-x-red-300 lg:border-x-8 lg:px-7 lg:h-screen rounded-xl">
              <p className="text-4xl font-bold">Conversations</p>
              <hr className="mt-5" />

              <div>MESSENGER CARD</div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
