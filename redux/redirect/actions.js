import { createActions } from 'redux-actions';


export const redirectActions = createActions(
    {
        // Sync
        REDIRECT: link => link,


    },
    {
        prefix: 'Redirect',
        namespace: '.',
    },
);
