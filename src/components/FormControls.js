import React from "react";

export default function FormControls({ label, type, id, value, setValue }) {
  return (
    <div className="pb-5 flex flex-col items-center">
      <label htmlFor={id}>
        <p>{label}</p>
        <input
          className="
            text-black 
            h-10 
            ps-5 
            px-5
            rounded-lg 
            text-lg 
            ring-2
            ring-inset
            ring-purple-200
            focus:ring-4
            focus:ring-purple-300
            outline-none
            bg-gray-50
            leading-6
            cursor-pointer
          "
          onChange={(e) => setValue(e.target.value)}
          required
          value={value}
          type={type}
          name={id}
          id={id}
          placeholder={
            id === "email"
              ? "example@email.com"
              : id === "displayName"
              ? "username"
              : "password"
          }
        />
      </label>
    </div>
  );
}