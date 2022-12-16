import { call, put } from 'redux-saga/effects';
import { listEmployee } from 'endpoints';
import { employeeActions, userActions } from 'store'


export function* listEmployeeData() {
    try {
        const jsonResp: any = yield call(listEmployee);
        if (jsonResp?.success) {
            yield put(employeeActions.ListEmployeeSuccess(jsonResp));

        }

    } catch (err) {
        yield put(userActions.setServerErr());

    }
}
