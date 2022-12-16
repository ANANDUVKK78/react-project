import { call, put } from 'redux-saga/effects';
import { signup } from 'endpoints';
import { storageManager,history } from 'helpers'
import { userActions } from 'store'

export function* registerUser(payload) {
    try {
        const jsonResp: any = yield call(signup, payload.user);
        if (jsonResp?.success) {
            storageManager.saveValue('token', jsonResp.data.token);
            history.push("/list");
        } else {
            yield put(userActions.RegisterUserSuccess(jsonResp));

        }

    } catch (err) {
        yield put(userActions.setServerErr());

    }
}
