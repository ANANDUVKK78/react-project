import { runSaga } from 'redux-saga'
import 'regenerator-runtime/runtime'
import { loginUser } from 'saga/user/loginSaga'
import { registerUser } from 'saga/user/signupSaga'
import * as endpoints from 'endpoints'
import { listEmployeeData } from 'saga/Employee/listSaga'
import {
    employeeActions
} from 'store'
import { deleteEmp } from 'saga/Employee/deleteSaga'
import { registerEmployee } from 'saga/Employee/registerSaga'
import { updateEmployee } from 'saga/Employee/updateSaga'
import { getEmployeeProfile } from 'saga/Employee/detailsSaga'

describe('testing sagas for success cases', () => {
    const dummyUser = { user: { username: 'appu', password: 'appu' } }
    let loginMockFunc
    let signupMockFunc
    let listMockFunc
    let deleteMockFunc
    let regMockFunc
    let editMockFunc
    let detailsMockFunc

    beforeAll(() => {
        loginMockFunc = jest
            .spyOn(endpoints, 'login')
            .mockReturnValue(
                Promise.resolve({ success: true, data: { token: 'abc' } })
            )
        signupMockFunc = jest
            .spyOn(endpoints, 'signup')
            .mockReturnValue(
                Promise.resolve({ success: true, data: { token: 'abc' } })
            )
        listMockFunc = jest
            .spyOn(endpoints, 'listEmployee')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
        deleteMockFunc = jest
            .spyOn(endpoints, 'deleteEmployee')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
        regMockFunc = jest
            .spyOn(endpoints, 'addEmployee')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
        editMockFunc = jest
            .spyOn(endpoints, 'editEmployee')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
        detailsMockFunc = jest
            .spyOn(endpoints, 'getProfile')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
    })
    it('should call login api and redirect to list page on success', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            loginUser,
            dummyUser
        )

        expect(loginMockFunc).toHaveBeenCalledTimes(1)
        expect(window.location.pathname).toMatch('/list')
        loginMockFunc.mockClear()

    })

    it('should call signup api and redirect to list page on success', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            registerUser,
            dummyUser
        )

        expect(signupMockFunc).toHaveBeenCalledTimes(1)
        expect(window.location.pathname).toMatch('/list')
        signupMockFunc.mockClear()

    })

    it('should call list api and dispatch success action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            listEmployeeData
        )

        expect(listMockFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([
            employeeActions.ListEmployeeSuccess({ success: true, message: 'success' }),
        ])
        listMockFunc.mockClear()
    })

    it('should call delete api and dispatch success action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            deleteEmp,
            dummyUser
        )

        expect(deleteMockFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([
            employeeActions.DeleteEmployeeSuccess({ success: true, message: 'success' }),
        ])
        deleteMockFunc.mockClear()
    })

    it('should call employee register api and dispatch success action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            registerEmployee,
            dummyUser
        )

        expect(regMockFunc).toHaveBeenCalledTimes(1)
        expect(window.location.pathname).toMatch('/list')
        regMockFunc.mockClear()

    })
    it('should call employee edit api and dispatch success action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            updateEmployee,
            dummyUser
        )

        expect(editMockFunc).toHaveBeenCalledTimes(1)
        expect(window.location.pathname).toMatch('/list')

        editMockFunc.mockClear()
    })
    it('should call get employee profile api and dispatch success action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },

            getEmployeeProfile,
            dummyUser
        )

        expect(detailsMockFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([
            employeeActions.GetEmployeeSuccess({ success: true, message: 'success' }),
        ])
        deleteMockFunc.mockClear()
    })
})
