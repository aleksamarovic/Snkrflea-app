import { combineReducers } from 'redux'

import { userReducer as user } from './user/reducer'
import { authReducer as auth } from './auth/reducer'
import { productsReducer as products } from './products/reducer'
import { generalReducer as general } from './general/reducer'
import { storeReducer as store } from './store/reducer'
import { cabinetReducer as cabinet } from './cabinet/reducer'
import { redirectReducer as redirect } from './redirect/reducer'

export const rootReducer = combineReducers({user, auth, products, general, store, cabinet, redirect});
