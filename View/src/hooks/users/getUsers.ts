import { useQuery } from "@tanstack/react-query"
import { getUsersFn } from "./utils"

export function GetUsers() {
    
    const queryUsers = useQuery({
        queryKey: ["users"],
        queryFn: getUsersFn
    })

    return {
        ...queryUsers,
        data: queryUsers.data?.data.data
    }
}