import React from "react";

export default function MessengerCard() {
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
          <p>Name</p>
          <p>Time</p>
        </div>
      </div>
    </div>
  );
}
