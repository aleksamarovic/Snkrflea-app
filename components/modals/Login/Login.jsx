// core
import React from 'react'

// library
import classNames from "classnames";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";

// components
import { loginSchema } from '../../../schemas/index';
import { ModalLayout } from "../../../components";
import { authActions } from "../../../redux/auth/actions";
import { generalActions } from "../../../redux/general/actions";

import {
    getAuthorizedErrorState
} from "../../../redux/auth/selectors";

import { USER_SIGN_IN_BY_EMAIL_REQUEST, } from "../../../redux/auth/sagas";

// assets
import styles from './Login.module.scss'
import { FaceBookButton } from "../../FaceBookButton/FaceBookButton";
import { GoogleButton } from "../../GoogleButton/GoogleButton";


export const Login = ({classname}) => {
    const dispatch = useDispatch();
    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const showUnathorizedError = useSelector(getAuthorizedErrorState);
    const setUnathorizedError = (state) => dispatch(authActions.userUnauthorizedError(state));
    const showLoading = (state) => dispatch(generalActions.showLoading(state));


    return (
        <ModalLayout
            maxWidth='649px'
            showPopup={setShowModal}
            classname={classname}>
            <div className={styles.popupRight}>
                <h1>Login
                    <p onClick={() => setShowModal('register')}
                       className={styles.create}>
                        Create an account
                    </p>
                </h1>
                {showUnathorizedError ? <p className='error ta-c'>User Not Found</p> : null}
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={loginSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        const newValues = {...values, email: values.email.toLowerCase()};
                        dispatch({type: USER_SIGN_IN_BY_EMAIL_REQUEST, payload: newValues});
                        setSubmitting(false);
                        showLoading(true);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form onChange={() => setUnathorizedError(false)}
                        >
                            <label className={styles.label}>
                                <span>Email</span>
                                <Field type="email" name="email" placeholder='Enter Email' />
                                <ErrorMessage className='error' name="email" component="div" />
                            </label>
                            <label className={styles.label}>
                                <span>Password</span>
                                <Field type="password" name="password" placeholder='Password' />
                                <ErrorMessage className='error' name="password" component="div" />
                            </label>
                            <button type="submit" className={classNames('btn-second', styles.continue)}
                                    disabled={isSubmitting}>Continue
                            </button>
                            <p className={styles.signUp}>Or continue with</p>
                            <div className={styles.buttons}>
                                <FaceBookButton />
                                <GoogleButton />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalLayout>
    )
};
