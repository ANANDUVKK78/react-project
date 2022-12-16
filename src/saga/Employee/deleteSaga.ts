import { call, put } from 'redux-saga/effects';
import { deleteEmployee } from 'endpoints';
import { employeeActions, userActions } from 'store'


export function* deleteEmp(payload) {
    try {
        const jsonResp: any = yield call(deleteEmployee, payload.employee);
        if (jsonResp?.success) {
            yield put(employeeActions.DeleteEmployeeSuccess(jsonResp));

        }

    } catch (err) {
        yield put(userActions.setServerErr());

    }
}
