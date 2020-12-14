// core
import React, { useEffect } from 'react'

// library
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// components
import { routes } from "../constants/routes";
import { Layout } from "../components";

// assets
import styles from '../styles/Home.module.scss'
import classNames from "classnames";
import { authActions } from "../redux/auth/actions";
import { redirectActions } from "../redux/redirect/actions";
import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../redux/user/selectors";
import { useRouter } from "next/router";
import { get } from 'lodash';

import { SET_ACCESS_TOKEN_START } from '../redux/auth/sagas';
import { getRedirectLink } from "../redux/redirect/selectors";

const Home = () => {
    SwiperCore.use([Autoplay]);

    const router = useRouter();

    const dispatch = useDispatch();

    const user = useSelector(getUserState);
    const redirect = useSelector(getRedirectLink);

    const access_token = get(router, 'query.access_token', null);

    useEffect(() => {
        if (user) {
            dispatch(redirectActions.redirect(routes.marketplace));
        }
    }, []);

    useEffect(() => {
        router.push(redirect);
    }, [redirect]);

    useEffect(() => {
        if (access_token) {
            dispatch({type: SET_ACCESS_TOKEN_START, payload: access_token});
        }
    }, [router.query]);


    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    return (
        <Layout>
            <section className={styles.home}>
                <div className={classNames(styles.slider, 'home-slider')}>
                    <Swiper
                        autoplay={{delay: 2000}}
                        speed={1000}
                        spaceBetween={20}
                        loopedSlides={4}
                        slidesPerView={1}
                        loop={true}
                        clickable='true'
                        breakpoints={{
                            567: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className={styles.slideImage}>
                                <img src='/images/home/slider/jacket.png' alt='' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.slideImage}>
                                <img src='/images/home/slider/boots.png' alt='' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.slideImage}>
                                <img src='/images/home/slider/jacket.png' alt='' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.slideImage}>
                                <img src='/images/home/slider/boots.png' alt='' />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="container">
                    <div className={styles.homeInner}>
                        <h1>Open a <span>FREE</span> online store</h1>
                        <ul className={styles.list}>
                            <li>
                                Never pay a seller commission fee
                            </li>
                            <li>
                                Never pay a buyer commission fee
                            </li>
                            <li>
                                Sell unlimited items
                            </li>
                            <li>
                                Link your social media and build your customer base
                            </li>
                        </ul>
                        <div className={styles.bottom}>
                            <div className={styles.buttons}>
                                <button type='button'
                                        className='btn-black'
                                        onClick={() => setShowModal('register')}>
                                    Start selling for free
                                </button>
                                {/*
                                <button type='button'
                                        className='btn-second'
                                        onClick={() => setShowModal('plans')}>
                                    Become a premium member
                                </button>
                                */}
                            </div>
                            <div className={styles.info}>
                                <img src='/images/home/paypal.jpg' alt='' />
                                <img src='/icons/home/secure.svg' alt='' />
                                <p>
                                    Paypal protection for buyers <br />
                                    and sellers.
                                    <Link href={routes.home}>
                                        <a target="_blank"
                                           href="https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security"> Learn
                                            more</a>
                                    </Link>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    )
};

export default Home
