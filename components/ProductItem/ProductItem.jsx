// core
import React, { useEffect, useState } from 'react'

// library
import styles from "./ProductItem.module.scss";
import Link from "next/link";
import { routes } from "../../constants/routes";


export const ProductItem = ({product, isHeader}) => {

    const [imageIsReady, setImageIsReady] = useState();

    useEffect(() => {
        const img = new Image();
        img.src = product.image; // by setting an src, you trigger browser download

        img.onload = () => {
            // when it finishes loading, update the component state
            setImageIsReady(true);
        }
    }, []);

    const renderProductContents = () => {
      return (
        <>
            <div className={styles.image}>
            {isHeader ?
              <div></div>
              :
              <>
              {imageIsReady ? <img src={product.image} alt='' /> :
                  <img src='/images/placeholder-image.png' alt='' />}
                  </>
            }

            </div>
            <div className={styles.description}>
                <h6>{product.title}</h6>
                <p>{product.brand}</p>
                <p>{product.size}</p>

                {product.discount ? <div className={styles.discount}>
                        <p><span>{product.price}</span></p>
                        <p className={styles.price}><span>{product.discount}</span></p>
                    </div>
                    : <p className={styles.price}><span>{isHeader ? "" : "$"}{product.price}</span></p>
                }
            </div>
        </>
      )
    }

    return (
        <>
          {isHeader
            ?
            <span className={styles.productItem}>

            {renderProductContents()}

            </span>
          :
          <Link href={`${routes.product}/${product.id || ''}`}>
          <a className={styles.productItem}>

              {renderProductContents()}
              </a>
          </Link>
        }
        </>

    )
};
