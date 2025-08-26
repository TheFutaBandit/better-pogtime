'use client'

import LoginForm from "@/components/auth-components/LogInForm";
import { useRedirectIfAuth } from "@/hooks/useAuth";
import { useSignIn } from "@/hooks/useSignIn"
import { useReducer, useRef, useState } from "react";



export default function LoginPage() {
    return (
        <div className = "bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10" style={{fontFamily: 'Sharp Grotesk'}}>
            <div className = "w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    )
}
