// core
import React, { useEffect, useState } from 'react'

// library
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// components
import { routes } from "../../../constants/routes";
import { USER_LOG_OUT_REQUEST } from "../../../redux/user/sagas";
import { authActions } from "../../../redux/auth/actions";
import { generalActions } from "../../../redux/general/actions";

// assets
import styles from './AccountTabs.module.scss'
import { getCurrentUser } from "../../../redux/auth/selectors";

const menu = ['Selling', 'Purchases', 'Membership', 'Store', 'Log Out'];
export const AccountTabs = ({activeMenu}) => {
    const dispatch = useDispatch();

    const [isStore, setIsStore] = useState(null);

    const currentUser = useSelector(getCurrentUser);

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const showLoading = (state) => dispatch(generalActions.showLoading(state));

    useEffect(() => {
        if (currentUser) {
            setIsStore(currentUser.store)
        }
    }, [currentUser]);

    return (
        <div className={styles.menu}>
            <ul className={styles.list}>
                {menu.map((item) => (
                    <li key={item} className={styles.item}>
                        <Link href={`/account/${item.toLowerCase()}`}>
                            <a className={activeMenu === item ? styles.active : ''}
                               onClick={(e) => {
                                   if (item === 'Log Out') {
                                       e.preventDefault();
                                       showLoading(true);
                                       setTimeout(() => {
                                           dispatch({type: USER_LOG_OUT_REQUEST});
                                           window.location = routes.home
                                       }, 1000)
                                   } else if (item === 'Store') {
                                       if (!isStore) {
                                           e.preventDefault();
                                           setShowModal('create-store');
                                       }
                                   }
                               }}>
                                {item}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};
