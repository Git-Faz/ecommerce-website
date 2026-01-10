import { api } from "./axios";

interface LoginReq {
    email: string;
    password: string;
}

interface RegisterReq {
    email: string;
    username: string;
    password: string;
}

export const login = (data: LoginReq) =>
    api.post("/auth/login", data);


export const register = (data: RegisterReq) => 
    api.post("/auth/register", data);
