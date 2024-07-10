import { useMutation } from "@tanstack/react-query";
import { SignInFn } from "./utils";
import { setCookie } from "nookies";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["signIn.cache"],
        mutationFn: SignInFn,
        onSuccess(Response) {
            setCookie(null, "taskmanagement.token", Response.data.token, {
                path: "/",
                maxAge: 60 * 60 * 24 * 30
            });

            alert(Response.data.message);
            navigate("/", { replace: true });
        },
        onError(error) {
            alert(error.message);
            console.log(error);
        }
    });
}