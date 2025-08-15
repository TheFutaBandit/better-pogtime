import { useSignUp } from "@/hooks/useSignUp";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";



export function SignUpForm({
    className,
    ...props
  }: React.ComponentProps<"div">) {
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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        signUpMutation({username, password});
    }

    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome User!</h1>
                  <p className="text-muted-foreground text-balance">
                    Sign Up to Navigate the Seas better.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="FutaBandit"
                    required
                    ref = {inputRef} 
                    onChange={handleUsername} 
                    disabled = {isLoading}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    ref = {passwordRef} 
                    onChange={handlePassword} 
                    disabled = {isLoading}
                />
                </div>
                <Button className = "cursor-pointer w-full" type="submit">
                  Signup
                </Button>
                
                <div className="text-center text-sm">
                   Already have an account?{" "}
                  <Link href = "/auth/signin" className="underline underline-offset-4">
                    Log in
                  </Link>
                </div>
              </div>
            </form>
            <div className="bg-[#000] relative hidden md:block overflow-hidden">
                <video
                    className = "absolute inset-0 w-full h-full scale-120 dark:brightness-[0.9]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src = "/Video_Ready_Sails_Fixed.mp4" 
                >

                </video>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          All rights reserved by <a href="#">Futo Inc</a>.
        </div>
      </div>
    )
  }

export default SignUpForm;

