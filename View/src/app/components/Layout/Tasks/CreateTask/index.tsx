import { DialogClose } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import { useCreateTask } from "@/hooks/tasks";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { TaskStatusPopover } from "./TaskStatusPopover";
import { TaskContributePopover } from "./TaskContributePopover";
import { useUsers } from "@/hooks/users";
import { useSession } from "@/hooks/auth";

interface CreateTaskProps {
    onCloseModal: () => void 
}

export const CreateTask: React.FC<CreateTaskProps> = ({ onCloseModal }) => {
    const [activeMore, setActiveMore] = useState(false);
    const { register, handleSubmit } = useForm<{ title: string }>();

    const { data: listUsers } = useUsers();
    const { data: loggedUser } = useSession();
    const { mutateAsync: CreateTaskFn } = useCreateTask();

    const AddNewTaskFn = async (data: { title: string }) => {
        await CreateTaskFn(data);
        onCloseModal();
    }

    return (
        <form onSubmit={handleSubmit(AddNewTaskFn)} className="space-y-4">
            <Input 
                type="text"
                {...register("title")}
                minLength={3} 
                placeholder="O que faremos agora?"
                className="border-task-management-400 placeholder:text-task-management-100"
            />
            <div className="space-y-4">
                <button type="button" className="flex items-center gap-1 text-sm" onClick={()=> setActiveMore(prev => !prev)}>
                    <span>Mais opções</span>
                    <ChevronRight size={20} strokeWidth={1.5} className={`transition-['rotate'] duration-300 ${activeMore ? "rotate-90" : "rotate-0"}`} />
                </button>
                {activeMore && (
                    <div className="space-y-2 grid grid-cols-4 items-center">
                        <p className="text-sm text-task-management-100 col-span-2">Status</p>
                        <TaskStatusPopover />
                        
                        <p className="text-sm text-task-management-100 col-span-2">Contribuidores</p>
                        <TaskContributePopover data={(listUsers && loggedUser) ? listUsers.map(user => user.id !== loggedUser.id && ({
                                label: user.name,
                                value: user.email
                            })) : []}  
                        />
                    </div>
                )}
            </div>
            <div className="flex items-center justify-end gap-2">
                <DialogClose asChild>
                    <Button type="button" variant="destructive">Cancelar</Button>
                </DialogClose>
                <Button type="submit"
                    className="text-white bg-task-management-first hover:bg-task-management-first"
                >Adicionar tarefa</Button>
            </div>
        </form>
    )
}
