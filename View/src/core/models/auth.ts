import { z } from "zod";
import { DefaultResponse } from "./default";
import { User } from "./user";

export const SignInSchema = z.object({
    email: z.string().email("Informe um email válido!"),
    password: z.string().min(6, "A senha deve conter no minimo 6 caracteres"),
    /* remember_me: z.boolean() */
});

export type SignInRequestData = z.infer<typeof SignInSchema>; 

export interface SignInResponseData extends DefaultResponse {
    token: string
}

export interface SessionResponseData extends DefaultResponse {
    data: User
}