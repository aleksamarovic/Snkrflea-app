// core
import React from 'react'

// Library
import Link from 'next/link'
import classNames from "classnames";

// components
import { Layout, PremiumLinks, ProductItem } from "../components";
import { routes } from "../constants/routes";

// assets
import styles from '../styles/Primium.module.scss'

const products = [
    {
        title: 'Yeezy 350 V2 ‘Carbon’',
        name: 'stansstore',
        price: '$240.29',
        discount: '$99.99',
        image: '/images/boots.png'
    },
    {title: 'Off-White X Air Rubber', name: 'stansstore', price: '240.29', image: '/images/boots.png'},
    {title: 'Izabella Tabakova', name: 'supremekciks', price: '240.29', image: '/images/boots.png'},
    {title: 'Opi Watihana', name: 'sneakerisland', price: '240.29', image: '/images/boots.png'},
    {title: 'Opi Watihana', name: 'sneakerisland', price: '240.29', image: '/images/boots.png'},
    {title: 'Opi Watihana', name: 'sneakerisland', price: '240.29', image: '/images/boots.png'},
];

const Premium = () => {
    return (
        <Layout>
            <section className={styles.marketplace}>
                <div className="container">
                    <div className={styles.marketplaceInner}>
                        <p>
                            You are previewing releases from over 30 days ago. <Link href={routes.premium}><a
                            className={styles.getPremium}>Get premium</a></Link> to see the latest releases
                        </p>
                        <div className={styles.products}>
                            <div className={styles.productsItems}>
                                {products.map((product, index) => (
                                    <ProductItem key={index} product={product} />
                                ))}
                            </div>
                            <PremiumLinks />
                            <div className={styles.productsItems}>
                                <div className={classNames(styles.products, styles.premium)}>
                                    <Link href={routes.marketplace}><a
                                        className={classNames('btn-second', styles.premiumMobile)}>Get
                                        Premium</a></Link>
                                    {products.map((product, index) => (
                                        <ProductItem key={index} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
};

export default Premium
