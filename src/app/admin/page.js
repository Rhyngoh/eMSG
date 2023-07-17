'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import authSignOut from '@/firebase/auth/signout'
function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const handleSignOut = (e) => {
        e.preventDefault()

        authSignOut()
    }

    return (
        <>
            <h1>Only logged in users can view this page</h1>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </>
    );
}

export default Page;