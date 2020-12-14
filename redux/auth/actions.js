import { createActions } from 'redux-actions';


export const authActions = createActions(
    {
        // Sync
        SET_SHOW_MODAL: status => status,
        SET_MY_STORE_SUCCESS_CREATED: store => store,
        SET_USER_PLAN: plan => plan,
        SET_CURRENT_USER: user => user,
        USER_UNAUTHORIZED_ERROR: status => status,
        USER_ALREADY_ERROR: status => status
    },
    {
        prefix: 'Auth',
        namespace: '.',
    },
);
