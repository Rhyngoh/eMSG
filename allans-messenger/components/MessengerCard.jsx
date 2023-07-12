import React from "react";

import { useAuthContext } from "@/context/AuthContext";

import Image from "next/image";

//? Display previous conversations & old messages
//? Display new conversations & new messages
//? Get the name/email of the other users
//? Get the time of the last message

export default function MessengerCard() {
  const { user } = useAuthContext();
  console.log(user);

  const userImage = user.photoURL;

  return (
    <div>
      <div>
        <div className="py-3 flex justify-between items-center border-b-2">
          <Image
            className="rounded-full"
            src={userImage}
            width={68}
            height={68}
            alt={user?.displayName}
          />
          <p>{user?.displayName}</p>
          {/* <p>{user?.metadata.lastSignInTime}</p> */}
        </div>
      </div>
    </div>
  );
}
