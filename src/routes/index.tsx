import React from 'react'
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom'
import { UserLogin, UserSignup, Notfound } from 'pages'
import { protectedRoutes, isTokenValid } from 'protectedRoutes'

const routes: RouteProps[] = [
    {
        path: '/',
        component: UserLogin,
        exact: true,
    },
    {
        path: '/login',
        component: UserLogin,
        exact: true,
    },
    {
        path: '/signup',
        component: UserSignup,
        exact: true,
    },
]

export const Routes = () => {
    return (
        <Switch>
            {routes.map(({ component: Component, ...rest }, index) => (
                <Route
                    {...rest}
                    key={index}
                    render={(props) =>
                        !isTokenValid() ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/list',
                                }}
                            />
                        )
                    }
                />
            ))}
            {protectedRoutes.map(({ component: Component, ...rest }, index) => (
                <Route
                    {...rest}
                    key={index}
                    render={(props) =>
                        isTokenValid() ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                }}
                            />
                        )
                    }
                />
            ))}
            <Route component={Notfound} exact={true}></Route>
        </Switch>
    )
}
