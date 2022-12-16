import { call, put } from 'redux-saga/effects';
import { login } from 'endpoints';
import { storageManager, history } from 'helpers'
import { userActions } from 'store'



export function* loginUser(payload) {
    try {

        const jsonResp: any = yield call(login, payload.user);


        if (jsonResp?.success) {
            storageManager.saveValue('token', jsonResp.data.token);
            history.push("/list");

        } else {
            yield put(userActions.LoginUserSuccess(jsonResp));

        }

    } catch (err) {

        yield put(userActions.setServerErr());


    }
}
