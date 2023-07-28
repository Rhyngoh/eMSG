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
      <div className="flex justify-start lg:justify-end px-2 lg:px-10 py-3 lg:hidden h-[10dvh] shadow-sm">
        {/* Sign Out Button */}
        {(pathname !== "/signin" && pathname !== "/signup") && (
            user && (
                <div onClick={() => setMobileNavOpenState(!mobileNavOpenState)}>
                  <button class="relative group">
                    <div class="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                      <div class="flex flex-col pt-1 justify-between w-[20px] h-[20px] transform transition-all duration-100 origin-center overflow-hidden group-focus:rotate-90">
                        <div class="bg-white h-[2px] w-7 transform transition-all duration-300 group-focus:w-0 delay-75"></div>
                        <div class="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:w-0 delay-75"></div>
                        <div class="bg-white h-[2px] w-7 transform transition-all duration-300 group-focus:w-0 delay-75"></div>
                        <div class=" w-0 h-0  overflow-hidden transform transition-all duration-300 group-focus:w-12 group-focus:h-12 group-focus:-mt-2 delay-150">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6h-6 w-6  text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
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
