// core
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProduct } from "../../redux/user/selectors";

// components
import { GuardLayout, Loading } from "../../components";
import { ProductList } from "../../components";
import { useRouter } from "next/router";
import { GET_PRODUCT_ITEM_REQUEST } from "../../redux/products/sagas";

const ProductListUpdate = () => {
    const product = useSelector(getCurrentProduct);
    const dispatch = useDispatch();

    const router = useRouter();
    const {update_product_list_id} = router.query;

    useEffect(() => {
        if (update_product_list_id) dispatch({type: GET_PRODUCT_ITEM_REQUEST, payload: update_product_list_id});
    }, []);

    return (
        <GuardLayout>
            {update_product_list_id ? <ProductList product={product} updateComponent /> : <Loading />}
        </GuardLayout>
    )
};
export default ProductListUpdate;