import { createActions } from 'redux-actions'


export const productsActions = createActions(
    {
        // Sync
        SET_ALL_PRODUCTS: products => products,
        SET_USER_PRODUCT_ERROR: product => product,
        SET_MARKET_PLACE: list => list,
        SET_UPDATE_PRODUCT: state => state,
    },
    {
        prefix: 'Products',
        namespace: '.',
    },
);

