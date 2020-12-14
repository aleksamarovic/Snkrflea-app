// core
import React, { useState } from 'react'

// library
import classNames from "classnames";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux";

// components
import { reportSchema } from '../../../schemas/index';
import { ModalLayout } from "../../../components";
import { authActions } from "../../../redux/auth/actions";
import { ReportProductRequest } from '../../../api/actions'
// assets
import styles from './Report.module.scss'

export const Report = ({productId, classname}) => {
    const dispatch = useDispatch();
    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const [success, setSuccess] = useState(false);

    return (
        <ModalLayout
            classname={classname}
            maxWidth='551px'
            showPopup={setShowModal}>
            <div className={styles.popupRight}>
                <h1>Report this post</h1>
                {
                  success ?
                  <div>
                    <p>Thanks for reporting this listing! We'll review it as soon as possible</p>
                  </div>
                  :
                  <Formik
                      initialValues={{reason: '', report: ''}}
                      validationSchema={reportSchema}
                      onSubmit={(values, {setSubmitting}) => {
                          ReportProductRequest({...values, productId}).then(() => {
                              setSubmitting(false);
                              setSuccess(true);
                          })
                      }}>
                      {({isSubmitting}) => (
                          <Form>
                              <label>
                                  <span>Select reason</span>
                                  <Field as="select" name="reason">
                                      <option selected disabled>Select option*</option>
                                      <option value="Fake listing">Fake listing</option>
                                      <option value="Controversial">Controversial</option>
                                      <option value="Scam">Scam</option>
                                  </Field>
                                  <ErrorMessage className='error' name="help" component="div" />
                              </label>
                              <label>
                                  <span>Additional comments</span>
                                  <Field type='text' name="report"
                                         placeholder='This post is trying to sell a shoe that doesn’t even exist' />
                                  <ErrorMessage className='error' name="report" component="div" />
                              </label>
                              <button type="submit"
                                      className={classNames('btn-second', styles.continue)}
                                      disabled={isSubmitting}>
                                  Submit report
                              </button>
                          </Form>
                      )}
                  </Formik>
                }

            </div>
        </ModalLayout>
    )
};
