// core
import React from 'react'

// components
import { GuardLayout } from "../components";
import { ProductList } from "../components";

const ProductListCreate = () => {

    return (
        <GuardLayout>
            <ProductList />
        </GuardLayout>
    )
};

export default ProductListCreate
