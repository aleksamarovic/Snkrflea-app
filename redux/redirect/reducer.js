import { handleActions } from 'redux-actions';
import { redirectActions } from './actions';

const initialState = {
    link: '/',
};

export const redirectReducer = handleActions({
        [redirectActions.redirect]: (state, {payload}) => ({
            link: payload,
        }),

    },
    initialState,
);