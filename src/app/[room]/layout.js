"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Messages from "@/components/Messages";
import { useRouter } from "next/navigation";
import { useRoomsContext } from "@/context/RoomsContext";

export default function Layout(props) {
  const { room: roomId } = props.params;
  const { user } = useAuthContext();
  const { setRoomId } = useRoomsContext();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/signup");
    }
  }, [user]);
  useEffect(() => {
    setRoomId(roomId);
  }, [roomId]);
  return (
    <>
      {user && (
        <div className="flex flex-col justify-around items-center h-screen lg:flex-row-reverse lg:items-start">
          <div className="w-5/6">
            <Messages roomId={roomId} />
          </div>
        </div>
      )}
    </>
  );
}
