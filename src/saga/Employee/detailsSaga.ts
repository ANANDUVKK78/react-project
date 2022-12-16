import { call, put } from 'redux-saga/effects';
import { getProfile} from 'endpoints';
import { employeeActions, userActions } from 'store'


export function* getEmployeeProfile(payload) {
    try {
        const jsonResp: any = yield call(getProfile, payload.id);

        if (jsonResp?.success) {
            yield put(employeeActions.GetEmployeeSuccess(jsonResp));

        }

    } catch (err) {
        yield put(userActions.setServerErr());

    }
}
