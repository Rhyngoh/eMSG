//! Add `use client` to prevent this page from being server side rendered
"use client";

import React, { useState } from "react";

import { toast } from "react-hot-toast";

import signUp from "@/firebase/auth/signup";

import { useRouter } from "next/navigation";

import FormControls from "@/components/FormControls";

import { FaUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";

export default function Page() {
  const [name, setName] = useState("");

  //* Create state variables for email and password
  const [email, setEmail] = useState("");

  //* Create state variables for email and password
  const [password, setPassword] = useState("");

  //* Create a router variable
  const router = useRouter();

  //* Create a function to handle the form
  const handleForm = async (e) => {
    //* Prevent the default form action
    e.preventDefault();

    const { result, error } = await signUp(email, password, name);

    if (!name || !email || !password) {
      toast.error("Please enter in all the fields!");
      console.log(error);
    } else if (error) {
      toast.error("Sign up failed, please try again!");
      console.log(error);
    } else {
      toast.success("Sign up successful!");
      return router.push("/inbox");
    }
  };

  //* Go to sign in page
  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    //* Wrapper Div
    <div className="wrapper">
      {/* Form Wrapper */}
      <div className="form-wrapper flex flex-col">
        {/* Title Div */}
        <div className="py-10">
          <h1 className="text-4xl lg:text-5xl text-center font-bold px-2">
            Sign Up to eMSG Chat
          </h1>
        </div>

        {/* Form Controls: Name */}
        <FormControls
          label="Name"
          type="name"
          id="displayName"
          value={name}
          setValue={setName}
        />
        {/* Form Controls: Email */}
        <FormControls
          label="Email"
          type="email"
          id="email"
          value={email}
          setValue={setEmail}
        />
        {/* Form Controls: Password */}
        <FormControls
          label="Password"
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
        />

        {/* Buttons Wrapper */}
        <div className="flex justify-center mx-auto">
          <div className="flex items-center">
            {/* Register Button */}
            <FaUser
              className="cursor-pointer"
              size={34}
              onClick={handleForm}
              type="submit"
            >
              Register
            </FaUser>
            {/* Login URL */}
            <RiLoginCircleLine
              size={37}
              className="cursor-pointer mx-5 mt-1"
              onClick={handleSignIn}
            >
              Login to Account
            </RiLoginCircleLine>
          </div>
        </div>
      </div>
    </div>
  );
}
