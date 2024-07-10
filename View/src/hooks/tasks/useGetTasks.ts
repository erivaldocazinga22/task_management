import { useQuery } from "@tanstack/react-query"
import { GetTaskFn } from "./utils";

export function GetTask() {
    const queryTasks = useQuery({
        queryKey: ["tasks"],
        queryFn: GetTaskFn
    });
    
    return {
        ...queryTasks,
        data: queryTasks.data?.data.data
    }
}
