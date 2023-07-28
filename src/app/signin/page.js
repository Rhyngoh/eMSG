"use client";
import React, { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import FormControls from "@/components/FormControls";
import { BsGoogle } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import getUserFromUsersCollection from "@/firebase/firestore/getUserFromUsersCollection";
function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { googleSignIn, login, auth } = useAuthContext();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      let result = await googleSignIn();
      // // console.log(result);
      if (result?.user) {
        let { res, error } = await getUserFromUsersCollection(result?.user);
        // // console.log('res', res);
      }
      router.push("/");
    } catch (e) {
      // // console.log(e);
      toast.error("Google Sign Up Failed");
      return;
    }
  };
  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);
    // console.log(result, error);
    if (error) {
      toast.error("Sign In Failed");
      return console.error("error", error);
    }

    // else successful
    toast.success("Sign In Successful");
    // console.log(result);
    return router.push("/");
  };
  const handleSignUp = () => {
    router.push("/signup");
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper flex flex-col">
        <div className="py-10">
          <h1 className="text-4xl lg:text-5xl text-center font-bold px-2">
            Sign In to eMSG Chat
          </h1>
        </div>
        <form onSubmit={handleForm} className="form">
          <FormControls
            label="Email"
            type="email"
            id="email"
            value={email}
            setValue={setEmail}
          />
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
              <button type="submit">
                <RiLoginCircleLine
                  type="submit"
                  className="mx-auto ms-5 cursor-pointer"
                  size={37}
                  onClick={handleForm}
                ></RiLoginCircleLine>
              </button>

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
                onClick={handleGoogleSignIn}
              >
                Google Sign-In
              </BsGoogle>
            </div>
          </div>
        </form>
        <p className="text-center">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
