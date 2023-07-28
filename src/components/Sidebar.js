"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import getGroupsByUser from "@/firebase/firestore/getGroupsByUser";
import { useRoomsContext } from "@/context/RoomsContext";
export default function Sidebar(props) {
  const { auth, user } = useAuthContext();
  const { groups } = props;
  const { rooms } = useRoomsContext();
  const pathname = usePathname();
  // console.log(rooms);
  // console.log(auth, user, groups);
  return (
    <div className="mb-10 max-w-md absolute left-0 top-px-100 bg-white">
      <div className="border-x-red-300 lg:border-x-8 lg:px-7 lg:h-screen rounded-xl">
        <p className="text-4xl font-bold">Conversations</p>
        <hr className="mt-5" />
        <div>
          {rooms.length > 0 &&
            rooms.map((room) => (
              <div className="py-3 flex justify-between items-center border-b-2">
                <Link href={`/${room.id}`} key={room.id}>
                  {room.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
