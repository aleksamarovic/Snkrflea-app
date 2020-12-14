// core
import React, { useEffect } from 'react'

// Library
import Link from 'next/link'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
    getSelectedStoreState
} from "../../redux/store/selectors";

// components
import { Layout, ProductItem } from "../../components";
import { routes } from "../../constants/routes";

import {
    GET_STORE_BY_ID_REQUEST
} from "../../redux/store/sagas";


// assets
import styles from '../../styles/MarketplaceStore.module.scss'


const MarketplaceStore = () => {
    const dispatch = useDispatch();
    const store = useSelector(getSelectedStoreState);

    const router = useRouter();
    const {marketplace_store_id} = router.query;

    useEffect(() => {
       dispatch({ type: GET_STORE_BY_ID_REQUEST, payload: marketplace_store_id});
    }, []);

    

    return (
        <Layout>
            <section className={styles.marketplace}>
                <div className="container">
                    { store ? <div className={styles.marketplaceInner}>
                        <div className={styles.marketplaceLeft}>
                           <div className={styles.userWrapper}>
                               <div className={styles.user}>
                                   <img src={store.store.img} alt='' />
                                   <div className={styles.description}>
                                       <div className={styles.info}>
                                           <h3>{store.store.name}</h3>
                                           <img src='/icons/instagram.svg' alt='' />
                                           <Link href={routes.marketplace}>
                                             <a>https://instagram.com/{store?.store.insragram}</a>
                                           </Link>
                                       </div>
                                       <div className={styles.instagram}>
                                           <img src='/icons/instagram.svg' alt='' />
                                           <Link href={routes.marketplace}>
                                               <a>Contact seller</a>
                                           </Link>
                                       </div>
                                   </div>
                               </div>
                               {/*<div className={styles.tabs}>*/}
                               {/*    <span className={styles.active}>Selling</span>*/}
                               {/*    <span>Sold</span>*/}
                               {/*</div>*/}
                               <div className={styles.products}>
                                   <div className={styles.productsItems}>
                                       {store?.products.map((product, index) => (
                                           <ProductItem key={index} product={{...product, instagram: store?.store.insragram }} />
                                       ))}
                                   </div>
                                   <div className={styles.addMobile}>
                                       <h1>AD</h1>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className={styles.addDesktop}>
                            <h1>AD</h1>
                        </div>
                    </div> : null }
                </div>
            </section>
        </Layout>
    )
};

export default MarketplaceStore
