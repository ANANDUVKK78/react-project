import { employeeTypes } from "store";


export interface RespType {
    success?: boolean,
    message?: string,
    data?: { list?: employeeTypes.EmployeeType[],employee?: employeeTypes.EmployeeType}
}

export interface ErrType {
    err?: { message?: string }
}

export interface ActionType {
    type: string,
    id?:string,
    response?: RespType,
    error?: ErrType,
    employee?: employeeTypes.RegisterEmployeeActionType,
    data?: { edit?: boolean, id?: string }
}

export interface FormStateType {
    employeeId?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
    dob?: string,
    doj?: string,
    desig?: string,
    exp?: string,
    phone?: string
}








