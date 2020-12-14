// core
import React, { useEffect } from 'react'

// library
import Head from 'next/head'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";

// components
import {
    Footer,
    Header,
    Login,
    PremiumPayment,
    Register,
    Plans,
    RegisterPremium,
    Contact,
    CreateStore,
    Loading
} from "../../components";
import { getShowModal } from "../../redux/auth/selectors";
import { getIsLoading } from "../../redux/general/selectors";
import { getUserState } from "../../redux/user/selectors";
import { generalActions } from "../../redux/general/actions";
import { SET_CURRENT_USER } from "../../redux/auth/sagas";


export const Layout = ({children}) => {
    const dispatch = useDispatch();

    const showModal = useSelector(getShowModal);
    const user = useSelector(getUserState);
    const isLoading = useSelector(getIsLoading);

    const showLoading = (state) => dispatch(generalActions.showLoading(state));

    useEffect(() => {
        showLoading(false)
    }, []);

    useEffect(() => {
        if (user) {
            dispatch({type: SET_CURRENT_USER, payload: user.access_token})
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>SNKRFLEA</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header user={user} />
            {isLoading && <Loading />}
            {(showModal === 'register') && <Register classname='register' />}
            {(showModal === 'register-premium') && <RegisterPremium classname='premium' />}
            {(showModal === 'login') && <Login classname='login' />}
            {(showModal === 'premium-payment' || showModal === 'premium-payment-success') &&
            <PremiumPayment classname='payment' />}
            {(showModal === 'plans') && <Plans classname='plans' />}
            {(showModal === 'contact') && <Contact classname='contact' />}
            {(showModal === 'create-store') && <CreateStore />}
            <main>
                {children}
            </main>
            <Footer user={user} />
        </>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
