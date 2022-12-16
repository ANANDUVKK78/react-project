import React, { Dispatch, useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Router } from 'react-router-dom'
import { Routes } from 'routes'
import { history } from 'helpers'
import { Toaster } from 'components'
import { userActions } from 'store'

const App = () => {
    const dispatch: Dispatch<{ type: string }> = useDispatch()

    const serverErr = useSelector(
        (state: RootStateOrAny) => state.userReducer.serverErr || false
    )

    useEffect(() => {
        if (serverErr)
            setTimeout(() => {
                dispatch(userActions.clearServerErr())
            }, 3000)
    }, [serverErr])

    return (
        <>
            <Router history={history}>
                <Routes />
            </Router>
            {serverErr && <Toaster />}
        </>
    )
}
export default App
