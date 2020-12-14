import React, { useEffect } from 'react'

// library
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesState } from "../../redux/cabinet/selectors";
import { routes } from "../../constants/routes";

// components
import { AccountTabs, GuardLayout, Loading, ProductItem } from "../../components";
import { GET_PURCHASES_REQUEST } from "../../redux/cabinet/sagas";

// assets
import styles from '../../styles/Account.module.scss'

const Purchases = () => {
    const dispatch = useDispatch();
    const purchases = useSelector(getPurchasesState);

    useEffect(() => {
        dispatch({type: GET_PURCHASES_REQUEST, payload: null})
    }, []);

    return (
        <GuardLayout>
            <section className={styles.account}>
                <div className="container">
                    <div className={styles.content}>
                        <h1>My Account</h1>
                        <AccountTabs activeMenu='Purchases' />
                        {purchases ? purchases.length === 0 ? <div className={styles.empty}>
                                <h3>
                                    You haven’t purchased anything yet. You can purchase the next great find on the <br/>
                                    <Link href={routes.marketplace}><a>marketplace</a></Link>
                                </h3>
                            </div>
                            : <div className={styles.purchasesProducts}>
                                {purchases.map(({product}, index) => (<ProductItem key={index} product={product} />))}
                            </div> : <Loading />}
                    </div>
                </div>
            </section>
        </GuardLayout>
    )
};

export default Purchases
