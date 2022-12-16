export interface RegisterUserRequestPayload {
    email: string,
    password: string
}
export interface UserReducerType {
    signupResp?: RespType, loginResp?: RespType
}

export interface RegisterUserActionType { type: string, user?: { email: string, password: string } }

export interface LoginUserActionType { type: string, user?: { email: string, password: string } }

export interface UserType {
    email: string,
    password: string
}

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

export interface RegisterEmployeeActionType {
    type?: string,
    employee?: EmployeeType,
    id?: string

}

export interface RespType {
    success?: boolean,
    message?: string,
    data?: { list?: EmployeeType[], employee?: EmployeeType }
}

export interface ErrType {
    err?: { message?: string }
}

export interface ActionType {
    type: string,
    response?: RespType,
    error?: ErrType,
    employee?: RegisterEmployeeActionType,
    data?: { edit?: boolean, id?: string },
    id?: string
}
export interface EmployeeReducerType {
    id?: string,
    regResp?: RespType,
    listResp?: EmployeeType[],
    deleteResp: RespType,
    editResp?: RespType,
    data?: { edit?: boolean, id?: string },
    detailsResp?: EmployeeType,
}







