// core
import React, { useEffect, useState } from 'react'

// library
import classNames from "classnames";
import { useDispatch } from "react-redux";

// components
import { authActions } from "../../../../redux/auth/actions";
import { useWindowSize } from "../../../customHooks/useLayoutEffect";

// assets
import styles from './ModalDescription.module.scss'

const premiumArray = ['Open your own store', 'Upload unlimited items for sale', 'Never pay a commission or seller fee', 'Link your paypal', 'Get a custom link for your store', 'Get access to hundreds of discount links', 'Discount links from sites like Kith, Walmart, target, Amazon, Fargetch, Bestbuy and more!', 'Up to 50 new discount links per day', 'Monthly giveaways. Up to 10 rare sneakers per month', 'Exclusive monthly hype drops. (i.e. box logos for $99.99)'];
const starterArray = ['Open your own store', 'Upload unlimited items for sale', 'Never pay a commission or seller fee', 'Link your paypal', 'Get a custom link for your store'];
let listArray = [];
export const ModalDescription = ({title, subTitle, premium, showButton, classname, minimized}) => {
    const dispatch = useDispatch();

    const [showDescription, setShowDescription] = useState(true);
    const [style, setStyle] = useState(null);
    const [width] = useWindowSize();

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    if (premium) {
        listArray = premiumArray;
    } else {
        listArray = starterArray;
    }

    useEffect(() => {
        if (classname === 'plans') {
            setStyle(styles.plans)
        }
    }, []);

    useEffect(() => {
        if (minimized) {
            setShowDescription('');
        }
        if (width > 900) {
            setShowDescription('description')
        }
    }, [width]);

    return (
        <div className={classNames(styles.listWrapper, {[styles.black]: premium}, style)}>
            <h3 onClick={() => {
                if (width < 900) {
                    setShowDescription(!showDescription)
                }
            }}
                className={classNames(styles.title, {[styles.show]: showDescription})}>
                {title} <span>{subTitle}</span>
            </h3>
            {showDescription && <ul className={styles.list}>
                {listArray.map(item => (
                    <li key={item}>{item}</li>
                ))}
                {showButton
                    ? premium
                        ? <li className={styles.button}>
                            <button type='button' className='btn-second' onClick={() => setShowModal('register-premium')}>
                                Get Premium
                            </button>
                        </li>
                        : <li className={styles.button}>
                            <button type='button' className='btn-primary' onClick={() => setShowModal('register')}>Start Free
                            </button>
                        </li>
                    : ''}
            </ul>}

        </div>
    )
};
