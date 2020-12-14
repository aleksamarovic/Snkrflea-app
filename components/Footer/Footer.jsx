// core
import React, { useEffect, useState } from 'react'

// library
import Link from 'next/link'
import { useDispatch } from "react-redux";

// components
import { routes } from "../../constants/routes";
import { authActions } from "../../redux/auth/actions";

// assets
import styles from './Footer.module.scss'


export const Footer = ({user = null}) => {
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(false);
    const [isContact, setIsContact] = useState(false);

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    useEffect(() => {
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [user]);

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerTop}>
                    <img src='/icons/logo.svg' alt='' />
                    <div className={styles.footerTopInner}>
                        <ul className={styles.account}>
                            {isLogin ? <>
                                    <li>
                                        <Link href={routes.selling}><a>Account</a></Link>
                                    </li>
                                </>
                                : <>
                                    <li>
                                        <Link href={routes.home}>
                                            <a onClick={(e) => {
                                                setShowModal('plans');
                                                e.preventDefault()
                                            }}>Join</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={routes.home}>
                                            <a onClick={(e) => {
                                                setShowModal('login');
                                                e.preventDefault()
                                            }}>Login</a>
                                        </Link>
                                    </li>
                                </>}
                        </ul>
                        <ul className={styles.social}>
                            <li>
                                <a href="https://twitter.com/snkrflea" target="_blank" rel="noreferrer">
                                    <i className="fab fa-twitter" />
                                </a>
                            </li>
                            <li className={styles.social}>
                                <a href="https://www.facebook.com/snkrflea/" target="_blank" rel="noreferrer">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </li>
                            <li className={styles.social}>
                                <a href="https://www.instagram.com/snkrflea/"
                                   className="FooterSocials__icon"
                                   target="_blank" rel="noreferrer">
                                    <i className="fab fa-google" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className={styles.footerBottom}>
                    <li><Link href={routes.privacy}><a>Privacy</a></Link></li>
                    <li><Link href={routes.terms}><a>Terms</a></Link></li>
                    <li><Link href={routes.faqs}><a>FAQs</a></Link></li>
                    <li><Link href={routes.contact}>
                        <a onClick={(e) => {
                            setShowModal('contact');
                            e.preventDefault()
                        }}>Contact</a>
                    </Link></li>
                </ul>
            </footer>

        </>
    )
};
