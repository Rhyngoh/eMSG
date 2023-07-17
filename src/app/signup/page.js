"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-2/5">
            <h1 className="text-center text-4xl">Sign up</h1>
            <form onSubmit={handleForm} className="form flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input className="p-2 rounded" onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input className="p-2 rounded" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </div>  
                <div className="flex gap-3 justify-center">
                    <Button type="submit">Sign up</Button>
                    <Link href={'/'}>Back</Link>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Page;
