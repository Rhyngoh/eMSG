"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import { useRoomsContext } from "@/context/RoomsContext";
import Sidebar from "@/components/Sidebar";

export default function Layout(props) {
  const { room: roomId } = props.params;
  const { user } = useAuthContext();
  const { setCurrentRoomId } = useRoomsContext();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/signup");
    }
  }, [user]);
  useEffect(() => {
    setCurrentRoomId(roomId);
  }, [roomId]);
  return (
    <>
      {user && (
        <div className="flex justify-around items-center h-screen lg:items-start">
          <aside className="hidden lg:block lg:w-1/5 lg:h-full p-2">
            <Sidebar mobileView={false}/>
          </aside>
          <div className="flex flex-col justify-between items-center px-4 lg:p-2 h-[90dvh] lg:h-screen flex-1 lg:w-4/5">
            <Messages roomId={roomId} />
          </div>
        </div>
      )}
    </>
  );
}
