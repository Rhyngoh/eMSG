"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { auth, user } = useAuthContext();
  const pathname = usePathname();
  console.log(auth, user);
  return (
    <div>
      <Link href="/">eMSG</Link>
      {!(pathname === '/signin' || pathname === '/signup') && (
        <div>
          {user ? (
            <button onClick={() => auth.signOut()}>Sign Out</button>
          ) : (
            <Link href="/signin">Log in</Link>
          )}
        </div>
      )}
    </div>
  );
}
