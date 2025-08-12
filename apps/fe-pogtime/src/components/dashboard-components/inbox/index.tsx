'use client'

import { useAuthToken } from "@/stores/authStore";
import { notificationOptions } from "@/tanstackQuery/query-options";
import { useQuery } from "@tanstack/react-query";
import { Cross, Loader2Icon, LoaderCircleIcon, MailIcon, MailWarningIcon } from "lucide-react";
import { useState } from "react";
import Modal from "../../modal"
import { Button } from "@/components/ui/button";

type PropsType = {

}

const notificationInbox = (props: PropsType) => {
    const token = useAuthToken();

    const {
        data: notification_data,
        isLoading,
        error,
        isFetching
    } = useQuery(notificationOptions(token));

    if(isLoading) {
        return <Button 
        size = "icon"
        className = "h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
        variant = "outline"
    >
        <LoaderCircleIcon />
        <span className = "sr-only">No mail received</span>
    </Button>
    }

    if(error) {
        return <Button 
        size = "icon"
        className = "h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
        variant = "outline"
    >
        <MailWarningIcon />
        <span className = "sr-only">No mail received</span>
    </Button>
    }

    return (
        <Modal
            title = "Notifications"
            description="Your latest alert notifications. These have been mark as read."
            trigger = {
                <Button 
                            size = "icon"
                            className = "h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                            variant = "outline"
                        >
                            <MailIcon />
                            <span className = "sr-only">Inbox</span>
                </Button>
            }
        >
            {(closeModal) => (
                <div>hi</div>
            )}
        </Modal>
    )


    
}

export default notificationInbox;