"use client";
import React, { useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import FormControls from "@/components/FormControls";
import { FaUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password, name);

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    } else if (error) {
      toast.error("Sign up failed, please try again");
      return console.log(error);
    } else {
      console.log(result);
      return router.push("/");
    }
  };
  const handleSignIn = () => {
    router.push("/signin");
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper flex flex-col">
        <div className="py-10">
          <h1 className="text-4xl lg:text-5xl text-center font-bold px-2">
            Sign Up to eMSG Chat
          </h1>
        </div>
        <form onSubmit={handleForm} className="form">
          <FormControls
            label="Name"
            type="name"
            id="displayName"
            value={name}
            setValue={setName}
          />
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
          <div className="flex justify-center mx-auto">
            <div className="flex items-center">
              <button className="btn-4" type="submit" onClick={handleForm}>
                Register
              </button>
            </div>
          </div>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
