// core
import React from 'react'

// library
import Link from 'next/link'
import PropTypes from 'prop-types'

// components
import {Layout} from "../components";
import { routes } from "../constants/routes";

// assets
import styles from '../styles/404.module.scss'


const Custom404 = () => {
    return (
        <Layout>
            <section className={styles.errorPage}>
                <div className="container">
                    <div className={styles.content}>
                        <h1>Whoops you've landed on a page that doesn't exist</h1>
                        <Link href={routes.home}><a>Go back home</a></Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Custom404
