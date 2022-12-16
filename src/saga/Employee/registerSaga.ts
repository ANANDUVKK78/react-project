import { call, put } from 'redux-saga/effects';
import { addEmployee } from 'endpoints';
import {history} from 'helpers';
import { employeeActions, userActions } from 'store'

export function* registerEmployee(payload) {
    try {
        const jsonResp: any = yield call(addEmployee, payload.employee);

        if (jsonResp?.success) {
            history.push("/list");
        } else {
            yield put(employeeActions.RegisterEmployeeSuccess(jsonResp));

        }

    } catch (err) {
        yield put(userActions.setServerErr());

    }
}
