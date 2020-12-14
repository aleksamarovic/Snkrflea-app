import { handleActions } from 'redux-actions'
import { productsActions } from './actions'

const initialState = {
    items: null,
    error: false,
    marketPlace: [],
    updateProduct: false
};

export const productsReducer = handleActions({
        [productsActions.setAllProducts]: (state, {payload}) => ({
            ...state,
            items: [...payload],
        }),
        [productsActions.setMarketPlace]: (state, {payload}) => ({
            ...state,
            marketPlace: [...payload],
        }),
        [productsActions.setUserProductError]: (state, {payload}) => ({
            ...state,
            error: payload,
        }),
        [productsActions.setUpdateProduct]: (state, {payload}) => ({
            ...state,
            updateProduct: payload,
        }),
    },
    initialState,
);
