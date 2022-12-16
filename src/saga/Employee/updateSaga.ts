import { call, put } from 'redux-saga/effects';
import { editEmployee } from 'endpoints';
import {history} from 'helpers';
import { employeeActions, userActions } from 'store'

export function* updateEmployee(payload) {
    try {
        const jsonResp: any = yield call(editEmployee, payload.employee);
        if (jsonResp?.success) {
            history.push("/list");
        } else {
            yield put(employeeActions.UpdateEmployeeSuccess(jsonResp));

        }

    } catch (err) {
        yield put(userActions.setServerErr());

    }
}
