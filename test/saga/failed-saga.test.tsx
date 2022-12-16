import { runSaga } from 'redux-saga'
import 'regenerator-runtime/runtime'
import { loginUser } from 'saga/user/loginSaga'
import { registerUser } from 'saga/user/signupSaga'
import * as endpoints from 'endpoints'
import { registerEmployee } from 'saga/Employee/registerSaga'
import { updateEmployee } from 'saga/Employee/updateSaga'
import {
    userActions
} from '../../src/store'
import {
    employeeActions
} from '../../src/store'

describe('testing sagas for failed cases', () => {
    const dummyUser = { user: { username: 'appu', password: 'appu' } }
    let loginMockFailedFunc
    let signupMockFailedFunc
    let regMockFailedFunc
    let editMockFailedFunc

    beforeAll(() => {
        loginMockFailedFunc = jest
            .spyOn(endpoints, 'login')
            .mockReturnValue(Promise.resolve({ success: false }))
        signupMockFailedFunc = jest
            .spyOn(endpoints, 'signup')
            .mockReturnValue(Promise.resolve({ success: false }))

        regMockFailedFunc = jest
            .spyOn(endpoints, 'addEmployee')
            .mockReturnValue(Promise.resolve({ success: false }))

        editMockFailedFunc = jest
            .spyOn(endpoints, 'editEmployee')
            .mockReturnValue(Promise.resolve({ success: false }))
    })

    it('should call login api and dispatch action on failure', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            loginUser,
            dummyUser
        )

        expect(loginMockFailedFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.LoginUserSuccess({ success: false })]),
            loginMockFailedFunc.mockClear()
    })

    it('should call signup api and dispatch action on failure', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            registerUser,
            dummyUser
        )

        expect(signupMockFailedFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.RegisterUserSuccess({ success: false })]),
            signupMockFailedFunc.mockClear()
    })

    it('should call employee register api and dispatch action on failure', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            registerEmployee,
            dummyUser
        )

        expect(regMockFailedFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([
            employeeActions.RegisterEmployeeSuccess({ success: false }),
        ]),
            regMockFailedFunc.mockClear()
    })

    it('should call employee edit api and dispatch action on failure', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            updateEmployee,
            dummyUser
        )

        expect(editMockFailedFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([employeeActions.UpdateEmployeeSuccess({ success: false })]),
            editMockFailedFunc.mockClear()
    })
})
