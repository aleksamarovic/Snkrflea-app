import { handleActions } from 'redux-actions';
import { cabinetActions } from './actions';

const initialState = {
    purchases: [],
    myStore: null,
    billings: []
};

export const cabinetReducer = handleActions({
        [cabinetActions.setPurchasesList]: (state, {payload}) => ({
            ...state,
            purchases: [...payload],
        }),
        [cabinetActions.setMyStore]: (state, {payload}) => ({
            ...state,
            myStore: payload,
        }),
        [cabinetActions.updateMyStoreAvatar]: (state, {payload}) => ({
            ...state,
            myStore: { ...state.myStore, avatar: payload},
        }),
        [cabinetActions.setHistoryBilling]: (state, {payload}) => ({
            ...state,
            billings: payload,
        }),
    },
    initialState,
);