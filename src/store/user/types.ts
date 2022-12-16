import { ErrType, RespType } from "types";

export interface RegisterUserRequestPayload {
    email: string,
    password: string
}
export interface UserReducerType {
    signupResp?: RespType, signupErr?: ErrType, loginResp?: RespType, loginErr?: ErrType,serverErr?:boolean
}

export interface RegisterUserActionType { type: string, user?: { email: string, password: string } }

export interface LoginUserActionType { type: string, user?: { email: string, password: string } }

export interface UserType {
    email: string,
    password: string
}
