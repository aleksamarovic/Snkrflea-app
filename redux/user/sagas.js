import {  put, takeEvery } from 'redux-saga/effects'

import { userActions } from "./actions";
import { generalActions } from "../general/actions";
import { cabinetActions } from "../cabinet/actions";
import { productsActions } from "../products/actions";

export const USER_LOG_OUT_REQUEST = 'USER_LOG_OUT_REQUEST';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* logOut() {
    yield put(userActions.userLogOut());
    yield put(generalActions.showLoading(false));
    yield put(cabinetActions.setHistoryBilling(false));
    yield put(cabinetActions.setMyStore(false));
    yield put(productsActions.setMarketPlace([]));
    yield put(userActions.setCurrentProduct(null));
}


/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* userSaga() {
    yield takeEvery(USER_LOG_OUT_REQUEST, logOut);
}


export default userSaga;