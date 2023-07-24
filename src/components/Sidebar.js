"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import getGroupsByUser from "@/firebase/firestore/getGroupsByUser";
import Button from "./Button";

export default function Sidebar(props) {
  const { auth, user } = useAuthContext();
  const { groups, active, setActive, mobileView } = props;
  const pathname = usePathname();
  // console.log(auth, user, groups);
  return (
    // <div className="mb-10 max-w-md absolute left-0 top-px-100 bg-white">
    //   <div className="border-x-red-300 lg:border-x-8 lg:px-7 lg:h-screen rounded-xl">
    //     <p className="text-4xl font-bold">Conversations</p>
    //     <hr className="mt-5" />
    //     <div>
    //       {groups.length > 0 &&
    //         groups.map((group) => (
    //           <div className="py-3 flex justify-between items-center border-b-2">
    //             <Link href={`/${group.id}`} key={group.id}>
    //               {group.name}
    //             </Link>
    //           </div>
    //         ))}
    //     </div>
    //   </div>
    // </div>

    <section className={`flex flex-col ${active ? 'left-[0]' : 'left-[-80%]'} z-20  rounded-r-lg lg:rounded top-0 bottom-0 lg:left-0 transition-all delay-150 duration-500 p-2 w-4/5 ${mobileView ? 'fixed lg:hidden' : 'lg:w-full lg:h-full'} overflow-y-auto`}>
            <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex justify-between">
                    <h1 className="font-bold text-gray-200">eMessages Chat Room</h1>

                    {mobileView && (
                      <Button classOverwrite={'p-1'} onClick={setActive}>
                        X
                      </Button>
                    )}
                </div>

                <hr className="my-2 text-gray-600" />
            </div>

            <div className="mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer">
                <ul className="w-full space-y-2">
                    <li className="p-2 bg-slate-300 hover:bg-slate-400 transition-colors shadow-md rounded block w-full space-x-3">
                      <img src={'https://picsum.photos/300'} width={300} height={300} className="ring-1 w-10 inline rounded-full object-center"/>
                      <span>Room 1</span>
                    </li>
                    <li className="p-2 bg-slate-300 hover:bg-slate-400 transition-colors shadow-md rounded block w-full space-x-3">
                      <img src={'https://picsum.photos/300'} width={300} height={300} className="ring-1 w-10 inline rounded-full object-center"/>
                      <span>Room 2</span>
                    </li>
                    <li className="p-2 bg-slate-300 hover:bg-slate-400 transition-colors shadow-md rounded block w-full space-x-3">
                      <img src={'https://picsum.photos/300'} width={300} height={300} className="ring-1 w-10 inline rounded-full object-center"/>
                      <span>Room 3</span>
                    </li>
                    <li className="p-2 bg-slate-300 hover:bg-slate-400 transition-colors shadow-md rounded block w-full space-x-3">
                      <img src={'https://picsum.photos/300'} width={300} height={300} className="ring-1 w-10 inline rounded-full object-center"/>
                      <span>Room 4</span>
                    </li>
                </ul>
            </div>

            <div className="mt-auto">
              <Button classOverwrite={'p-1'} onClick={() => auth.signOut()}>
                  Sign Out
              </Button>
            </div>
        </section>
  );
}
