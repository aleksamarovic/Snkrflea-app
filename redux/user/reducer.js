import { handleActions } from 'redux-actions';
import { userActions } from './actions';

const initialState = {
    user: null,
    currentProduct: null,
};


export const userReducer = handleActions({
        [userActions.userSignInSucceded]: (state, {payload}) => ({
            ...state,
            user: payload,
        }),
        [userActions.setUserToken]: (state, {payload}) => ({
            ...state,
            user: {...state.user,access_token: payload},
        }),
        [userActions.userLogOut]: (state) => ({
            ...state,
            user: null,
        }),
        [userActions.setCurrentProduct]: (state, {payload}) => ({
            ...state,
            currentProduct: {...payload},
        }),
    },
    initialState,
);