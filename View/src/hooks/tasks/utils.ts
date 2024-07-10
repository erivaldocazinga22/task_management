import { TaskResponseData } from "@/core/models/tasks";
import { axios } from "@/lib/axios";
import { AxiosPromise } from "axios";

export const GetTaskFn = async (): AxiosPromise<TaskResponseData> => {
    return axios.get("/tasks");
}

export const CreateTaskFn = async (data: { title: string }): AxiosPromise => {
    return axios.post("/tasks", data);
}

export const  DeleteTaskFn = async (): AxiosPromise<void> => {
    return axios.get("/tasks")
}

export const  UpdateTaskFn = async (): AxiosPromise<void> => {
    return axios.get("/tasks")
}