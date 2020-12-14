// core
import React, { useEffect, useState } from 'react'

// library
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

// components
import { AccountTabs, GuardLayout, Loading } from "../../components";
import { routes } from "../../constants/routes";
import { getSellingList } from "../../redux/products/selectors";
import { GET_SELLING_LIST_REQUEST } from "../../redux/products/sagas";

import ImageLoader from 'react-loading-image'
// assets
import styles from '../../styles/Account.module.scss'
import { productsActions } from "../../redux/products/actions";

const Selling = () => {
    const dispatch = useDispatch();
    const list = useSelector(getSellingList);

    const [listItems, setListItems] = useState(null);

    useEffect(() => {
        setListItems(list)
    }, [list]);

    useEffect(() => {
        dispatch({type: GET_SELLING_LIST_REQUEST})
    }, []);


    useEffect(() => {
        dispatch(productsActions.setUpdateProduct(false));
    }, []);

    return (
        <GuardLayout>
            <section className={styles.account}>
                <div className="container">
                    <div className={styles.content}>
                        <h1>My Account</h1>
                        <AccountTabs activeMenu='Selling' />
                        {listItems ? listItems.length === 0 ? <div className={styles.empty}>
                                <h3>
                                    You aren’t selling anything yet. You can list an item for sale <Link
                                    href={routes.productList}><a>here</a></Link>
                                </h3>
                            </div>
                            : <div className={styles.sellingList}>
                                {listItems.map((product, index) => (
                                    <div key={index} className={styles.listItem}>
                                        <div className={styles.image}>
                                            <ImageLoader src={product.image}
                                                         loading={() => <Loading absolute />}
                                                         error={() =>
                                                             <div><img src="/images/placeholder-image.png"  alt=''/></div>} />
                                        </div>
                                        <div className={styles.description}>
                                            <h6>{product.title}</h6>
                                            <div className={styles.itemInfo}>
                                                <Link href={`${routes.productListUpdate}/${product.id}`}>
                                                    <a>Edit</a></Link>
                                                <p>${product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Link href={routes.productList}>
                                    <a className='btn-second'>List an item for sale</a>
                                </Link>
                            </div> : <Loading />}
                    </div>
                </div>
            </section>
        </GuardLayout>
    )
};

export default Selling
