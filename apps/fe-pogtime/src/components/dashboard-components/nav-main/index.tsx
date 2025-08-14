"use client"

import CreateWebsite from "@/components/create-website"
import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton } from "@/components/ui/sidebar"
import { useAuthToken } from "@/stores/authStore"
import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {Bounce, toast, ToastContainer} from 'react-toastify';
import NotificationInbox from '../inbox'
import { useQueryClient } from "@tanstack/react-query"

type PropItems = {
    items:{
        title: string,
        url: string,
        icon?: LucideIcon
    }[]
}

function NavMain({items} : PropItems) {
    const router = useRouter();
    const path_name = usePathname();

    const [token, setToken] = useState<string>();

    const socketRef = useRef<WebSocket | null>(null);

    const client = useQueryClient();



    

    const notify = (warningContent: string) => toast.warn(warningContent, {
                                        position: "bottom-left",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        transition: Bounce,
                                    });

    useEffect(() => {
        const t = localStorage.getItem("auth-storage");
        const user_obj = JSON.parse(t!); 
        setToken(user_obj.state.user);
    }, [])

    useEffect(() => {
        if(!token) return;

        //console.log("AM I NOT WORKING")

        const socket = new WebSocket(`ws://localhost:3004?user_id=${token}`);

        socketRef.current = socket;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            //console.log(message.payload)
            notify(message.payload.message.message);
            client.invalidateQueries({queryKey: ['user-notifications', token]});
        }
        

        () => {
            //console.log("websocket cleaning up")
            if(socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    }, [token])
    return (
        <>
        <SidebarGroup>
            <SidebarGroupContent className = "flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className = "flex items-center gap-2">
                        <CreateWebsite />
                        <NotificationInbox />
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key = {item.title}>
                            <SidebarMenuButton 
                                tooltip = {item.title} 
                                className = "cursor-pointer"
                                onClick={() => {router.push(`${item.url}`)}}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}  </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            limit = {3}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
        </>
    )
}

export default NavMain;