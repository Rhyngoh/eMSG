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
// export async function generateStaticParams() {
//   let groups = await getAllGroups();
//   // console.log('================================')
//   // console.log(groups);
//   return groups.result ? groups.result.map(el => ({ groups: el.id })) : []
// }
export default function Page() {
  return (
    <Layout />
  );
}
