'use client'

import { useSignIn } from "@/hooks/useSignIn"
import { useReducer, useRef, useState } from "react";

const signInComponent = () => {
    const {signInMutation, isLoading} = useSignIn();
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
        return signInMutation({username, password});
    }

    if(isLoading === true) {
        console.log("loading works")
    }


    return (
        <div className = "w-min-[150px] h-min-[20px]">
            <input type = "text" placeholder = "enter username" ref = {inputRef} onChange={handleUsername}/>
            <input type = "text" placeholder = "enter password" ref = {passwordRef} onChange={handlePassword} />
            <button onClick={() => handleSignIn()} className = "cursor-pointer">Submit</button>
        </div>
    )
}

export default signInComponent;