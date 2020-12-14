// core
import React, { useEffect, useState } from 'react'

// library
// import PropTypes from 'prop-types'
import classNames from "classnames";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";

// components
import { registerSchema } from '../../../schemas/index';
import { ModalDescription, ModalLayout } from "../../../components";
import { routes } from "../../../constants/routes";
import { authActions } from "../../../redux/auth/actions";
import { signUpByEmail } from '../../../api/actions.js'
import { getAuthAlreadyErrorState, getCurrentUser } from "../../../redux/auth/selectors";
import { getUserState } from "../../../redux/user/selectors";
import { generalActions } from "../../../redux/general/actions";
import { SET_CURRENT_USER, USER_SIGN_IN_BY_EMAIL_REQUEST } from "../../../redux/auth/sagas";
import { FaceBookButton } from "../../FaceBookButton/FaceBookButton";
import { GoogleButton } from "../../GoogleButton/GoogleButton";

// assets
import styles from './Register.module.scss'
import { redirectActions } from "../../../redux/redirect/actions";

export const Register = ({classname}) => {
    const dispatch = useDispatch();
    const user = useSelector(getUserState);
    const showUserAlreadyError = useSelector(getAuthAlreadyErrorState);
    const currentUser = useSelector(getCurrentUser);

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const setUserAlreadyError = (state) => dispatch(authActions.userAlreadyError(state));
    const showLoading = (state) => dispatch(generalActions.showLoading(state));
    const setRedirect = (state) => dispatch(redirectActions.redirect(state));

    function handleErrors(response) {
        if (!response.ok) {
            showLoading(false);
            setUserAlreadyError(true);
            throw Error(response.statusText);
        }
        return response;
    }


    const [showUser, setShowUser] = useState();
    // const getPlans = useSelector(getPlan);

    useEffect(() => {
        if (user !== null) {
            setShowUser(true);
        } else {
            setShowUser(false);
        }
    }, [user]);

    // useEffect(() => {
    //     dispatch({type: GET_PLAN_REQUEST})
    // }, [getPlans]);
    // console.log('getPlans',getPlans);


    useEffect(() => {
        if (user) {
            dispatch({type: SET_CURRENT_USER, payload: user.access_token})
        }
    }, [user]);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.store) {
                setRedirect(routes.marketplace);
            }
        }
    }, [currentUser]);

    console.log(user, 'user');
    return (
        <ModalLayout
            maxWidth='1301px'
            showPopup={setShowModal}
            classname={classname}>
            {/*
            <span className={styles.back} onClick={() => setShowModal('plans')}>
                Back
                </span>
                */}
            <ModalDescription
                minimized
                title='Starter'
                subTitle='Free' />
            {!showUser ?
                <div className={styles.popupRight}>
                    <h1>
                        Create your account
                        <span className={styles.login} onClick={() => setShowModal('login')}>
                    Login
                </span>
                    </h1>
                    {showUserAlreadyError ? <p className='error ta-c'>This user is already registered</p> : null}
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={registerSchema}
                        onSubmit={async (values, {setSubmitting}) => {
                            setSubmitting(false);
                            showLoading(true);
                            const newValues = {...values, email: values.email.toLowerCase()};                            
                            await signUpByEmail({...newValues})
                                .then(handleErrors)
                                .then(d => d.json())
                                .then(() => {                                    
                                    dispatch({type: USER_SIGN_IN_BY_EMAIL_REQUEST, payload: newValues});
                                })
                        }}
                    >
                        {({isSubmitting, errors}) => (
                            <Form onChange={() => setUserAlreadyError(false)}>
                                <label>
                                    <span>Email</span>
                                    <Field type="email" name="email" placeholder='Enter Email' />
                                    <ErrorMessage className='error' name="email" component="div" />
                                </label>
                                <label>
                                    <span>Password</span>
                                    <Field type="password" name="password" placeholder='Password' />
                                    <ErrorMessage className='error' name="password" component="div" />
                                </label>
                                <label className="checkbox">
                                    <Field type="checkbox" name="privacy" />
                                    <span className="checkmark" />
                                    <p>
                                        By creating an account, you agree to the
                                        <Link href={routes.privacy}><a>Terms and
                                            Conditions</a></Link> and <Link href={routes.privacy}><a>Privacy
                                        Policy</a></Link>
                                    </p>
                                </label>
                                {errors.privacy ? <p className={classNames('error', styles.checkbox)}>Field must be
                                    checked</p> : null}
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
                : <div className={styles.success}>
                    <img src='/icons/boots.svg' alt='' />
                    <h3>Your account was <br /> successfully created!</h3>
                    <button type='button' className='btn-second' onClick={() => setShowModal('create-store')}>Create my
                        store
                    </button>
                </div>}
        </ModalLayout>
    )
};
