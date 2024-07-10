import { Moon } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { NavigationItems } from "@/core/contants/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/auth";
import { env } from "@/lib/env";

export default function Sidebar() {
    const { data: loggedUser } = useSession();
    const [active, setActive] = useState("");
    const location = useLocation();
    useEffect(() => setActive(location.pathname),[location])
    
    const fs = () => {
        const htmlTag = document.getElementsByTagName("html");
        if (htmlTag[0].className === "dark") {
            return htmlTag[0].className = ""
        }
        return htmlTag[0].className = "dark";
    }
    
  return (
    <aside className="w-72 h-screen flex flex-col justify-between bg-task-management-500">
        <div className="flex items-center gap-2 px-4 py-8">
            <img 
                src="/taskmanagement.svg" 
                alt="logomarca" 
            />
            <span className="text-lg font-medium">Task Management</span>
        </div>
        <nav className="flex-1 space-y-2 mt-4">
            {NavigationItems.map(item => (
                <Link to={item.href ? item.href : "#"} key={item.id} className={cn("flex items-center gap-2 px-4 py-2 cursor-pointer", 
                    item.href === active && "bg-task-management-400"
                )}>
                    <div className="flex gap-2 items-center">
                        <item.icon size={20} strokeWidth={1.5} />
                        <span>{item.text}</span>
                    </div>
                </Link>
            ))}
        </nav>
        <div className="pt-4 pb-6 space-y-4 border-t border-task-management-400">            
            <label htmlFor="switch_theme" className="flex items-center gap-2 justify-between px-4 py-2 cursor-pointer bg-task-management-400">
                <div className="flex gap-2 items-center">
                    <Moon size={20} strokeWidth={1.5} />
                    <span>Tema da aplicação</span>
                </div>
                {/* <div onClick={fs}>sdsd</div> */}
                <Switch id="switch_theme" onClick={fs} className="dark:bg-task-management-100"/>
            </label>
            <div className="flex gap-2 px-4">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={`${env.VITE_BASE_URL}/storage/users/${loggedUser?.avatar_url}`} className="object-cover"/>
                    <AvatarFallback className="dark:bg-task-management-300">EC</AvatarFallback>
                </Avatar>
                <div>
                    <span className="block">{loggedUser?.name}</span>
                    <span className="block text-sm text-slate-500">{loggedUser?.email}</span>
                </div>
            </div>
        </div>
    </aside>
  )
}
