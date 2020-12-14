// core
import React from 'react'

// library
import { useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// components
import { generalActions } from "../../redux/general/actions";
import { authActions } from "../../redux/auth/actions";


export const CheckoutForm = ({response}) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const showLoading = (state) => dispatch(generalActions.showLoading(state));
    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            response(paymentMethod.id);
            console.log('[PaymentMethod]', paymentMethod);
            setShowModal('premium-payment-success');
        }
        showLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe} className='btn-primary' onClick={() => showLoading(true)}>
                Pay
            </button>
        </form>
    );
};



