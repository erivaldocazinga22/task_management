import { SessionResponseData, SignInRequestData, SignInResponseData } from "@/core/models/auth";
import { axios } from "@/lib/axios";
import { AxiosPromise } from "axios";

export const SignInFn = async (data: SignInRequestData): AxiosPromise<SignInResponseData> => {
    return axios.post<SignInResponseData>("/login", data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const SessionFn = async (): AxiosPromise<SessionResponseData> => {
    return axios.post<SessionResponseData>("/session", {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

//</header>