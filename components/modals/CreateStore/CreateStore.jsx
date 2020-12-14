// core
import React, { useEffect, useState } from 'react'

// library
import classNames from "classnames";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";

// components
import { storeSchema } from '../../../schemas/index';
import { ModalLayout } from '../..';
import { authActions } from "../../../redux/auth/actions";
import { DropZone } from "../../../components";

import { payPalSignUpRequest } from '../../../api/actions'

// assets
import styles from './CreateStore.module.scss'
import Link from "next/link";
import {
    CREATE_MY_STORE_REQUEST,
    UPDATE_MY_STORE_REQUEST,
} from "../../../redux/cabinet/sagas";
import { generalActions } from "../../../redux/general/actions";
import { getStoreState } from "../../../redux/cabinet/selectors";
import { getStoreSuccessCreated } from "../../../redux/auth/selectors";
import { get } from 'lodash';

export const CreateStore = ({classname}) => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState([]);
    const [store, setStore] = useState(false);
    const [success, setSuccess] = useState(false);
    const [directToPaypal, setDirectToPaypal] = useState(false);

    const [redirectUrl, setRedirectUrl] = useState(null);
    const getMyStore = useSelector(getStoreState);
    const storeSuccessCreated = useSelector(getStoreSuccessCreated);

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const setMyStoreSuccessCreated = (state) => dispatch(authActions.setMyStoreSuccessCreated(state));
    const showLoading = (state) => dispatch(generalActions.showLoading(state));


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

    const showPopup = (state) => {
        setShowModal(state);
        setMyStoreSuccessCreated(false);
    };

    const handlePaypalClick = (submitForm) => {
      setDirectToPaypal(true);
      submitForm()
    };
    return (
        <ModalLayout
            maxWidth='1301px'
            showPopup={showPopup}
            classname={classname}>
            <h1 className={styles.title}>Create your store</h1>
            {(!success || !store) ?
                <>
                    <div className={styles.popupRight}>
                        <Formik
                            initialValues={{
                                avatar: get(getMyStore,'img',''),
                                name: get(getMyStore,'name',''),
                                contactEmail: get(getMyStore,'contactEmail',''),
                                address:  get(getMyStore,'address',''),
                                twitter: get(getMyStore,'twitter',''),
                                tiktok: get(getMyStore,'tiktok',''),
                                instagram: get(getMyStore,'instagram',''),
                            }}
                            validationSchema={storeSchema}
                            onSubmit={async (values, {setSubmitting}) => {
                                if (store.name) {
                                    dispatch({type: UPDATE_MY_STORE_REQUEST, payload: {...values, avatar}});
                                } else {
                                    dispatch({type: CREATE_MY_STORE_REQUEST, payload: {...values, avatar}});
                                }
                                if (directToPaypal) {
                                  window.open(redirectUrl);
                                }
                                setSubmitting(false);
                                showLoading(true);
                            }}>
                            {({isSubmitting, values = null, handleChange, submitForm}) => (
                                <Form>
                                    <div className={classNames(styles.avatar, avatar.length !== 0 && styles.active)}>
                                        <div
                                            className={styles.dropZone}>
                                            <DropZone
                                                files={avatar}
                                                setFiles={setAvatar} avatar />
                                        </div>
                                        {getMyStore?.img ? <img src={getMyStore?.img} alt='' />
                                            : <img src={'/icons/avatar.svg'} alt='' />}
                                    </div>
                                    <label>
                                        <span>Store Name</span>
                                        <Field type="text" name="name" value={values.name} onChange={handleChange}
                                               placeholder='Enter Name' />
                                        <ErrorMessage className='error' name="name" component="div" />
                                    </label>
                                    <label>
                                        <span>Contact email</span>
                                        <Field type="email" name="contactEmail" placeholder='Enter Email' />
                                        <ErrorMessage className='error' name="contactEmail" component="div" />
                                    </label>
                                    <label>
                                        <span>TikTok username</span>
                                        <Field type="text" name="tiktok" placeholder='Enter TikTok' />
                                        <ErrorMessage className='error' name="tiktok" component="div" />
                                    </label>
                                    <label>
                                        <span>Instagram Username</span>
                                        <Field type="text" name="instagram" placeholder='Enter Instagram' />
                                        <ErrorMessage className='error' name="instagram" component="div" />
                                    </label>
                                    <label>
                                        <span>Twitter Username</span>
                                        <Field type="text" name="twitter" placeholder='Enter Twitter' />
                                        <ErrorMessage className='error' name="twitter" component="div" />
                                    </label>
                                    <label>
                                        <span>Shipping Address</span>
                                        <Field type="text" name="address" placeholder='Enter Address' />
                                        <ErrorMessage className='error' name="address" component="div" />
                                    </label>
                                    <label>
                                        <span>Apt # / Building No.</span>
                                        <Field type="text" name="apt" placeholder='Enter Apt' />
                                        <ErrorMessage className='error' name="apt" component="div" />
                                    </label>
                                    <h6>
                                        Connect your Paypal for get paid instantly
                                    </h6>
                                    <button type="button" onClick={()=>handlePaypalClick(submitForm)}
                                            className={classNames('btn-second', styles.payPal)}>
                                        PayPal
                                    </button>
                                    <p className={styles.noPayPal}>
                                        No paypal? No worries! Your customers can contact you via email or social
                                        profiles
                                        by entering below
                                    </p>
                                    <button type="submit"
                                            className={classNames('btn-second', styles.continue)}
                                            disabled={isSubmitting}>
                                        Continue without Paypal
                                    </button>
                                </Form>
                            )}
                        </Formik>

                    </div>
                    <div className={styles.popupLeft}>
                        <ul>
                            <li>
                                <img className={styles.first} src='/images/home/paypal.jpg' alt='' />
                                <img className={styles.first} src='/icons/home/secure.svg' alt='' />
                                <span>
                                    Paypal protection for buyers <br />
                                and sellers. <Link
                                    href='https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security'><a
                                    target='_blank'>Learn more</a></Link>
                                </span>
                            </li>
                            <li>
                                <img src='/icons/infinity.svg' alt='' />
                                <span>
                                    Upload unlimited <br />
                                items for sale
                                </span>
                            </li>
                            <li>
                                <img src='/icons/store.svg' alt='' />
                                <span>
                                    Your own store with a <br />
                                unique link
                                </span>
                            </li>
                            <li>
                                <img src='/icons/fist.svg' alt='' />
                                <span>
                                    Never pay a commission <br />
                                or seller fee
                                </span>
                            </li>
                        </ul>
                    </div>
                </>
                : <div className={styles.success}>
                    <img src='/icons/boots.svg' alt='' />
                    <h2>Congratulations on creating or updating your store!</h2>
                </div>}
        </ModalLayout>
    )
};
