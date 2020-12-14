// core
import React, { useState } from 'react'

// library
import classNames from "classnames";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux";

// components
import { contactSchema } from '../../../schemas/index';
import { ModalLayout } from "../../../components";
import { authActions } from "../../../redux/auth/actions";

import { ContactUseRequest } from "../../../api/actions";
// assets
import styles from './Contact.module.scss'

export const Contact = ({classname}) => {
    const dispatch = useDispatch();
    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const [success, setSuccess] = useState(false);

    return (
        <ModalLayout
            classname={classname}
            maxWidth='551px'
            showPopup={setShowModal}>
            <div className={styles.popupRight}>
                <h1>Get in touch</h1>
                {
                  success ?
                  <div>
                    <p>Thanks for getting in touch! We'll get back to you soon</p>
                  </div>
                  :
                  <Formik
                      initialValues={{name: '', email: '', reason: ''}}
                      validationSchema={contactSchema}
                      onSubmit={(values, {setSubmitting}) => {
                              ContactUseRequest(values).then(() => {
                                  setSubmitting(false);
                                  setSuccess(true);
                              })
                      }}>
                      {({isSubmitting}) => (
                          <Form>
                              <label>
                                  <span>Name</span>
                                  <Field type="text" name="name" placeholder='Enter Name' />
                                  <ErrorMessage className='error' name="name" component="div" />
                              </label>
                              <label>
                                  <span>Email</span>
                                  <Field type="email" name="email" placeholder='Enter Email' />
                                  <ErrorMessage className='error' name="email" component="div" />
                              </label>
                              <label>
                                  <span>Reason for contact</span>
                                  <Field type="textarea" name="reason" placeholder='What do you need help with?' />

                                  <ErrorMessage className='error' name="reason" component="div" />
                              </label>
                              <button type="submit"
                                      className={classNames('btn-second', styles.continue)}
                                      disabled={isSubmitting}>
                                  Continue
                              </button>
                          </Form>
                      )}
                  </Formik>
                }

            </div>
        </ModalLayout>
    )
};
