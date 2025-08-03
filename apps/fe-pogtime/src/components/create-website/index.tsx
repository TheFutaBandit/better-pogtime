'use client'

import { PlusCircleIcon } from "lucide-react"
import Modal from "../modal"
import { SidebarMenuButton } from "../ui/sidebar"
import WebsiteForm from "./create-website-form"

type Props = {

}

const MenuButton = () => {
    return (
        <SidebarMenuButton 
            tooltip = "Create Website"
            className = "flex items-center min-w-8 bg-primary text-primary-foreground duration-200 ease-linear \
            hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 \
            active:text-primary-foreground"
        >
            <PlusCircleIcon />
            <span>Quick Create</span>
        </SidebarMenuButton>
    )
}

const CreateWebsite = (props: Props) => {
    return (
        <Modal
            title = "Add A Website"
            description = "bruh why you even reading this ain't nun special about adding a website lmao just add it and close me"
            trigger = {
                <SidebarMenuButton 
                    tooltip = "Create Website"
                    className = "flex items-center min-w-8 bg-primary text-primary-foreground duration-200 ease-linear \
                    hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 \
                    active:text-primary-foreground"
                >
                    <PlusCircleIcon />
                    <span>Quick Create</span>
                </SidebarMenuButton>
            }>
            {(closeModal) => (
                <WebsiteForm onFormSubmit = {closeModal}  />  
            )}
        </Modal>
    )
}

export default CreateWebsite;