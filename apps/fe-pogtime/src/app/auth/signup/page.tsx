'use client'

import SignUpForm from "@/components/auth-components/SignUpForm";
import { useSignUp } from "@/hooks/useSignUp"
import { useReducer, useRef, useState } from "react";



export default function SignupPage() {
    return (
        <div className = "bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10" style={{fontFamily: 'Sharp Grotesk'}}>
            <div className = "w-full max-w-sm md:max-w-3xl">
                <SignUpForm />
            </div>
        </div>
    )
}