import { handleActions } from 'redux-actions';
import { storeActions } from './actions';

const initialState = {
    selectedStore: null,
    success: false,
};

export const storeReducer = handleActions({
        [storeActions.setSelectedStore]: (state, { payload }) => ({
            ...state,
            selectedStore: {...payload},
        }),
        [storeActions.setSuccessStore]: (state, { payload }) => ({
            ...state,
            success: payload,
        }),
       
    },
    initialState,
);