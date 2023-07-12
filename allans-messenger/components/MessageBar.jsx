import React from "react";

import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function MessageBar() {
  return (
    <div className="my-10 h-4/6 w-5/6">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg flex flex-row-reverse items-center justify-between">
          <BsFillArrowRightCircleFill
            onClick={() => {}}
            className="cursor-pointer"
            size={32}
          />
          <input
            className="w-full p-3 me-3 rounded-xl outline-none border-2 border-sky-200 focus:border-sky-400"
            type="text"
            placeholder="Start typing here. . ."
          />
        </div>
      </div>
    </div>
  );
}
