// core
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PayPalButton } from "react-paypal-button-v2";

// library
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import classNames from "classnames";
import { useFormik } from "formik";
import { get } from "lodash";

// components
import { Layout } from "../../../components";
import { getCurrentProduct, getUserState } from "../../../redux/user/selectors";
import { GET_PRODUCT_ITEM_REQUEST } from "../../../redux/products/sagas";
import { checkoutSchema } from "../../../schemas";
import { routes } from "../../../constants/routes";
import { createPayPalTransactionRequest, createPayPalOrderRequest } from '../../../api/actions';
import { generalActions } from '../../../redux/general/actions'
import { ProductSlider } from "../../../components/ProductSlider/ProductSlider";

// assets
import styles from '../../../styles/Product.module.scss'

const Product = () => {
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const product = useSelector(getCurrentProduct);
    const user = useSelector(getUserState);
    const showLoading = (state) => dispatch(generalActions.showLoading(state));

    const router = useRouter();
    const {product_id} = router.query;

    SwiperCore.use([Pagination, Navigation]);

    useEffect(() => {
        if (product_id !== undefined) {
            dispatch({type: GET_PRODUCT_ITEM_REQUEST, payload: product_id})
        }
    }, [product_id]);

    useEffect(() => {
        showLoading(false)
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: get(user, 'email', ''),
            address: '',
            state: '',
            city: '',
            zip: '',
            checkbox: '',
        },
        validationSchema: checkoutSchema,
        onSubmit: values => {
            setTimeout(() => {
                alert(values);
                showLoading(false)
            }, 2000);
        },
    });

    return (
        <Layout>
            <section className={classNames(styles.product, styles.checkout)}>
                {product ? <div className="container">
                    <div className={styles.productInner}>
                        <div className={classNames(styles.productLeft, 'product-slider', 'checkout-slider')}>
                            <ProductSlider product={product} styles={styles} />
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <br />
                            <div className={styles.seller}>
                                <h6>Seller</h6>
                                <div className={styles.sellerInner}>
                                    <div className={styles.image}
                                         style={{backgroundImage: `url(${product?.vendor?.store?.avatar?.url ? product?.vendor?.store?.avatar?.url : '/images/user.png'})`}} />
                                    <div className={styles.contactInfo}>
                                        <h6>{product?.vendor?.store?.name}</h6>
                                        <div className={styles.info}>
                                            {product?.vendor?.store?.contactEmail &&
                                            <a href={`mailto:${product?.vendor?.store?.contactEmail}`}>
                                                Contact seller
                                            </a>}
                                            <div className={styles.links}>
                                                {product?.vendor?.store?.contactEmail &&
                                                <a href={`mailto:${product?.vendor?.store?.contactEmail}`}>
                                                    Email
                                                </a>}
                                                {product?.vendor?.store?.instagram &&
                                                <a href={`https://instagram.com/${product?.vendor?.store?.instagram}`}>
                                                    Instagram
                                                </a>}
                                                {product?.vendor?.store?.tiktok &&
                                                <a href={`https://tiktok.com/@${product?.vendor?.store?.tiktok}`}>
                                                    Tik Tok
                                                </a>}
                                                {product?.vendor?.store?.twitter &&
                                                <a href={`https://twitter.com/${product?.vendor?.store?.twitter}`}>
                                                    Twitter
                                                </a>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.productRight}>
                            <div className={styles.checkout}>
                                {!success ? <>
                                        <h3>Checkout</h3>
                                        <form>
                                            <label>
                                                <span>Name</span>
                                                <input name="name" type="text"
                                                       placeholder='Enter Name'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.name} />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className='error'>{formik.errors.name}</div>) : null}
                                            </label>
                                            <label>
                                                <span>Email</span>
                                                <input name="email" type="email"
                                                       placeholder='Enter Email'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.email} />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className='error'>{formik.errors.email}</div>) : null}
                                            </label>
                                            <label>
                                                <span>Address</span>
                                                <input name="address" type="text"
                                                       placeholder='Enter Address'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.address} />
                                                {formik.touched.address && formik.errors.address ? (
                                                    <div className='error'>{formik.errors.address}</div>) : null}
                                            </label>
                                            <label>
                                                <span>State</span>
                                                <input name="state" type="text"
                                                       placeholder='Enter State'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.state} />
                                                {formik.touched.state && formik.errors.state ? (
                                                    <div className='error'>{formik.errors.state}</div>) : null}
                                            </label>
                                            <label>
                                                <span>City</span>
                                                <input name="city" type="text"
                                                       placeholder='Enter City'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.city} />
                                                {formik.touched.city && formik.errors.city ? (
                                                    <div className='error'>{formik.errors.city}</div>) : null}
                                            </label>
                                            <label>
                                                <span>ZIP Code</span>
                                                <input name="zip" type="number"
                                                       placeholder='Enter ZIP Code'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.zip} />
                                                {formik.touched.zip && formik.errors.zip ? (
                                                    <div className='error'>{formik.errors.zip}</div>) : null}
                                            </label>
                                            {console.log(product.vendor.merchentId, 'product.vendor.merchentId')}
                                            {product?.onSale ?
                                                <PayPalButton
                                                    options={{
                                                        clientId: 'sb',
                                                        merchantId: String(product.vendor.merchentId)
                                                    }}
                                                    onApprove={(data) => (
                                                        createPayPalTransactionRequest({
                                                            orderID: data.orderID,
                                                            productId: product.id,
                                                            name: formik.values.name,
                                                            email: formik.values.email,
                                                            address: formik.values.address,
                                                            state: formik.values.state,
                                                            city: formik.values.city,
                                                            zipcode: formik.values.zip
                                                        }).then((res) => res.json())
                                                            .then((details) => {
                                                                if (details.status === 'COMPLETED') {
                                                                    setSuccess(true)
                                                                }
                                                            })
                                                    )}
                                                    createOrder={() => (
                                                        createPayPalOrderRequest(product.id)
                                                            .then((res) => res.json())
                                                            .then((data) => {
                                                                return data.orderID
                                                            })
                                                    )}
                                                /> : null}
                                                {/*
                                            <label className="checkbox">
                                                <input name="privacy" type="checkbox"
                                                       onChange={formik.handleChange}
                                                       value={formik.values.checkbox} />
                                                {formik.touched.checkbox && formik.errors.checkbox ? (
                                                    <div className='error'>{formik.errors.checkbox}</div>) : null}
                                                <span className="checkmark" />
                                                <p>
                                                    Save my information for faster checkout and to view your
                                                    purchases. <Link href={routes.privacy}><a>Learn more</a></Link>
                                                </p>
                                            </label>
                                            */}
                                        </form>
                                    </> :
                                    <div className={styles.success}>
                                        <h3>Congrats on your order!</h3>
                                        <p>
                                            The seller has received your purchase order and will be contact shortly
                                        </p>
                                        <Link href={'/'}><a className={classNames('btn-second', styles.shopping)}>Continue
                                            shopping</a></Link>
                                        <p className={styles.save}>
                                            Save my information for faster checkout and to view your purchases. <Link
                                            href={'/'}><a>Create an account</a></Link>
                                        </p>
                                        {/*
                                        <h3>Get more deals</h3>
                                        <p>
                                            Get access to hundreds of discount links, monthly giveaways, and exclusive
                                            monthly hype drops.
                                        </p>
                                        <Link href={'/'}><a className={classNames('btn-primary', styles.shopping)}>
                                            Become a premium member
                                        </a></Link>
                                        */}
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div> : null}
            </section>
        </Layout>
    )
};

export default Product
