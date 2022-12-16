import { RespType } from 'types'
import { EmployeeType, RegisterEmployeeActionType } from "./types";
import { employeeConstants } from "./constants"

export const RegisterEmployeeRequest = (employee: EmployeeType): RegisterEmployeeActionType => {
  return {
    type: employeeConstants.REGISTER_REQUEST,
    employee
  }
};

export const RegisterEmployeeSuccess = (response: RespType): { type: string, response: RespType } => {
  return {
    type: employeeConstants.REGISTER_SUCCESS,
    response
  }
};


export const ListEmployeeRequest = (): { type: string } => {
  return {
    type: employeeConstants.LIST_REQUEST
  }
};

export const ListEmployeeSuccess = (response: RespType): { type: string, response: RespType } => {
  return {
    type: employeeConstants.LIST_SUCCESS,
    response
  }
};


export const DeleteEmployeeRequest = (employee: { employeeId: string }): { employee: { employeeId: string }, type: string } => {
  return {
    type: employeeConstants.DELETE_REQUEST,
    employee
  }
};

export const DeleteEmployeeSuccess = (response: RespType): { type: string, response: RespType } => {
  return {
    type: employeeConstants.DELETE_SUCCESS,
    response
  }
};


export const EditEmployeeNavigate = (edit: boolean, id?: string): {
  type: string, data: {
    edit: boolean, id?: string
  }
} => {
  return {
    type: employeeConstants.EDIT_NAV,
    data: {
      edit: edit,
      id: id || ''
    }
  }
};

export const ViewEmployeeNavigate = (id: string): {
  type: string, id: string

} => {
  return {
    type: employeeConstants.VIEW_NAV,
    id
  }
};

export const GetEmployeeRequest = (id: string): { id: string, type: string } => {
  return {
    type: employeeConstants.DETAILS_REQUEST,
    id
  }
};

export const GetEmployeeSuccess = (response: RespType): { type: string, response } => {
  return {
    type: employeeConstants.DETAILS_SUCCESS,
    response
  }
};


export const ClearEmployeeResp = (): { type: string } => {
  return {
    type: employeeConstants.CLEAR_EMPLOYEE_RESP,
  }
};

export const ClearEmployeeProfile = (): { type: string } => {
  return {
    type: employeeConstants.CLEAR_EMPLOYEE_DATA,
  }
};

export const UpdateEmployeeRequest = (employee: EmployeeType): RegisterEmployeeActionType => {
  return {
    type: employeeConstants.EDIT_REQUEST,
    employee
  }
};

export const UpdateEmployeeSuccess = (response: RespType): { type: string, response } => {
  return {
    type: employeeConstants.EDIT_SUCCESS,
    response
  }
};

