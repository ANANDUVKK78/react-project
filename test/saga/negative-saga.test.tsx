import { runSaga } from 'redux-saga'
import 'regenerator-runtime/runtime'
import { loginUser } from 'saga/user/loginSaga'
import { registerUser } from 'saga/user/signupSaga'
import * as endpoints from 'endpoints'
import { listEmployeeData } from 'saga/Employee/listSaga'
import { deleteEmp } from 'saga/Employee/deleteSaga'
import { registerEmployee } from 'saga/Employee/registerSaga'
import { updateEmployee } from 'saga/Employee/updateSaga'
import { getEmployeeProfile } from 'saga/Employee/detailsSaga'
import { userActions } from 'store'

describe('testing sagas for error rejection', () => {
    const dummyUser = { user: { username: 'appu', password: 'appu' } }
    let loginMockErrFunc
    let signupMockErrFunc
    let listMockErrFunc
    let deleteMockErrFunc
    let regMockErrFunc
    let editMockErrFunc
    let detailsMockErrFunc

    beforeAll(() => {
        loginMockErrFunc = jest
            .spyOn(endpoints, 'login')
            .mockReturnValue(Promise.reject({ error: true }))

        signupMockErrFunc = jest
            .spyOn(endpoints, 'signup')
            .mockReturnValue(Promise.reject({ error: true }))

        listMockErrFunc = jest
            .spyOn(endpoints, 'listEmployee')
            .mockReturnValue(Promise.reject({ error: true }))

        deleteMockErrFunc = jest
            .spyOn(endpoints, 'deleteEmployee')
            .mockReturnValue(Promise.reject({ error: true }))

        regMockErrFunc = jest
            .spyOn(endpoints, 'addEmployee')
            .mockReturnValue(Promise.reject({ error: true }))

        editMockErrFunc = jest
            .spyOn(endpoints, 'editEmployee')
            .mockReturnValue(Promise.reject({ error: true }))

        detailsMockErrFunc = jest
            .spyOn(endpoints, 'getProfile')
            .mockReturnValue(Promise.reject({ error: true }))
    })
    it('should call login api and dispatch server error action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            loginUser,
            dummyUser
        )

        expect(loginMockErrFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.setServerErr()]),
        loginMockErrFunc.mockClear()
    })

    it('should call signup api and dispatch server error action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            registerUser,
            dummyUser
        )

        expect(signupMockErrFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.setServerErr()]),
        signupMockErrFunc.mockClear()
    })

    it('should call list api and dispatch server error action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            listEmployeeData
        )

        expect(listMockErrFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.setServerErr()]),
        listMockErrFunc.mockClear()
    })

    it('should call delete api and dispatch server error action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            deleteEmp,
            dummyUser
        )

        expect(deleteMockErrFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.setServerErr()]),
        deleteMockErrFunc.mockClear()
    })

    it('should call employee register api and dispatch server error action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            registerEmployee,
            dummyUser
        )

        expect(regMockErrFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.setServerErr()]),
        regMockErrFunc.mockClear()
    })

    it('should call employee edit api and dispatch server error action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            updateEmployee,
            dummyUser
        )

        expect(editMockErrFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.setServerErr()]),

        editMockErrFunc.mockClear()
    })

    it('should call get employee profile api and dispatch server error action', async () => {
        const dispatched = []

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },

            getEmployeeProfile,
            dummyUser
        )

        expect(detailsMockErrFunc).toHaveBeenCalledTimes(1)
        expect(dispatched).toEqual([userActions.setServerErr()]),

        detailsMockErrFunc.mockClear()
    })
})
