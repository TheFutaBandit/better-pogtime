"use client"

import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

type Props = {
    children: (closeModal: () => void) => ReactNode,
    trigger: ReactNode,
    title: string,
    description: string
}

const modal = ({children, trigger, title, description} : Props) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
    <Dialog open = {open} onOpenChange={setOpen}>
        <DialogTrigger className = "" asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
                {children(closeModal)}
        </DialogContent>
    </Dialog>)
}

export default modal;