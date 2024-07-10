import { ITask } from "@/core/models/tasks";
import { cn } from "@/lib/utils";
import { CheckCircle2, MessageCircleMore, MoreVertical, PenLine, ScanEye, Trash2, UserPlus2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { format } from "date-fns";
import { pt } from "date-fns/locale/pt";
interface TaskCardProps {
    data: ITask
}

const listname = ["EC", "AC", "JB"];

export const TaskCard: React.FC<TaskCardProps> = ({ data }) => {

    const formatDate = (date: string): string => {
        const newDate = new Date(date);
        return format(newDate, "dd/MM/yyyy", { locale: pt })
    }

    return (
        <div className="relative max-w-[300px] w-full max-h-[100px] h-[100px] p-2 rounded-lg flex flex-col justify-between border border-task-management-300 bg-task-management-500 overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <CheckCircle2 size={18} strokeWidth={1.5} />
                    <span className="max-w-[200px] truncate">{data.title}</span>
                    <span className={cn("w-2 h-2 flex rounded-full bg-task-management-100",
                        data.status === "pending" ? "bg-orange-500" 
                        : data.status === "in progress" ? "bg-violet-500" 
                        : data.status === "completed" && "bg-emerald-500"
                    )}></span>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger>
                            <MoreVertical size={18} strokeWidth={1.5} />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <PenLine size={18} strokeWidth={1.5} />
                                    <span>Editar</span>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Trash2 size={18} strokeWidth={1.5} />
                                    <span>Remove</span>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <ScanEye size={18} strokeWidth={1.5} />
                                    <span>Visualizar</span>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <UserPlus2 size={18} strokeWidth={1.5} />
                                    <span>Adicionar membros</span>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="flex">
                <div className="flex relative">
                    {listname.map((item, index, arr) => (
                        <div key={index} className={cn("w-7 h-7 rounded-full text-sm flex items-center justify-center border border-task-management-300 bg-red-500 select-none",
                            index === 1 && "-translate-x-2 bg-blue-500", 
                            index === 2 && "-translate-x-4 bg-task-management-300"
                        )} children={index === 2 ? "+" + (arr.length - 2) : item} />
                    ))}
                </div>       
                <div className="flex-1 flex gap-2 items-end justify-between">
                    <div className="w-fit flex gap-1 py-1 px-1.5 rounded-sm text-task-management-100 border border-task-management-300">
                        <MessageCircleMore size={18} strokeWidth={1.5} />
                        <span className="text-sm text-blue-500">{7}</span>
                    </div>
                    <div className="flex-1 text-xs text-right text-task-management-100">{formatDate(data.createdAt)}</div>
                </div>
            </div>

            <div className="absolute -top-14 left-0 z-10 text-[9rem] text-white opacity-[2%] font-black -rotate-12">{data.id}</div>
            <div className={cn("absolute right-5 top-1/2 -translate-y-1/2 z-10 rounded-full min-w-10 min-h-10 blur-3xl", 
                 data.status === "pending" ? "bg-orange-500" 
                 : data.status === "in progress" ? "bg-violet-500" 
                 : data.status === "completed" && "bg-emerald-500"
            )} />
        </div>
    )
}