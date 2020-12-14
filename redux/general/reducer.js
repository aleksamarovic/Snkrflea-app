import { handleActions } from 'redux-actions';
import { generalActions } from './actions';

const initialState = {
    isLoading: false,
    showFilters: false,
};

export const generalReducer = handleActions({
        [generalActions.showLoading]: (state, {payload}) => ({
            ...state,
            isLoading: payload,
        }),
        [generalActions.setShowFilters]: (state, {payload}) => ({
            ...state,
            showFilters: payload,
        }),

    },
    initialState,
);