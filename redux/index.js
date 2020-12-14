import { createStore, applyMiddleware } from 'redux';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

import { persistStore, persistReducer } from 'redux-persist'


import { rootReducer } from './rootReducer';
import createSagaMiddleware from 'redux-saga'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'state',
    storage,
    whitelist: ['user'] // auth will not be persisted
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
