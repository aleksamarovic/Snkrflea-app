import fetchIntercept from 'fetch-intercept';
import { getAuthToken } from '../redux/localStorage'
import axios from 'axios'
import qs from "qs";

export const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const {NEXT_PUBLIC_API_URL} = process.env;

const paths = {
    'sellings': 'api/products/vendor',
    'purchases': 'api/purchases',
    'products': 'api/products',
    'sign_up_by_email': 'api/auth/email/sign-up',
    'sign_in_by_email': 'api/auth/email/sign-in',
    'sign_in_by_google': 'api/auth/google/sign-in',
    'sign_up_by_google': 'api/auth/google/sign-up',
    'sign_in_by_facebook': 'api/auth/facebook/sign-in',
    'current_user': 'api/users/current',
    'addProduct': 'api/products',
    'createStore': 'api/store',
    'getStore': 'api/store',
    'updateStore': 'api/store/update',
    'updateStoreAvatar': 'api/store/avatar',
    'subscripeToPremium': 'api/users/subscription/premium',
    'billings': 'api/users/subscription/billings',
    'plan': 'api/users/subscription/plan',
    'paypalSignUp': 'api/paypal/sign-up',
    'createTransaction': 'api/paypal/order/capture-transaction',
    'createPayPalOrder': 'api/paypal/order/create',
    'brands': 'api/brands',
    'categories': 'api/categories',
    'sizes': 'api/sizes',
    'subCategories': 'api/sub-categories',
    'contact_us': 'api/mail/contact-us',
    'report_product': 'api/mail/product-report',
};

export const getBrandsRequest = () => (
    fetch(paths.brands, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(d => d.json()));

export const getCategoriesRequest = (query) => (
    fetch(`${paths.categories}?${qs.stringify(query)}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ).then(d => d.json()));

export const getSizeRequest = (query) => (
    fetch(`${paths.sizes}?${qs.stringify(query)}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ).then(d => d.json()));


export const getSubcategoriesRequest = (query) => (
    fetch(`${paths.subCategories}?${qs.stringify(query)}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ).then(d => d.json()));

export const getProductsRequest = (query) => (
    fetch(`${paths.products}?${qs.stringify(query)}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ).then(d => d.json()));

const defaultRequestParams = {
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
};

const unregister = fetchIntercept.register({
    request: function (url, config) {
        if (url.includes('api')) {
            const withDefaults = Object.assign({
                ...defaultRequestParams

            }, config);
            withDefaults.headers = new Headers({
                ...(config.headers?.Authorization ? {} : { 'Authorization': `Bearer ${getAuthToken()}`}),
                ...config.headers,
            });
            return [`${NEXT_PUBLIC_API_URL}/${url}`, withDefaults];
        } else {
            return [url, config];
        }
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});


export const signInByEmail = (data) => (
    fetch(`${paths.sign_in_by_email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
));

export const ContactUseRequest = (data) => (
    fetch(`${paths.contact_us}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
));

export const ReportProductRequest = (data) => (
    fetch(`${paths.report_product}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
));

export const signUpByEmail = (data) => (
    fetch(`${paths.sign_up_by_email}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST', body: JSON.stringify(data)
        }
    ));

export const signInByGoogle = () => (
    fetch(`${paths.sign_in_by_google}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
));

export const getCurrentUserRequest = (token) => (
    fetch(`${paths.current_user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            },
        }
));

export const signInByFacebook = (access_token) => (
    fetch(`${paths.sign_in_by_facebook}?access_token=${access_token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const addNewProduct = (formData) => (
    fetch(`${paths.addProduct}`, {method: 'POST', body: formData}
    ));

export const updateProduct = (formData, productId) => (
    fetch(`${paths.addProduct}/${productId}`, {
            method: 'POST',
            cors: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
    ));
export const deleteProductImg = (imgId) => (
    fetch(`api/products/image/${imgId}`, {
            method: 'DELETE',
            cors: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ));

export const addProductImgs = (files, id) => {
    let formData = new FormData();
    files.forEach(v => {
        formData.append('images[]', v)
    });
    return fetch(`api/products/images/${id}`, {
        method: 'PUT',
        cors: 'no-cors',
        body: formData
    })
};

export const payPalSignUpRequest = () => (
    fetch(paths.paypalSignUp, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ));

export const createPayPalTransactionRequest = (data) => (
    fetch(`${paths.createTransaction}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    ));

export const createPayPalOrderRequest = (productId) => (
    fetch(`${paths.createPayPalOrder}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ));

export const subscripeToPremium = (paymentMethodId) => (
    fetch(`${paths.subscripeToPremium}/${paymentMethodId}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const subscriptionBillings = () => (
    fetch(`${paths.billings}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const createMyStoreRequest = (formData) => (
    fetch(`${paths.createStore}`, {
            method: 'POST',
            ...defaultRequestParams,
            body: formData
        }
    ));

export const updateMyStoreRequest = (body) => (
    fetch(`${paths.updateStore}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    ));

export const updateMyStoreAvatarRequest = (formdata) => (
    fetch(`${paths.updateStoreAvatar}`, {
            method: 'POST',
            body: formdata
        }
    ));

export const getMyStoreRequest = () => (
    fetch(`${paths.getStore}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const getMarketplaceList = () => (
    fetch(`${paths.products}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const getSellingList = () => (
    fetch(`${paths.sellings}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const getPurchasesRequest = () => (
    fetch(`${paths.purchases}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const getStoreByIdRequest = (id) => (
    fetch(`${paths.getStore}/${id}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const getProductById = (id) => (
    fetch(`${paths.products}/${id}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const getProductForUpdateById = (id) => (
    fetch(`${paths.products}/vendor/${id}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));

export const getSubscriptionPlan = () => (
    fetch(`${paths.plan}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        }
    ));
