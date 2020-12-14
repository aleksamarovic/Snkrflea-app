import { call, put, takeEvery } from 'redux-saga/effects'
import * as Api from '../../api/actions.js'
import { storeActions } from "./actions";
export const GET_STORE_BY_ID_REQUEST = 'GET_STORE_BY_ID_REQUEST';

function* getStore(action) { 
  const response = yield call(Api.getStoreByIdRequest,action.payload);
  if (response.ok) {
    const store = yield call([response, response.json]);
    yield put(storeActions.setSelectedStore(store));
  }
}

function* storeSaga() {
  yield takeEvery(GET_STORE_BY_ID_REQUEST, getStore);
}



export default storeSaga;