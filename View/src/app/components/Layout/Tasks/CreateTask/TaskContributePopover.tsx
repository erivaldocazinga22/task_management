import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/components/ui/command";

type TypeContribute = {
    value: string,
    label: string
}

type TaskContributePopoverProps = {
    data: TypeContribute[]
}

export function TaskContributePopover({ data: contributes }: TaskContributePopoverProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between border-task-management-400 bg-task-management-600">
                    {value
                        ? contributes.find((contribute) => contribute.value === value)?.label
                        : "Selecione o contr..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 border-task-management-400 bg-task-management-600">
                <Command className="border-task-management-400 bg-task-management-600 divide-task-management-300">
                    <CommandInput placeholder="Pesquisar por um contribuidor..." className="placeholder:text-task-management-100" />
                    <CommandList>
                        <CommandEmpty>Não encotrado.</CommandEmpty>
                        <CommandGroup>
                            {contributes.map((contribute) => (
                                <CommandItem key={contribute.value} value={contribute.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                }}>
                                    <Check className={cn("mr-2 h-4 w-4", value === contribute.value ? "opacity-100" : "opacity-0")}/>
                                    {contribute.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
