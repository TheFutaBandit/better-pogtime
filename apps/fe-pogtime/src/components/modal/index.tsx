import { ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

type Props = {
    children: ReactNode,
    trigger: ReactNode,
    title: string,
    description: string
}

const modal = ({children, trigger, title, description} : Props) => {
    return (<Dialog>
        <DialogTrigger className = "" asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
                {children}
        </DialogContent>
    </Dialog>)
}

export default modal;