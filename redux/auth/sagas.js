import { call, put, select, takeEvery } from 'redux-saga/effects'

import * as Api from '../../api/actions.js'
import { authActions } from "./actions";
import { userActions } from "../user/actions";
import { generalActions } from "../general/actions";
import * as selectors from './selectors';
import { redirectActions } from "../redirect/actions";
import { routes } from "../../constants/routes";

export const USER_SIGN_IN_BY_EMAIL_REQUEST = 'USER_SIGN_IN_BY_EMAIL_REQUEST';
export const USER_SIGN_IN_BY_FACEBOOK_REQUEST = 'USER_SIGN_IN_BY_FACEBOOK_REQUEST';
export const USER_SIGN_IN_BY_GOOGLE_REQUEST = 'USER_SIGN_IN_BY_GOOGLE_REQUEST';
export const GET_PLAN_REQUEST = 'GET_PLAN_REQUEST';
export const SET_ACCESS_TOKEN_START = 'SET_ACCESS_TOKEN_START';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* authByEmail(action) {
    const getShowModal = yield select(selectors.getShowModal);
    const response = yield call(Api.signInByEmail, action.payload);
    if (response.ok) {
        const data = yield call([response, response.json]);
        yield put(userActions.userSignInSucceded(data));
        if (getShowModal === 'register-premium') {
            yield put(authActions.setShowModal('premium-payment'));
        } else if (getShowModal === 'register') {
            yield put(authActions.setShowModal('create-store'));            
            yield put(redirectActions.redirect(routes.marketplace));
        }
        else
        {
            yield put(authActions.setShowModal(null));                    
            yield put(redirectActions.redirect(routes.marketplace));
        }
    } else {
        yield put(authActions.userUnauthorizedError(true));
        yield put(authActions.userAlreadyError(true));
    }
    yield put(generalActions.showLoading(false));
}

function* authByFacebook(action) {
    const response = yield call(Api.signInByFacebook, action.payload);
    if (response.ok) {
        const data = yield call([response, response.json]);
        const {access_token} = data;
        yield put({type: SET_ACCESS_TOKEN_START, payload: access_token});
    } else {
        yield put(authActions.userUnauthorizedError(true));
        yield put(authActions.userAlreadyError(true));
    }
    yield put(authActions.setShowModal(''));
}

function* authByGoogle(action) {
    const response = yield call(Api.signInByGoogle, action.payload);
    if (response.ok) {
        const data = yield call([response, response.json]);
        yield put(userActions.userSignInSucceded(data));
        yield put(authActions.setShowModal(''));
    } else {
        yield put(authActions.userUnauthorizedError(true));
        yield put(authActions.userAlreadyError(true));
    }
}

function* setAccessToken({payload}) {
    const access_token = payload;
    yield put(authActions.setShowModal('login'));
    const response = yield call(Api.getCurrentUserRequest, access_token);
    if (response.ok) {
        const user = yield call([response, response.json]);
        yield put(userActions.userSignInSucceded({...user, access_token}));
        yield put(redirectActions.redirect(routes.marketplace));
    } else {
        alert('ERROR');
    }
    yield put(authActions.setShowModal(''));
}

function* getPlan() {
    const response = yield call(Api.getSubscriptionPlan);
    console.log(response, 'response');
    if (response.ok) {
        const plan = yield call([response, response.json]);
        console.log(plan, 'plan');
        // yield put(authActions.setUserPlan(plan));
    } else {
        // yield put(authActions.setUserPlan(null));
    }
}

function* setCurrentUser({payload}) {
    const response = yield call(Api.getCurrentUserRequest, payload);
    if (response.ok) {
        const user = yield call([response, response.json]);
        yield put(authActions.setCurrentUser(user));
    } else {
        alert('ERROR');
    }
}


/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* authSaga() {
    yield takeEvery(SET_ACCESS_TOKEN_START, setAccessToken);
    yield takeEvery(USER_SIGN_IN_BY_EMAIL_REQUEST, authByEmail);
    yield takeEvery(USER_SIGN_IN_BY_FACEBOOK_REQUEST, authByFacebook);
    yield takeEvery(USER_SIGN_IN_BY_GOOGLE_REQUEST, authByGoogle);
    yield takeEvery(GET_PLAN_REQUEST, getPlan);
    yield takeEvery(SET_CURRENT_USER, setCurrentUser);
}

export default authSaga;