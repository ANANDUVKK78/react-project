import { RespType } from 'types';
import { LoginUserActionType, RegisterUserActionType, UserType } from "./types";
import { userConstants } from "./constants"

export const RegisterUserRequest = (user: UserType): RegisterUserActionType => {
  return {
    type: userConstants.SIGNUP_REQUEST,
    user
  }
};

export const RegisterUserSuccess = (response: RespType): { type: string, response: RespType } => {
  return {
    type: userConstants.SIGNUP_SUCCESS,
    response
  }
};


export const LoginUserRequest = (user: UserType): LoginUserActionType => {
  return {
    type: userConstants.LOGIN_REQUEST,
    user
  }
};

export const LoginUserSuccess = (response: RespType): { type: string, response: RespType } => {
  return {
    type: userConstants.LOGIN_SUCCESS,
    response
  }
};

export const setServerErr = (): { type: string } => {
  return {
    type: userConstants.SET_SERVER_ERR,

  }
}

export const clearServerErr = (): { type: string } => {
  return {
    type: userConstants.CLEAR_SERVER_ERR,

  }
}

export const ClearResponse = (): { type: string } => {
  return {
    type: userConstants.CLEAR_USER_RESP,

  }
};
