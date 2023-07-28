"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import getGroupsByUser from "@/firebase/firestore/getGroupsByUser";
import Button from "./Button";
import RoomButton from "./RoomButton";
import { useRoomsContext } from "@/context/RoomsContext";
export default function Sidebar(props) {
  const { auth, user, currentRoom, setCurrentRoom } = useAuthContext();
  const { groups, active, setActive, mobileView } = props;
  const { rooms } = useRoomsContext();
  const pathname = usePathname();
  return (
    <section
      className={`flex flex-col ${
        active
          ? "left-[0] before:left-0"
          : "left-[-80%] before:left-[100%] before:hidden"
      } z-20  rounded-r-lg lg:rounded top-0 bottom-0 lg:left-0 transition-all delay-150 duration-500 p-2 w-4/5 ${
        mobileView
          ? 'fixed lg:hidden bg-gray-700 overflow-y-visible before:contents-[""] before:w-screen before:h-screen before:bg-gray-600 before:absolute before:left-0 before:top-0 before:-z-20 before:opacity-50 before:blur-md'
          : "before:hidden lg:w-full lg:h-full overflow-y-auto"
      } `}
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex justify-between">
          <h1 className="font-bold text-gray-200">eMessages Chat Room</h1>

          {mobileView && (
            <Button classOverwrite={"p-1"} onClick={setActive}>
              X
            </Button>
          )}
        </div>

        <hr className="my-2 text-gray-600" />
      </div>

      <div className="mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer">
        <ul className="w-full space-y-2">
          {rooms.length > 0 &&
            rooms.map((room) => {
              return <RoomButton name={room.name} roomId={room.id} />;
            })}
          {/* <RoomButton name={'Room 1'} roomId={'123'} />
                    <RoomButton name={'Room 2'} roomId={'456'} />
                    <RoomButton name={'Room 3'} roomId={'879'} />
                    <RoomButton name={'Room 4'} roomId={'741'} /> */}
        </ul>
      </div>

      <div className="mt-auto">
        <Button classOverwrite={"p-1"} onClick={() => auth.signOut()}>
          Sign Out
        </Button>
      </div>
    </section>
  );
}
