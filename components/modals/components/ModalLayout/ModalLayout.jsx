// core
import React, { useEffect, useRef, useState } from 'react'

// library
import classNames from "classnames";

// components
import { useOutsideClick } from "../../../customHooks/useOutsideClick";

// assets
import styles from './ModalLayout.module.scss'
import { authActions } from "../../../../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { getShowModal } from "../../../../redux/auth/selectors";

export const ModalLayout = ({children, maxWidth, classname}) => {
    const dispatch = useDispatch();

    const [style, setStyle] = useState(null);

    const innerPopup = useRef();

    const showModal = useSelector(getShowModal);

    const setUnathorizedError = (state) => dispatch(authActions.userUnauthorizedError(state));
    const setAuthAlreadyError = (state) => dispatch(authActions.userAlreadyError(state));
    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    useEffect(() => {
        if (classname === 'register') {
            setStyle(styles.register)
        } else if (classname === 'premium') {
            setStyle(styles.premium)
        } else if (classname === 'plans') {
            setStyle(styles.plans)
        } else if (classname === 'payment') {
            setStyle(styles.payment)
        } else if (classname === 'login') {
            setStyle(styles.login)
        } else if (classname === 'product-fullScreenInner') {
            setStyle(styles.productFullScreenInner)
        } else if (classname === 'report') {
            setStyle(styles.report)
        } else if (classname === 'contact') {
            setStyle(styles.contact)
        }
    }, [classname]);

    function outsidePClick() {
        if (showModal !== '') {
            // setShowModal('')
        }
    }

    useOutsideClick(innerPopup, outsidePClick);

    return (
        <div className={classNames(styles.popup, style)}>
            <div
                ref={innerPopup}
                className={styles.popupInner} style={{maxWidth: maxWidth}}>
                <span
                    onClick={() => {
                        setShowModal('');
                        setUnathorizedError(false);
                        setAuthAlreadyError(false);
                    }} className={styles.close} />
                {children}
            </div>
        </div>
    )
};
