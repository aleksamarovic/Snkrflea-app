import { createActions } from 'redux-actions';


export const generalActions = createActions(
    {
        // Sync
        SHOW_LOADING: status => status,
        SET_SHOW_FILTERS: status => status,

        // Async
        SHOW_LOADING_ASYNC: void 0,

    },
    {
        prefix: 'General',
        namespace: '.',
    },
);
