import { spawn } from 'redux-saga/effects'
import userSaga from './user/sagas'
import authSaga from './auth/sagas'
import productsSaga from './products/sagas'
import storeSaga from './store/sagas'
import cabinetSaga from './cabinet/sagas'

export default function* rootSaga () {
  yield spawn(userSaga);
  yield spawn(authSaga);
  yield spawn(productsSaga);
  yield spawn(storeSaga);
  yield spawn(cabinetSaga)
}
