import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Drill, MoreVerticalIcon } from "lucide-react"


export function NavUser({
    user
} : {
    user : {
        name: string,
        email: string,
        Avatar: string
    }
}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                        <SidebarMenuButton
                            size = "lg"
                            className = "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className = "h-8 w-8 grayscale rounded-lg">
                                <AvatarImage src = {user.Avatar} alt = {user.name} />
                                <AvatarFallback className = "rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className = "grid flex-1 text-left leading-tight">
                                <span className = "truncate text-sm font-medium">{user.name}</span>
                                <span className = "truncate text-xs text-muted-foreground">{user.email}</span>
                            </div>
                            {/* <MoreVerticalIcon className = "ml-auto size-[4]" /> */}
                       </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavUser;