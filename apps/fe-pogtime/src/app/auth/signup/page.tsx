'use client'

import { useSignUp } from "@/hooks/useSignUp"
import { useReducer, useRef, useState } from "react";

const SignUpComponent = () => {
    const {signUpMutation, isLoading} = useSignUp();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    function handleUsername() {
        setUsername(inputRef.current!.value)
    }

    function handlePassword() {
        setPassword(passwordRef.current!.value)
    }

    function handleSignIn() {
        console.log("invoking signinMutation")
        return signUpMutation({username, password});
    }


    return (
        <div className = "w-min-[150px] h-min-[20px]">
            <input type = "text" placeholder = "enter username" ref = {inputRef} onChange={handleUsername} disabled = {isLoading}/>
            <input type = "text" placeholder = "enter password" ref = {passwordRef} onChange={handlePassword} disabled = {isLoading}/>
            <button onClick={() => handleSignIn()} className = "cursor-pointer">Submit</button>
        </div>
    )
}

export default SignUpComponent;