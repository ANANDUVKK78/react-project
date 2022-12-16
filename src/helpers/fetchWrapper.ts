import { employeeTypes } from "store";
import { setHeaders,removeValue } from "./tokenManager";
import history from './utils/history';

const API_URL: string = process.env.API_URL;

const get = async (url: string, token?: boolean): Promise<Response> => {
    const requestOptions = {
        method: 'GET',
        headers: setHeaders(token || false)
    };
    const response = await fetch(API_URL + url, requestOptions);
    
    return (handleResponse(response));

}

const post = async (url: string, body: employeeTypes.EmployeeType, token?: boolean): Promise<Response> => {
    const requestOptions = {
        method: 'POST',
        headers: setHeaders(token || false),
        body: JSON.stringify(body)
    };
    const response = await fetch(API_URL + url, requestOptions)
    return handleResponse(response);
}

const put = async (url: string, body: employeeTypes.EmployeeType, token?: boolean): Promise<Response> => {
    const requestOptions = {
        method: 'PUT',
        headers: setHeaders(token || false),
        body: JSON.stringify(body)
    };

    const response = await fetch(API_URL + url, requestOptions)
    return handleResponse(response);
}


const patch = async (url: string, body: employeeTypes.EmployeeType, token?: boolean): Promise<Response> => {
    const requestOptions = {
        method: 'PUT',
        headers: setHeaders(token || false),
        body: JSON.stringify(body)
    };
    const response = await fetch(API_URL + url, requestOptions)
    return (handleResponse(response))
}

const _delete = async (url: string, body?: employeeTypes.EmployeeType, token?: boolean): Promise<Response> => {
    const requestOptions = {
        method: 'DELETE',
        headers: setHeaders(token || false),
        body: JSON.stringify(body)

    };

    const response = await fetch(API_URL + url, requestOptions)
    return (handleResponse(response));
}

const handleResponse = (response: Response) => {
    if (response.status === 401) {
        removeValue('token');
        history.push('/login');
        return;
    }

    return response.json();
}



export { get, post, put, patch, _delete };



