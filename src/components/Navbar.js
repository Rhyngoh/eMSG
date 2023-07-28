"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { auth, user } = useAuthContext();
  const pathname = usePathname();
  // // console.log(auth, user);
  return (
    <>
      <div className="flex flex-row-reverse justify-around lg:justify-between px-2 lg:px-10 py-10">
        {/* User Information */}
        <div className="text-sm  font-bold  text-left">
          {user && (
            <>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              <p>{user.metadata?.lastSignInTime}</p>
            </>
          )}
        </div>

        {/* Inbox Page Title(s) */}
        <div className="hidden sm:flex  sm:text-2xl lg:text-5xl text-center font-bold  lg:hidden">
          <Link href="/">eMSG</Link>
        </div>
        <div className="text-2xl lg:text-5xl text-center font-bold hidden lg:flex">
          eMessages Chat Room
        </div>

        {/* Sign Out Button */}
        <div>
          {!(pathname === "/signin" || pathname === "/signup") && (
            <div>
              {user ? (
                <button className="btn-4" onClick={() => auth.signOut()}>
                  Sign Out
                </button>
              ) : (
                <Link className="btn-4" href="/signin">
                  Log in
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
