"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import getAllGroups from "@/firebase/firestore/getAllGroups";

export default function Layout(props) {
  console.log('proop', props);
  const { group: groupId } = props.params;
  const { auth, user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    console.log(auth, user);
    if (user === null) {
      router.push("/signup");
    }
  })

  console.log(router, props);
  console.log(auth, auth.signOut, user);
  return (
    <div>
      {user && (
        <div>
          <div>
            <Messages groupId={groupId} />
          </div>
          <div>
            <InputField groupId={groupId} />
          </div>
        </div>
      )}
    </div>
  );
}
