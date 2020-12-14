// core
import React, { useEffect, useState } from 'react'

// library
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

// components
import { AccountTabs, GuardLayout, Loading, PremiumLinks } from "../../components";
import { getHistoryBilling } from "../../redux/cabinet/selectors";
import { GET_HISTORY_BILLING_REQUEST } from "../../redux/cabinet/sagas";

// assets
import styles from '../../styles/Account.module.scss'

const Membership = () => {
    const dispatch = useDispatch();

    const [billing, setBilling] = useState([]);
    const getBilling = useSelector(getHistoryBilling);

    useEffect(() => {
        dispatch({type: GET_HISTORY_BILLING_REQUEST})
    }, []);


    useEffect(() => {
        setBilling(getBilling)
    }, [getBilling]);

    return (
        <GuardLayout>
            <section className={styles.account}>
                <div className="container">
                    <div className={styles.content}>
                        <h1>My Account</h1>
                        <AccountTabs activeMenu='Membership' />
                        {billing ? <>
                                <div className={styles.membershipTitle}>
                                    {billing.length === 0 ? <h3>You are on the <span>Starter Membership</span></h3>
                                        : <h3>You are on the <span>Premium Membership</span></h3>
                                    }
                                </div>
                                {billing.length === 0 ?
                                    <div className={styles.membershipStarter}>
                                    {/*
                                    <PremiumLinks mobile />
                                    */}
                                    </div>
                                    : <div className={styles.membershipPremium}>
                                        <p>
                                            Your membership will renew on December 11, 2020. <Link href=''>
                                            <a>Change this</a>
                                        </Link>
                                        </p>
                                        <div className={styles.membershipHistory}>
                                            <h5>Billing History</h5>
                                            <ul className={styles.list}>
                                                {billing.map((item, index) => (
                                                    <li key={index}>
                                                        <span>{item.created}</span>
                                                        <span className={styles.price}>{item.amount}</span>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                    </div>}
                            </>
                            : <Loading />}
                    </div>
                </div>
            </section>
        </GuardLayout>
    )
};

export default Membership
