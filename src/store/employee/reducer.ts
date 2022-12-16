import { ActionType } from 'types'
import { EmployeeReducerType } from './types';
import { employeeConstants } from './constants';

const initialState: EmployeeReducerType = {
    regResp: { message: '' },
    listResp: [],
    deleteResp: { message: '' },
    data: {
        edit: false,
        id: ''
    },
    detailsResp: {},

}


const employeeReducer = (state: EmployeeReducerType = initialState, action: ActionType): EmployeeReducerType => {
    switch (action.type) {
        case employeeConstants.REGISTER_SUCCESS:
            return { ...state, regResp: action.response };
        case employeeConstants.LIST_SUCCESS:
            return { ...state, listResp: action.response.data.list };
        case employeeConstants.DELETE_SUCCESS:
            return { ...state, deleteResp: action.response };
        case employeeConstants.EDIT_NAV:
            return { ...state, data: action.data };
        case employeeConstants.VIEW_NAV:
            return { ...state, id: action.id };
        case employeeConstants.DETAILS_SUCCESS:
            return { ...state, detailsResp: action.response.data.employee };
        case employeeConstants.EDIT_SUCCESS:
            return { ...state, editResp: action.response };
        case employeeConstants.CLEAR_EMPLOYEE_RESP:
            return { ...state, regResp: {}, editResp: {} };
        case employeeConstants.CLEAR_EMPLOYEE_DATA:
            return { ...state, data: { edit: false, id: '' }, detailsResp: {} }
        default:
            return state;
    }
}

export default employeeReducer;
