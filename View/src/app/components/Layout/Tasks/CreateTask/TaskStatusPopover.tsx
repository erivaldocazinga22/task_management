import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { ArrowUpCircle, CheckCircle2, Circle, CircleDashed, LucideIcon, XCircle } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/components/ui/command";

type Status = {
  value: string
  label: string
  icon: LucideIcon
}

const statuses: Status[] = [
  {
    value: "new",
    label: "Nova Tarefa",
    icon: Circle,
  },
  {
    value: "pending",
    label: "Pendente",
    icon: CircleDashed,
  },
  {
    value: "in progress",
    label: "Em Progresso",
    icon: ArrowUpCircle,
  },
  {
    value: "completed",
    label: "Comcluida",
    icon: CheckCircle2,
  },
  {
    value: "Cancelada",
    label: "Canceled",
    icon: XCircle,
  },
]

export function TaskStatusPopover() {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

    return (
          <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="w-[150px] justify-start border-task-management-400 bg-task-management-600">
                      {selectedStatus ? (
                          <>
                              <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                              {selectedStatus.label}
                          </>
                      ) : <>+ Adicionar status</>}
                  </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 border-task-management-400 bg-task-management-600" side="right" align="start">
                <Command className="border-task-management-400 bg-task-management-600 divide-task-management-300">
                  <CommandInput placeholder="Change status..." className="placeholder:text-task-management-100" />
                  <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                          {statuses.map((status) => (
                              <CommandItem key={status.value} value={status.value} onSelect={(value) => {
                                  setSelectedStatus(statuses.find((priority) => priority.value === value) || null);
                                  setOpen(false);
                              }} >
                                  <status.icon className={cn("mr-2 h-4 w-4", status.value === selectedStatus?.value ? "opacity-100" : "opacity-40" )} />
                                  <span>{status.label}</span>
                              </CommandItem>
                          ))}
                      </CommandGroup>
                  </CommandList>
              </Command>
          </PopoverContent>
      </Popover>
  )
}
