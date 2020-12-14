// core
import React from 'react'

// library
import classNames from "classnames";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";

// components
import { registerSchema } from '../../../schemas/index';
import { ModalDescription, ModalLayout } from "../../../components";
import { routes } from "../../../constants/routes";
import { authActions } from "../../../redux/auth/actions";
import { generalActions } from "../../../redux/general/actions";
import { getAuthAlreadyErrorState } from "../../../redux/auth/selectors";
import { signUpByEmail } from "../../../api/actions";
import { USER_SIGN_IN_BY_EMAIL_REQUEST } from "../../../redux/auth/sagas";
import { FaceBookButton } from "../../FaceBookButton/FaceBookButton";
import { GoogleButton } from "../../GoogleButton/GoogleButton";

// assets
import styles from './RegisterPremium.module.scss'


export const RegisterPremium = ({classname}) => {
    const dispatch = useDispatch();

    const showUserAlreadyError = useSelector(getAuthAlreadyErrorState);


    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const showLoading = (state) => dispatch(generalActions.showLoading(state));
    const setUserAlreadyError = (state) => dispatch(authActions.userAlreadyError(state));

    function handleErrors(response) {
        if (!response.ok) {
            showLoading(false);
            setUserAlreadyError(true);
            throw Error(response.statusText);
        }
        return response;
    }


    return (
        <ModalLayout
            maxWidth='1301px'
            showPopup={setShowModal}
            classname={classname}>
            <ModalDescription
                minimized
                premium={true}
                title='Premium'
                subTitle='$99/month'
            />
            <div className={styles.popupRight}>
                <h1>Create your account</h1>
                {showUserAlreadyError ? <p className='error ta-c'>This user is already registered</p> : null}
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={registerSchema}
                    onSubmit={async (values, {setSubmitting}) => {
                        setSubmitting(false);
                        showLoading(true);
                        await signUpByEmail({...values})
                            .then(handleErrors)
                            .then(d => d.json())
                            .then(() => {
                                dispatch({type: USER_SIGN_IN_BY_EMAIL_REQUEST, payload: values});
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
                                <Field type="checkbox" name='privacy' />
                                <span className="checkmark" />
                                <p>
                                    By creating an account, you agree to the
                                    <Link href={routes.privacy}><a>Terms and
                                        Conditions</a></Link> and <Link href={routes.privacy}><a>Privacy
                                    Policy</a></Link>
                                </p>
                            </label>
                            {errors.privacy ?
                                <p className={classNames('error', styles.checkbox)}>Field must be checked</p> : null}
                            <button type="submit" className={classNames('btn-primary', styles.continue)}
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
