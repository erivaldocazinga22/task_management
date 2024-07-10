import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { CreateTask } from "../Tasks/CreateTask";
import { useState } from "react";

export const Header = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <header className="w-full min-h-[70px] h-full max-h-[70px] px-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Minhas Tasks</h1>
            </div>
            <div>
                <Dialog modal={openModal} onOpenChange={setOpenModal}>
                    <DialogTrigger>
                        <Button className="text-white bg-task-management-first hover:bg-task-management-first">
                            <Plus size={20} strokeWidth={1.5} />
                            <span>Adicionar Nova</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="border-task-management-400 bg-task-management-600">
                        <DialogHeader>
                            <DialogTitle>Adicionar Nova Tesk</DialogTitle>
                        </DialogHeader>
                        <CreateTask onCloseModal={()=> setOpenModal(false)} />
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}
