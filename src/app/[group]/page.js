// "use client";

import Image from "next/image";
// import { useAuthContext } from "@/context/AuthContext";
// import { useState, useEffect, use } from "react";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import getAllGroups from "@/firebase/firestore/getAllGroups";
import Layout from "./layout";

// NOTE: This is probably not necessary since almost everything is client-side fetched
export async function generateStaticParams() {
  let groups = await getAllGroups();
  // console.log('================================')
  // console.log(groups);
  return groups.result ? groups.result.map(el => ({ groups: el.id })) : []
}
export default function Page({ params }) {
  // console.log('Group page props', params);
  // const { auth, user } = useAuthContext();
  // const router = useRouter();
  // console.log(router, props);
  // console.log(auth, auth.signOut, user);

  // const messages = use(
  //   queryClient("hello", () => getMessagesByUser("qsKSi3lz12UrKQc3Ql1G"))
  // );
  // console.log("props", messages);
  return (
    <Layout groupId={params.group} paramz={params}/>
  );
}
