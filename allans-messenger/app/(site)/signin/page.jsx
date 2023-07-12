//! Add `use client` to prevent this page from being server side rendered
"use client";

import React, { useState } from "react";

import signIn from "@/firebase/auth/signin";

import { getAuth, signInWithPopup } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";

import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";

import FormControls from "@/components/FormControls";

import { BsGoogle } from "react-icons/bs";

import { FaUser } from "react-icons/fa";

import { RiLoginCircleLine } from "react-icons/ri";

export default function Page() {
  const auth = getAuth();

  //* Create state variables for email and password
  const [email, setEmail] = useState("");

  //* Create state variables for email and password
  const [password, setPassword] = useState("");

  //* Create a router variable
  const router = useRouter();

  //* Sign in (authenticate user) and sign out
  const signInWithGoolge = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    if (!auth && !provider) {
      toast.error("Google Auth failed!");
    }

    if (auth && provider) {
      provider.addScope("profile");
      provider.addScope("email");

      signInWithPopup(auth, provider)
        .then(() => {
          router.push("/inbox");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //* Create a function to handle the form for Email and Password
  const handleForm = async (event) => {
    //* Prevent the default form action
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      toast.error("Sign In failed!");
      return console.log(error);
    }

    //* else successful
    toast.success("Sign In successful!");
    console.log(result);
    return router.push("/inbox");
  };

  //* Go to Sign up page
  const handleSignUp = () => {
    router.push("/");
  };

  //* Return the form
  return (
    //* Wrapper Div
    <div className="wrapper">
      {/* Form Wrapper */}
      <div className="form-wrapper flex flex-col">
        {/* Title Div */}
        <div className="py-10">
          <h1 className="text-4xl lg:text-5xl text-center font-bold px-2">
            Sign In to eMSG Chat
          </h1>
        </div>

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

        <div className="flex flex-col justify-between items-center my-5">
          {/* Buttons Wrapper */}
          <div className="flex flex-row-reverse items-center">
            {/* Login */}
            <RiLoginCircleLine
              type="submit"
              className="mx-auto ms-5 cursor-pointer"
              size={37}
              onClick={handleForm}
            ></RiLoginCircleLine>

            {/* Sign-up URL */}
            <FaUser
              className="cursor-pointer"
              size={34}
              onClick={handleSignUp}
            ></FaUser>

            {/* Google Sign In */}
            <BsGoogle
              className="mx-auto me-5 cursor-pointer"
              size={34}
              onClick={signInWithGoolge}
            >
              Google Sign-In
            </BsGoogle>
          </div>
        </div>
      </div>
    </div>
  );
}
