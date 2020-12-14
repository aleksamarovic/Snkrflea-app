// core
import React, { useEffect, useState, } from 'react'

// library
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useRouter } from "next/router";

// components
import { routes } from '../../constants/routes';
import { authActions } from "../../redux/auth/actions";
import { getStoreState } from "../../redux/cabinet/selectors";
import {    
    GET_MY_STORE_REQUEST,
} from "../../redux/cabinet/sagas";

// assets
import styles from './Header.module.scss'


export const Header = ({user = null}) => {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState('Log out');
    const [store, setStore] = useState(false);

    const dispatch = useDispatch();

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const getMyStore = useSelector(getStoreState);

    useEffect(() => {
        if (user !== null) {
            setIsLogin('Log out');
        } else {
            setIsLogin('Login');
        }
    }, [user]);

    useEffect(() => {    
        dispatch({type: GET_MY_STORE_REQUEST})
    }, []);

    useEffect(() => {            
        if (getMyStore) {
            setStore(getMyStore);
        }
    }, [getMyStore]);


    return (
        <header className={styles.header}>
            <div className={styles.navWrapper}>
                <div className={styles.navTop}>
                    <Link href={!user ? routes.home : routes.marketplace}>
                        <a className={styles.navLogo}>
                            <img src='/icons/logo.svg' alt='' />
                        </a>
                    </Link>

                </div>
                <div className={styles.navItems}>
                    {isLogin === 'Log out' ? <>
                            <Link href={routes.selling}>
                                <a className={classNames(styles.menuItem, {[styles.active]: (router.pathname === routes.selling || router.pathname === routes.purchases || router.pathname === routes.membership)})}>
                                    Account
                                </a>
                            </Link>
                        </>
                        : <>
                            <Link href={routes.home}>
                                <a onClick={(e) => {
                                    setShowModal('login');
                                    e.preventDefault()
                                }}
                                   className={styles.menuItem}
                                >
                                    {isLogin}
                                </a>
                            </Link>
                            <Link href={routes.home}>
                                <a
                                    onClick={(e) => {
                                        setShowModal('register');
                                        e.preventDefault()
                                    }}
                                    className={styles.menuItem}
                                >
                                    Join
                                </a>
                            </Link>
                        </>}
                    <Link href={routes.marketplace}>
                        <a className={classNames(styles.menuItem, {[styles.active]: router.pathname === routes.marketplace})}>
                            For Sale
                        </a>
                    </Link>
                    {/*<Link href={routes.premium}>*/}
                    {/*    <a className={classNames(styles.menuItem, {[styles.active]: router.pathname === routes.premium})}>*/}
                    {/*        Premium*/}
                    {/*    </a>*/}
                    {/*</Link>*/}
                  { user ? <Link href={routes.productList}>
                        <a
                            onClick={(e) => {
                                if (!user) {
                                    setShowModal('register');
                                    e.preventDefault()
                                }                     
                                else if(!store) {
                                    setShowModal('create-store');                                    
                                }                                
                            }}
                            className={classNames(styles.menuItem, {[styles.active]: router.pathname === routes.productList})}>
                            Sell
                        </a>
                    </Link> : null}  
                </div>
            </div>
        </header>
    )
};
