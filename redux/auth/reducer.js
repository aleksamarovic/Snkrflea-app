import { handleActions } from 'redux-actions';
import { authActions } from './actions';

const initialState = {
    showModal: '',
    storeCreated: false,
    plan: null,
    alreadyError: false,
    unauthorizedError: false,
    currentUser: null,
};


export const authReducer = handleActions({
        [authActions.setUserPlan]: (state, {payload}) => ({
            ...state,
            plan: payload,
        }),
        [authActions.userUnauthorizedError]: (state, {payload}) => ({
            ...state,
            unauthorizedError: payload,
        }),
        [authActions.userAlreadyError]: (state, {payload}) => ({
            ...state,
            alreadyError: payload,
        }),
        [authActions.setMyStoreSuccessCreated]: (state, {payload}) => ({
            ...state,
            storeCreated: payload,
        }),
        [authActions.setCurrentUser]: (state, {payload}) => ({
            ...state,
            currentUser: payload,
        }),
        [authActions.setShowModal]: (state, {payload}) => ({
            ...state,
            showModal: payload,
        }),
    },
    initialState,
);