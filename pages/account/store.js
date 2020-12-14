// core
import React, { useEffect, useState } from 'react'

// library
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { get } from "lodash";
import { payPalSignUpRequest } from '../../api/actions'

// components
import { AccountTabs, GuardLayout } from "../../components";
import { GET_SELLING_LIST_REQUEST } from "../../redux/products/sagas";
import { getStoreState } from "../../redux/cabinet/selectors";
import { getStoreSuccessCreated } from "../../redux/auth/selectors";
import { generalActions } from "../../redux/general/actions";
import {
    CREATE_MY_STORE_REQUEST,
    GET_MY_STORE_REQUEST,
    UPDATE_MY_STORE_REQUEST,
    UPDATE_MY_STORE_AVATAR_REQUEST
} from "../../redux/cabinet/sagas";
import { storeSchema } from "../../schemas";
import { AvatarUploader } from '../../components/AvatarUploader/AvatarUploadere';
// assets
import styles from '../../styles/Account.module.scss'

const Store = () => {
    const dispatch = useDispatch();
    const [store, setStore] = useState(false);
    const [success, setSuccess] = useState(false);
    const [avatar, setAvatar] = useState([]);
    const [redirectUrl, setRedirectUrl] = useState(null);

    const getMyStore = useSelector(getStoreState);
    const storeSuccessCreated = useSelector(getStoreSuccessCreated);

    const showLoading = (state) => dispatch(generalActions.showLoading(state));

    useEffect(() => {
        dispatch({type: GET_SELLING_LIST_REQUEST})
    }, []);

    useEffect(() => {
        dispatch({type: GET_SELLING_LIST_REQUEST});
        dispatch({type: GET_MY_STORE_REQUEST})
    }, []);

    useEffect(() => {
        if (getMyStore) {
            setStore(getMyStore);
        }
    }, [getMyStore]);

    useEffect(() => {
        setSuccess(storeSuccessCreated);
    }, [storeSuccessCreated]);


    useEffect(() => {
        payPalSignUpRequest().then((data) => data.json()).then((data) => {
            setRedirectUrl(data.redirectUrl)
        })
    }, []);

    return (
        <GuardLayout>
            <section className={styles.account}>
                <div className='container'>
                    <div className={styles.content}>
                        <h1>My Account</h1>
                        <AccountTabs activeMenu='Store' />
                        <div className={styles.store}>
                            <div className={styles.storeInner}>
                                {success ?
                                    <div className={styles.updateSuccess}>
                                        <div className={styles.updateSuccessInner}>
                                            <h6>Congratulations on creating your store!</h6>
                                            <p>Now you can list products on the marketplace!</p>
                                        </div>
                                    </div>
                                    : null}
                                <Formik
                                    initialValues={{
                                        name: get(getMyStore, 'name', ''),
                                        contactEmail: get(getMyStore, 'contactEmail', ''),
                                        address: get(getMyStore, 'address', ''),
                                        twitter: get(getMyStore, 'twitter', ''),
                                        tiktok: get(getMyStore, 'tiktok', ''),
                                        instagram: get(getMyStore, 'instagram', ''),
                                    }}
                                    enableReinitialize={true}
                                    validationSchema={storeSchema}
                                    onSubmit={async (values, {setSubmitting}) => {
                                        if (store.name) {
                                            dispatch({
                                                type: UPDATE_MY_STORE_REQUEST,
                                                payload: {...values, avatar}
                                            });
                                        } else {
                                            dispatch({
                                                type: CREATE_MY_STORE_REQUEST,
                                                payload: {...values, avatar}
                                            });
                                        }
                                        setSubmitting(false);
                                        showLoading(true);
                                    }}>
                                    {({isSubmitting, values = null, handleChange}) => (
                                        <Form>
                                            <AvatarUploader src={getMyStore?.avatar?.url}
                                                            onChange={(payload) => {
                                                                dispatch({
                                                                    type: UPDATE_MY_STORE_AVATAR_REQUEST,
                                                                    payload
                                                                });
                                                            }} />
                                            <label>
                                                <span>Store Name</span>
                                                <Field type="text" name="name" value={values.name}
                                                       onChange={handleChange}
                                                       placeholder='Enter Name' />
                                                <ErrorMessage className='error' name="name" component="div" />
                                            </label>
                                            <label>
                                                <span>Contact email</span>
                                                <Field type="email" name="contactEmail"
                                                       placeholder='Enter Email' />
                                                <ErrorMessage className='error' name="contactEmail"
                                                              component="div" />
                                            </label>
                                            <label>
                                                <span>TikTok username</span>
                                                <Field type="text" name="tiktok" placeholder='Enter TikTok' />
                                                <ErrorMessage className='error' name="tiktok" component="div" />
                                            </label>
                                            <label>
                                                <span>Instagram Username</span>
                                                <Field type="text" name="instagram"
                                                       placeholder='Enter Instagram' />
                                                <ErrorMessage className='error' name="instagram"
                                                              component="div" />
                                            </label>
                                            <label>
                                                <span>Twitter Username</span>
                                                <Field type="text" name="twitter" placeholder='Enter Twitter' />
                                                <ErrorMessage className='error' name="twitter"
                                                              component="div" />
                                            </label>
                                            <button type="submit"
                                                    className={classNames('btn-second', styles.continue)}
                                                    disabled={isSubmitting}>
                                                Continue
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                                <div className={styles.paypal}>
                                    <img src='/images/paypal.png' alt='' />
                                    <div className={styles.paypalInner}>
                                        <h6> {getMyStore?.connected ? <span>Paypal connected</span> : null}</h6>

                                        {getMyStore ? <a onClick={async () => {
                                            window.open(redirectUrl);
                                        }}>Connect another account</a> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuardLayout>
    )
};

export default Store
