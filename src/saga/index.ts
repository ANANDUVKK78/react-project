import { all, takeEvery } from 'redux-saga/effects';
import { userConstants, employeeConstants } from 'store';
import { registerUser } from './user/signupSaga';
import { loginUser } from './user/loginSaga';
import { registerEmployee } from './Employee/registerSaga';
import { listEmployeeData } from './Employee/listSaga'
import { deleteEmp } from './Employee/deleteSaga';
import { getEmployeeProfile } from './Employee/detailsSaga';
import { updateEmployee } from './Employee/updateSaga';


export function* rootSaga() {
    yield all([
        yield takeEvery(userConstants.SIGNUP_REQUEST, registerUser),
        yield takeEvery(userConstants.LOGIN_REQUEST, loginUser),
        yield takeEvery(employeeConstants.REGISTER_REQUEST, registerEmployee),
        yield takeEvery(employeeConstants.LIST_REQUEST, listEmployeeData),
        yield takeEvery(employeeConstants.DELETE_REQUEST, deleteEmp),
        yield takeEvery(employeeConstants.DETAILS_REQUEST, getEmployeeProfile),
        yield takeEvery(employeeConstants.EDIT_REQUEST, updateEmployee)


    ]);

}






