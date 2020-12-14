import { call, put, takeEvery } from 'redux-saga/effects'
import * as Api from '../../api/actions.js'
import { productsActions } from "./actions";
import { generalActions } from "../general/actions";
import { userActions } from "../user/actions";
import { storeActions } from "../store/actions";
import { redirectActions } from "../redirect/actions";
import { routes } from "../../constants/routes";

export const ADD_NEW_PRODUCT_REQUEST = 'ADD_NEW_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const GET_SELLING_LIST_REQUEST = 'GET_SELLING_LIST_REQUEST';
export const GET_PRODUCT_ITEM_REQUEST = 'GET_PRODUCT_ITEM_REQUEST';
export const GET_PRODUCT_ITEM_INFO_REQUEST = 'GET_PRODUCT_ITEM_INFO_REQUEST';
export const GET_MARKET_PLACE_REQUEST = 'GET_MARKET_PLACE_REQUEST';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* addNewProduct(action) {
    const {title, description, price, images, brandId, categoryId, sizeId, subCategoryId, availability, condition} = action.payload;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', Number(price));
    formData.append('brandId', Number(brandId));
    formData.append('categoryId', Number(categoryId));
    formData.append('sizeId', Number(sizeId));
    formData.append('subCategoryId', Number(subCategoryId));
    formData.append('condition', condition);
    formData.append('availability', availability);

    images.forEach((value) => {
        formData.append('images[]', value);
    });

    const response = yield call(Api.addNewProduct, formData);
    if (response.ok) {
        yield put(storeActions.setSuccessStore(true));
    } else if (response.status === 400) {
        yield put(productsActions.setUserProductError(true));
    }
    yield put(generalActions.showLoading(false));
}

function* updateProduct(action) {
    const {id} = action.payload;
    const response = yield call(Api.updateProduct, action.payload, id);
    if (response.ok) {
        yield put(storeActions.setSuccessStore(true));
        yield put(redirectActions.redirect(routes.selling));
        yield put(productsActions.setUpdateProduct(true));
    } else if (response.status === 400) {
        yield put(productsActions.setUserProductError(true));
    }
    yield put(generalActions.showLoading(false));
}

function* getMarketplace() {
    const response = yield call(Api.getMarketplaceList);
    if (response.ok) {
        const list = yield call([response, response.json]);
        yield put(productsActions.setMarketPlace(list));
    }
}

function* getSellingList() {
    const response = yield call(Api.getSellingList);
    if (response.ok) {
        const products = yield call([response, response.json]);
        yield put(productsActions.setAllProducts(products));
    }
}

function* getProduct(action) {
    const response = yield call(Api.getProductForUpdateById, action.payload);
    if (response.ok) {
        const product = yield call([response, response.json]);
        yield put(userActions.setCurrentProduct(product));
    }
}

function* getProductInfo(action) {
    const response = yield call(Api.getProductById, action.payload);
    if (response.ok) {
        const product = yield call([response, response.json]);
        yield put(userActions.setCurrentProduct(product));
    }
}

function* productsSaga() {
    yield takeEvery(ADD_NEW_PRODUCT_REQUEST, addNewProduct);
    yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProduct);
    yield takeEvery(GET_SELLING_LIST_REQUEST, getSellingList);
    yield takeEvery(GET_PRODUCT_ITEM_REQUEST, getProduct);
    yield takeEvery(GET_PRODUCT_ITEM_INFO_REQUEST, getProductInfo);
    yield takeEvery(GET_MARKET_PLACE_REQUEST, getMarketplace);
}


export default productsSaga;