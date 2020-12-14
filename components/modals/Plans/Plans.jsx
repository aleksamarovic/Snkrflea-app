// core
import React from 'react'

// library
import { useDispatch } from "react-redux";

// components
import { ModalDescription, ModalLayout } from "../../../components";
import { authActions } from "../../../redux/auth/actions";

// assets
import styles from './Plans.module.scss'

export const Plans = ({classname}) => {
    const dispatch = useDispatch();

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    return (
        <ModalLayout
            classname={classname}
            maxWidth='1301px'
            showPopup={setShowModal}>
            <div className={styles.black_background}/>

            <h1 className={styles.title}>Become a member</h1>
            {/*
            <div className={styles.tabs}>
                <div className={styles.tabsInner}>
                    <span className={styles.active}>1 month</span>
                    <span>1 year</span>
                </div>

            </div>
            */}
            <ModalDescription
                classname={classname}
                title='Starter'
                subTitle='Free'
                showButton
            />
            <ModalDescription
                premium={true}
                title='Premium'
                subTitle='$99/month'
                showButton
                classname={classname}
            />
        </ModalLayout>
    )
};
