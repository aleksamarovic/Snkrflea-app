// core
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// library
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import classNames from "classnames";

// components
import { Layout, Loading, Report } from "../../components";
import { getCurrentProduct } from "../../redux/user/selectors";
import { GET_PRODUCT_ITEM_INFO_REQUEST } from "../../redux/products/sagas";
import { routes } from "../../constants/routes";
import { authActions } from "../../redux/auth/actions";
import { ProductSlider } from "../../components/ProductSlider/ProductSlider";
import { getShowModal } from "../../redux/auth/selectors";

// assets
import styles from "../../styles/Product.module.scss";

const Product = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { product_id } = router.query;

  const [product, setProduct] = useState();

  const selectedProduct = useSelector(getCurrentProduct);
  const showModal = useSelector(getShowModal);

  const setShowModal = (state) => dispatch(authActions.setShowModal(state));

  useEffect(() => {
    if (product_id !== undefined) {
      dispatch({ type: GET_PRODUCT_ITEM_INFO_REQUEST, payload: product_id });
    }
  }, [product_id]);

  useEffect(() => {
    setProduct(selectedProduct);
  }, [selectedProduct]);

  const getLinkButton = () => {
    if (product.vendor?.merchentId && product?.onSale) {
      return (
        <Link href={`${routes.checkout}/${product_id}`}>
          <a className="btn-second">Buy Now</a>
        </Link>
      );
    } else if (!product?.onSale && product.vendor?.merchentId) {
      return (
        <Link href={`/`}>
          <a className={classNames("btn-second", styles.sold)}>Sold</a>
        </Link>
      );
    } else {
      return (
        <a
          className={classNames("btn-second")}
          href={`mailto:${product?.vendor?.store?.contactEmail}`}
        >
          Contact Seller
        </a>
      );
    }
  };

  return (
    <Layout>
      {showModal === "report" && (
        <Report productId={product.id} classname="report" />
      )}
      <section className={styles.product}>
        {product ? (
          <div className="container">
            <div className={styles.productInner}>
              <div className={classNames(styles.productLeft, "product-slider")}>
                <ProductSlider product={product} styles={styles} />
              </div>
              <div className={styles.productRight}>
                <h1>{product.title}</h1>
                <div className={styles.subDescription}>
                  <h5>${product.price}</h5>
                  <h5>Size: {product.size}</h5>
                  <h5>Condition: {product.condition}</h5>
                </div>
                <p>{product.description}</p>
                <div className={styles.buttons}>{getLinkButton()}</div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.seller}>
                  <h6>Seller</h6>
                  <div className={styles.sellerInner}>
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `url(${
                          product?.vendor?.store?.avatar?.url
                            ? product?.vendor?.store?.avatar?.url
                            : "/images/user.png"
                        })`,
                      }}
                    />
                    <div className={styles.contactInfo}>
                      <h6>{product?.vendor?.store?.name}</h6>
                      <div className={styles.info}>
                        {product?.vendor?.store?.contactEmail && (
                          <a
                            href={`mailto:${product?.vendor?.store?.contactEmail}`}
                          >
                            Contact seller
                          </a>
                        )}
                        <div className={styles.links}>
                          {product?.vendor?.store?.contactEmail && (
                            <a
                              href={`mailto:${product?.vendor?.store?.contactEmail}`}
                            >
                              Email
                            </a>
                          )}
                          {product?.vendor?.store?.instagram && (
                            <a
                              href={`https://instagram.com/${product?.vendor?.store?.instagram}`}
                            >
                              Instagram
                            </a>
                          )}
                          {product?.vendor?.store?.tiktok && (
                            <a
                              href={`https://tiktok.com/@${product?.vendor?.store?.tiktok}`}
                            >
                              Tik Tok
                            </a>
                          )}
                          {product?.vendor?.store?.twitter && (
                            <a
                              href={`https://twitter.com/${product?.vendor?.store?.twitter}`}
                            >
                              Twitter
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.payPalWrapper}>
                  <div className={styles.payPal}>
                    <img src="/images/paypal.png" alt="" />
                    <div className={styles.info}>
                      <h6>100% Purchase protected with Paypal</h6>
                      <p>
                        Orders that never arrive, inauthentic items, and items
                        not described will be refunded - your satisfaction
                        guaranteed
                      </p>
                      <Link href="https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security">
                        <a target="_blank">Learn more</a>
                      </Link>
                    </div>
                  </div>
                  <Link href="">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal("report");
                      }}
                    >
                      Report this post
                    </a>
                  </Link>
                </div>
              </div>

              <div className={styles.add}>
                <h1>AD</h1>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </Layout>
  );
};

export default Product;
