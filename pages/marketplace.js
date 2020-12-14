// core
import React, { useEffect, useState } from 'react'

// Library
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import classNames from "classnames";

// components
import { Filter, Layout, ProductItem, Loading } from "../components";
import { GET_MARKET_PLACE_REQUEST } from "../redux/products/sagas";
import { authActions } from "../redux/auth/actions";
import { getShowFilters } from "../redux/general/selectors";
import { getProductsRequest } from "../api/actions";
import { getCurrentUser } from "../redux/auth/selectors";

// assets
import styles from '../styles/Marketplace.module.scss'


const Marketplace = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(null);
    const [pageCount, setPageCount] = useState(null);

    const showFilter = useSelector(getShowFilters);
    const currentUser = useSelector(getCurrentUser);

    const getProducts = (query) => {
        getProductsRequest(query).then((products) => {
            setProducts(products);
        })
    };

    const setShowModal = (state) => dispatch(authActions.setShowModal(state));

    useEffect(() => {
        dispatch({type: GET_MARKET_PLACE_REQUEST, payload: null})
    }, []);

    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10;
    const offsetPage = currentPage * perPage;

    useEffect(() => {
        if (products) setPageCount(Math.ceil(products.length / perPage));
    }, [products]);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.store) {
                setShowModal('');
            }
        }
    }, []);

    const handlePageClick = ({selected: selectedPage}) => setCurrentPage(selectedPage);

    console.log(currentUser, 'currentUser');
    return (
        <Layout>
            <section className={styles.marketplace}>
                <div className="container">
                    <div className={styles.marketplaceInner}>
                        <div className={classNames(styles.filters, showFilter && styles.show)}>
                            <Filter getProducts={getProducts} showFilter={showFilter}/>
                        </div>
                        <div className={styles.products}>
                            <div className={styles.announcement}>
                                <h6>Have items you want to sell? <span onClick={() => setShowModal('register')}>Click here</span> and
                                    open a <span>FREE SNKRFLEA</span> online store</h6>
                            </div>

                            <div className={styles.productsItems}>
                            {window.innerWidth > 768 &&
                                <ProductItem key={-1} product={{image:"", title:"Title", brand:"Brand",size:"Size", price:"Price"}} isHeader={true} />
                              }
                                {console.log(products, 'products')}
                                {!products ? <Loading relative />
                                    : products.length !== 0 ?
                                        <>
                                            {products.map((product, index) => (
                                                <ProductItem key={index} product={product} />
                                            )).slice(offsetPage, offsetPage + perPage)}
                                            <ReactPaginate
                                                previousLabel={"←"}
                                                nextLabel={"→"}
                                                pageCount={pageCount}
                                                onPageChange={handlePageClick}
                                                containerClassName={styles.pagination}
                                                previousLinkClassName={styles.previous}
                                                nextLinkClassName={styles.next}
                                                disabledClassName={styles.disabled}
                                                activeClassName={styles.active}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={2} />
                                        </> : <h6>Products not found</h6>}
                            </div>
                            <div className={styles.addMobile}>
                                <h1>AD</h1>
                            </div>
                        </div>
                        <div className={styles.addDesktop}>
                            <h1>AD</h1>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
};

export default Marketplace
