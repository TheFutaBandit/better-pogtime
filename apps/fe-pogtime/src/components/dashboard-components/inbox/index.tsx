'use client'

import { getAuthToken, useAuthToken } from "@/stores/authStore";
import { notificationOptions } from "@/tanstackQuery/query-options";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cross, Loader2Icon, LoaderCircleIcon, MailIcon, MailWarningIcon, ThumbsUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../../modal"
import { Button } from "@/components/ui/button";
import axios from "axios";


type PropsType = {

}

type user_notifications_type = {
    content: string;
    createdAt: Date;
}[]

type NotificationContainerPropType = {
    user_notifications : user_notifications_type
}

const NotificationCardContainer = ({user_notifications}: NotificationContainerPropType) => {
    if(!user_notifications || user_notifications.length === 0) {
        return (
            <div className = "flex text-[12px] text-muted-foreground items-center justify-center">No Alerts, nice!</div>
        )
    }

    return (
        <div className = "overflow-y-auto flex flex-col max-h-[250px] gap-3">
            {
                user_notifications.map((item, index) => {
                    return <NotificationCard content = {item.content} createdAt={item.createdAt} key={index}/>
                })
            }
        </div>
    )
}

const NotificationCard = ({content, createdAt} : {content: string, createdAt: Date}) => {
    const date = new Date(createdAt)
    return (
        <div className = "border-1 rounded-sm mr-1">
            <div className = "flex justify-between gap-2 p-2 text-[14px]">
                <div>{content}</div>
                <div className = "text-muted-foreground">{date.toDateString()}</div>
            </div>
        </div>
    )
}

const notificationInbox = (props: PropsType) => {
    const token = useAuthToken();
    const client = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);

    const {
        data: notification_data,
        isLoading,
        error,
        isFetching,
        refetch
    } = useQuery(notificationOptions(token));

    // Mark notifications as read when modal opens
    useEffect(() => {
        if (modalOpen) {
            const markReadNotifications = async () => {
                if (!token) return;
                try {
                    await axios.post("http://localhost:3001/api/v1/notify/markAllRead", {}, {
                        headers: { Authorization: `${token}` }
                    });
                    // Optionally refetch after marking as read
                    refetch();
                } catch (err) {
                    console.log(err);
                }
            };
            markReadNotifications();
        }
    }, [modalOpen, token, refetch]);

    // Only show loader if loading and modal is open
    if ((isLoading || isFetching) && modalOpen) {
        return <Button 
            size="icon"
            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
            variant="outline"
        >
            <LoaderCircleIcon />
            <span className="sr-only">Loading notifications...</span>
        </Button>
    }

    if (error) {
        return <Button 
            size="icon"
            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
            variant="outline"
        >
            <MailWarningIcon />
            <span className="sr-only">Error loading notifications</span>
        </Button>
    }

    return (
        <Modal
            title="Notifications"
            description="Your latest alert notifications. These have been marked as read."
            trigger={
                <Button 
                    size="icon"
                    className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0 relative"
                    variant="outline"
                    onClick={() => setModalOpen(true)}
                >
                    {notification_data && notification_data.data !== null && notification_data.data.length !== 0 && (
                        <div className="absolute h-[10px] w-[10px] rounded-lg top-[-1] right-[-1] bg-[#fff]"></div>
                    )}
                    <MailIcon />
                    <span className="sr-only">Inbox</span>
                </Button>
            }
        >
            {(closeModal) => {
                // Reset modal open state when closed
                const handleClose = () => {
                    setModalOpen(false);
                    closeModal();
                };
                return (!notification_data || !notification_data.data) ? (
                    <div className="flex items-center flex-center p-2"><ThumbsUpIcon /> No Alerts! Good Job! </div>
                ) : (
                    <NotificationCardContainer user_notifications={notification_data.data} />
                );
            }}
        </Modal>
    );
}

export default notificationInbox;