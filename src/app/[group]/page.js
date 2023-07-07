// "use client";

import Image from "next/image";
// import { useAuthContext } from "@/context/AuthContext";
// import { useState, useEffect, use } from "react";
import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import getAllGroups from "@/firebase/firestore/getAllGroups";
import GroupLayout from "@/components/GroupLayout";
export async function generateStaticParams() {
  let groups = await getAllGroups();
  console.log('================================')
  console.log(groups);
  return groups.result ? groups.result.map(el => el.id) : []
}
export default async function Page({ params }) {
  console.log('Group page props', params);
  // const { auth, user } = useAuthContext();
  // const router = useRouter();
  // console.log(router, props);
  // console.log(auth, auth.signOut, user);

  // const messages = use(
  //   queryClient("hello", () => getMessagesByUser("qsKSi3lz12UrKQc3Ql1G"))
  // );
  // console.log("props", messages);
  return (
    // <div>
    //   {/* <div>
    //     <InputField />
    //   </div>
    //   <div>
    //     <Messages groupId={1} />
    //   </div> */}
    // </div>
    <GroupLayout group={params.group}/>
  );
}
