"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import getAllGroups from "@/firebase/firestore/getAllGroups";
export default function Page(props) {
  console.log('proop',props);
  const { auth, user } = useAuthContext();
  const router = useRouter();
  console.log(router, props);
  console.log(auth, auth.signOut, user);
  return (
    <div>
      <div>
        <InputField groupId={props.group} />
      </div>
      <div>
        <Messages groupId={props.group} />
      </div>
    </div>
  );
}
