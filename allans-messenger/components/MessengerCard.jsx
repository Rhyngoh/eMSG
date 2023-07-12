import React from "react";

import { useAuthContext } from "@/context/AuthContext";

//? Display previous conversations & old messages
//? Display new conversations & new messages
//? Get the name/email of the other users
//? Get the time of the last message

export default function MessengerCard() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div>
      <div>
        <div className="py-3 flex justify-between items-center border-b-2">
          <img
            src="https://placehold.co/600x400"
            width={68}
            height={68}
            alt="Placeholder Image"
          />
          <p>{user?.displayName}</p>
          <p>{user?.metadata.lastSignInTime}</p>
        </div>
      </div>
    </div>
  );
}
