import { DefaultResponse } from "./default";

export interface ITask {
    id: number,
    user_id: number,
    title: string,
    status: "new" | "pending" | "in progress" | "completed" | "canceled"
    createdAt: string,
    updatedAt: string
}

export interface TaskResponseData extends DefaultResponse {
    data: ITask[]
}