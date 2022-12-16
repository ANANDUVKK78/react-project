import { createStore, applyMiddleware, Reducer, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { combineReducers } from 'redux';

import * as userActions from './user/actions';
import userReducer from './user/reducer';
import {userConstants} from './user/constants'
import * as userTypes from './user/types'
import * as employeeActions from './employee/actions';
import employeeReducer from './employee/reducer';
import {employeeConstants}  from './employee/constants'
import * as employeeTypes from './employee/types'


const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const rootReducer: Reducer = combineReducers({ userReducer, employeeReducer });



const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export { sagaMiddleware, store, userActions, userReducer, userConstants, userTypes, employeeActions, employeeReducer, employeeConstants, employeeTypes };
