import { createActions } from 'redux-actions';


export const userActions = createActions(
    {
        // Sync
        USER_SIGN_IN_SUCCEDED: user => user,
        SET_USER_TOKEN: token => token,
        SET_CURRENT_PRODUCT: product => product,

        // Async
        USER_LOG_OUT_START: void 0,
        USER_LOG_OUT: void 0,
    },
    {
        prefix: 'User',
        namespace: '.',
    },
);
