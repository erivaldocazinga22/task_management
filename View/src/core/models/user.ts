import { DefaultResponse } from "./default"

export interface User {
    id: number,
    avatar_url?: string,
    name: string,
    email: string,
    created_at: string,
    updated_at: string
}

export type UserResponseData = DefaultResponse & {
    data: User[]
} 