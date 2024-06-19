"use client"

import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
}

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const router = useRouter()
    useEffect(() => {
      (async() => {
        const { user, error } = await getUser()

        if(error) {
            router.push("/")
            return;
        }

        //if the error did not happen, if everything is alright
        setIsSuccess(true)
      })();
    }, [router])

    if(!isSuccess) {
        return <p>Loading...</p>
    }
    
    return <main>
        <header>Navigation</header>
        {children}
    </main>
}

async function getUser(): Promise<UserResponse> {
    try {
        const { data } = await axios.get("/api/auth/me")

        return {
            user: data,
            error: null,
        }
    } catch (e) {
        const error = e as AxiosError

        return {
            user: null,
            error,
        }
    }
}