"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import getAllGroups from "@/firebase/firestore/getAllGroups";
import Sidebar from "@/components/Sidebar";

export default function Layout(props) {
  // console.log("proop", props);
  const { group: groupId } = props.params;
  const { auth, user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    console.log(auth, user);
    if (user === null) {
      router.push("/signup");
    }
  }, []);

  // console.log(router, props);
  // console.log(auth, auth.signOut, user);
  return (
    <>
      <div className='lg:flex lg:h-screen h-[90dvh]'>
        <aside className="hidden lg:block lg:w-1/5 lg:h-full p-2">
          <Sidebar mobileView={false}/>
        </aside>
        {user && (
          <div className="flex flex-col justify-between items-center px-4 lg:p-2 h-[90dvh] lg:h-screen flex-1 lg:w-4/5">
              <Messages groupId={groupId} />
          </div>
        )}
      </div>
    </>
  );
}
