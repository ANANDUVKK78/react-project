import { ActionType } from 'types'
import { UserReducerType } from './types';
import { userConstants } from './constants';

const initialState: UserReducerType = {
    signupResp: { message: '' },
    loginResp: { message: '' },
}


const reducer = (state: UserReducerType = initialState, action: ActionType): UserReducerType => {
    switch (action.type) {
        case userConstants.SIGNUP_SUCCESS:
            return { ...state, signupResp: action.response };
        case userConstants.SIGNUP_FAILURE:
            return { ...state, signupErr: action.error };
        case userConstants.LOGIN_SUCCESS:
            return { ...state, loginResp: action.response };
        case userConstants.LOGIN_FAILURE:
            return { ...state, loginErr: action.error };
        case userConstants.SET_SERVER_ERR:
            return { ...state, serverErr: true };
        case userConstants.CLEAR_SERVER_ERR:
            return { ...state, serverErr: false };
        case userConstants.CLEAR_USER_RESP:
            return {
                ...state, signupResp: { message: '' }, loginResp: { message: '' },
            };
        default:
            return state;
    }
}

export default reducer;
