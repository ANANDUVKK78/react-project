import { RouteProps } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { storageManager } from 'helpers';
import {List,Register,View} from 'pages'


const protectedRoutes: RouteProps[] = [
    {
        path: '/list',
        component: List,
        exact: true,
    },
    {
        path: '/register',
        component: Register,
        exact: true,
    },
    {
        path: '/view',
        component: View,
        exact: true,
    },
];

const isTokenValid = (): boolean => {
    const token = storageManager.getValue('token');
    if (token) {
        const decodedToken:any = jwt_decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime())
            return false;
        else
            return true;


    } else
        return false;

}

export { protectedRoutes, isTokenValid };
