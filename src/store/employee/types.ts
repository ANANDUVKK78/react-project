import { ErrType, RespType } from "types";

export interface EmployeeType {
    employeeId?: string,
    fname?: string,
    lname?: string,
    email?: string,
    password?: string,
    dob?: string,
    doj?: string,
    designation?: string,
    experience?: string,
    phoneNumber?: string
}


export interface RegisterEmployeeActionType {
    type?: string,
    employee?: EmployeeType,
    id?:string

}

export interface EmployeeReducerType {
    id?:string,
    regResp?: RespType,
    regErr?: ErrType,
    listResp?: EmployeeType[],
    listErr?: ErrType,
    deleteResp: RespType,
    deleteErr?: ErrType,
    editResp?: RespType,
    editErr?: ErrType,
    data?:{edit?:boolean,id?:string},
    detailsResp?:EmployeeType,
    detailsErr?:ErrType
}
