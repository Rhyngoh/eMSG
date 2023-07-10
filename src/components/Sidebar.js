"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import getGroupsByUser from "@/firebase/firestore/getGroupsByUser";

export default function Sidebar(props) {
  const { auth, user } = useAuthContext();
  const { groups } = props;
  const pathname = usePathname();
  console.log(auth, user, groups);
  return (
    <div>
      {groups.length > 0 &&
        groups.map((group) => (
          <Link href={`/${group.id}`} key={group.id}>
            <div>{group.name}</div>
          </Link>
        ))
      }
    </div>
  );
}
