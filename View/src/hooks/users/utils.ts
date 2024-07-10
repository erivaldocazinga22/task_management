import { UserResponseData } from "@/core/models/user";
import { axios } from "@/lib/axios";
import { AxiosPromise } from "axios";

export const getUsersFn = async (): AxiosPromise<UserResponseData> => {
    return axios.get("/users");
}