import { call, put, takeEvery } from 'redux-saga/effects'
import * as Api from '../../api/actions.js'
import { cabinetActions } from "./actions";
import { generalActions } from "../general/actions";
import { authActions } from "../auth/actions";

export const GET_PURCHASES_REQUEST = 'GET_PURCHASES_REQUEST';
export const GET_MY_STORE_REQUEST = 'GET_MY_STORE_REQUEST';
export const CREATE_MY_STORE_REQUEST = 'CREATE_MY_STORE_REQUEST';
export const UPDATE_MY_STORE_REQUEST = 'UPDATE_MY_STORE_REQUEST';
export const GET_HISTORY_BILLING_REQUEST = 'GET_HISTORY_BILLING_REQUEST';
export const UPDATE_MY_STORE_AVATAR_REQUEST = 'UPDATE_MY_STORE_AVATAR_REQUEST';

function* getPurchases(action) {
    const response = yield call(Api.getPurchasesRequest, action.payload);
    if (response.ok) {
        const purchases = yield call([response, response.json]);
        yield put(cabinetActions.setPurchasesList(purchases));
    }
}

function* getMyStore() {
    const response = yield call(Api.getMyStoreRequest);
    if (response.ok) {
        const store = yield call([response, response.json]);
        yield put(cabinetActions.setMyStore(store));
    }
}

function* createMyStore(action) {
    const {name, contactEmail, address, twitter, tiktok, instagram, avatar} = action.payload;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('contactEmail', contactEmail);
    formData.append('address', address);
    formData.append('twitter', twitter);
    formData.append('tiktok', tiktok);
    formData.append('instagram', instagram);

    avatar.forEach((value) => {
        formData.append('avatar', value);
    });

    const response = yield call(Api.createMyStoreRequest, formData);

    if (response.ok) {
        const store = yield call([response, response.json]);
        yield put(cabinetActions.setMyStore(store));
        yield put(authActions.setMyStoreSuccessCreated(true));
    }
    // show loading
    yield put(generalActions.showLoading(false));
}

function* updateMyStore(action) {
    const response = yield call(Api.updateMyStoreRequest,  action.payload);
    if (response.ok) {
        const store = yield call([response, response.json]);
        yield put(cabinetActions.setMyStore(store));
        yield put(authActions.setMyStoreSuccessCreated(true));
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    // show preload
    yield put(generalActions.showLoading(false));
}

function* updateMyStoreAvatar(action) {
    const formData = new FormData();
    formData.append('avatar',action.payload);
    const response = yield call(Api.updateMyStoreAvatarRequest,  formData);
    if (response.ok) {
        const store = yield call([response, response.json]);
        yield put(cabinetActions.updateMyStoreAvatar(store));
    }
}


function* getHistoryBillings() {
    const response = yield call(Api.subscriptionBillings);
    if (response.ok) {
        const history = yield call([response, response.json]);
        yield put(cabinetActions.setHistoryBilling(history));
    }
}


function* storeSaga() {
    yield takeEvery(UPDATE_MY_STORE_AVATAR_REQUEST, updateMyStoreAvatar);
    yield takeEvery(GET_PURCHASES_REQUEST, getPurchases);
    yield takeEvery(GET_HISTORY_BILLING_REQUEST, getHistoryBillings);
    yield takeEvery(GET_MY_STORE_REQUEST, getMyStore);
    yield takeEvery(UPDATE_MY_STORE_REQUEST, updateMyStore);
    yield takeEvery(CREATE_MY_STORE_REQUEST, createMyStore);
}

export default storeSaga;