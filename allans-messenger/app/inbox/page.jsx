//! Add `use client` to prevent this page from being server side rendered
"use client";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    //* When user status is known, reset loading state to false
    setLoading(false);

    //* If user is not logged in, redirect to home page
    if (user == null) {
      router.push("/");
    }
  }, [user]);

  if (loading) {
    return <div className="text-5xl font-bold">Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-row-reverse justify-between px-10 py-10">
        {/* User Information */}
        <div className="">
          {user && (
            <>
              <p className="text-sm  font-bold  text-center">{user.uid}</p>
              <p className="text-sm  font-bold  text-center">{user.email}</p>
            </>
          )}
        </div>
        {/* Button */}
        <div>
          <Link className="btn-4" href="/signin">
            Sign Out
          </Link>
        </div>
      </div>
    </>
  );
}
