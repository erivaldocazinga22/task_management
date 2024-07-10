import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskFn } from "./utils";
import { toast } from "react-toastify";

export function CreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CreateTaskFn,
        onMutate: async () => {
            const toastId = toast.loading("Creating task...");
            return { toastId };
        },
        onSuccess: (_response, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"]});
            toast.update(context.toastId, { 
                render: "Task created successfully 👌", 
                type: "success", 
                isLoading: false,
                autoClose: 2000,
            });
        },
        onError: (_error, _variables, context) => {
            if (context) {
                toast.update(context.toastId, { 
                    render: "Error creating task 🤯", 
                    type: "error", 
                    isLoading: false,
                    autoClose: 5000,
                });
            }
        },
    });
}
