import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useRoomsContext } from "@/context/RoomsContext";
function RoomButton({ name, roomId, roomPicture }) {
  // const {currentRoom, setCurrentRoom } = useAuthContext();
  const router = useRouter();
  const { currentRoomId } = useRoomsContext();

  const handleClick = (e) => {
    console.log("Clicked room: ", e.target.id);
    router.push(`/${roomId}`);


    // setCurrentRoom(e.target.id)
  };
  return (
    <li
      onClick={handleClick}
      id={roomId}
      className={`${
        roomId === currentRoomId && "!bg-slate-500"
      } bg-slate-300 p-2  hover:bg-slate-400 transition-colors shadow-md rounded block w-full space-x-3`}
      key={roomId}
    >
      <img
        src={roomPicture || "https://picsum.photos/300"}
        width={300}
        height={300}
        className="ring-1 w-10 inline rounded-full object-center"
      />
      <span>{name}</span>
    </li>
  );
}

export default RoomButton;
