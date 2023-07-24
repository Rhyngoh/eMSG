"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { auth, user } = useAuthContext();
  const pathname = usePathname();
  const [mobileNavOpenState, setMobileNavOpenState] = useState(false)
  // console.log(auth, user);
  return (
    <>
      <Sidebar mobileView={true} active={mobileNavOpenState} setActive={() => setMobileNavOpenState(!mobileNavOpenState)} />
      <div className="flex justify-around lg:justify-between px-2 lg:px-10 py-3 lg:hidden h-[10dvh]">
        {/* Sign Out Button */}
        {(pathname !== "/signin" && pathname !== "/signup") && (
            user && (
              <Button classOverwrite={'p-1'} onClick={() => setMobileNavOpenState(!mobileNavOpenState)}>
                so
              </Button>
            )
            // ) : (
            //   <Link className="btn-4" href="/signin">
            //     Log in
            //   </Link>
            // )
        )}

        {/* User Information */}
        {/* <div className="text-sm  font-bold  text-left">
          {user && (
            <>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              {/* <p>{user.metadata?.lastSignInTime}</p> /}
            </>
          )}
        </div> */}

        {/* Inbox Page Title(s) */}
        {/* <div className="hidden sm:flex  sm:text-2xl lg:text-5xl text-center font-bold  lg:hidden">
          <Link href="/">eMSG</Link>
        </div>
        <div className="text-2xl lg:text-5xl text-center font-bold hidden lg:flex">
          eMessages Chat Room
        </div> */}

        
      </div>
    </>
  );
}
