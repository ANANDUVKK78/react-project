import { employeeTypes, userTypes } from 'store';
import { fetchWrapper } from 'helpers'

export const signup = (payload: userTypes.RegisterUserRequestPayload): Promise<any> => {
    return fetchWrapper.post('users/signup', payload);
};


export const login = (payload: userTypes.RegisterUserRequestPayload): Promise<any> => {
    return fetchWrapper.post('users/login', payload);
};

export const addEmployee = (payload: employeeTypes.EmployeeType): Promise<any> => {
    return fetchWrapper.post('employee/register', payload, true);
};

export const listEmployee = (): Promise<any> => {
    return fetchWrapper.get('employee/list', true);
};

export const editEmployee = (payload: employeeTypes.EmployeeType): Promise<any> => {
    return fetchWrapper.put('employee/edit', payload, true);
};

export const deleteEmployee = (payload: { employeeId: string }): Promise<any> => {
    return fetchWrapper._delete('employee/delete', payload, true);
};

export const getProfile = (id: string): Promise<any> => {
    return fetchWrapper.get('employee/getEmployeeById?employeeId=' + id, true);
};



