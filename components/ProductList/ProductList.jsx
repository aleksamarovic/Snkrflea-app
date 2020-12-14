// core
import React, { useEffect, useState } from 'react'

// library
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import classNames from "classnames";
import Link from "next/link";
import { get } from 'lodash';
import { useRouter } from "next/router";

// components
import { getUpdateProduct, getUserProductError } from "../../redux/products/selectors";
import { generalActions } from "../../redux/general/actions";
import { productsActions } from "../../redux/products/actions";
import { authActions } from "../../redux/auth/actions";
import { productSchema } from '../../schemas/index'
import { ADD_NEW_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST } from "../../redux/products/sagas";
import { userActions } from "../../redux/user/actions";
import { getSuccessStore } from "../../redux/store/selectors";
import { storeActions } from "../../redux/store/actions";
import {
    getBrandsRequest,
    getCategoriesRequest,
    getSubcategoriesRequest,
    getSizeRequest,
    deleteProductImg,
    addProductImgs
} from '../../api/actions';
import { routes } from "../../constants/routes";
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { SelectItem } from "./components/SelectItem";
import { InputItem } from "./components/InputItem";
import { getRedirectLink } from "../../redux/redirect/selectors";

// assets
import styles from '../../styles/ProductList.module.scss'

export const ProductList = ({product, updateComponent}) => {
    const dispatch = useDispatch();

    const router = useRouter();

    const [images, setImages] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [sizes, setSizes] = useState([]);

    const getProductError = useSelector(getUserProductError);
    const success = useSelector(getSuccessStore);
    const redirect = useSelector(getRedirectLink);
    const updateProduct = useSelector(getUpdateProduct);

    const showLoading = (state) => dispatch(generalActions.showLoading(state));
    const selectedProduct = (state) => dispatch(userActions.setCurrentProduct(state));
    const setShowModal = (state) => dispatch(authActions.setShowModal(state));
    const setProductError = (state) => dispatch(productsActions.setUserProductError(state));
    const setSuccess = (state) => dispatch(storeActions.setSuccessStore(state));

    useEffect(() => {
        getBrandsRequest().then((data) => {
            setBrands(data)
        })
    }, []);

    async function fetchFilters() {
        const {brand, category} = product;
        if (brand) {
            const cats = await getCategoriesRequest({brands: [brand]});
            setCategories(cats);
        }

        if (category && brand) {
            const subCat = await getSubcategoriesRequest({
                categories: [category],
                brands: [brand]
            });
            setSubCategories(subCat);
            const sizes = await getSizeRequest({categories: [category]});
            setSizes(sizes)
        }

        setImages(product.images)
    }

    useEffect(() => {
        if (product) {
            fetchFilters();
        }
    }, [product]);

    const formik = useFormik({
        initialValues: {
            id: get(product, 'id', ''),
            title: get(product, 'title', ''),
            description: get(product, 'description', ''),
            price: get(product, 'price', ''),
            brandId: get(product, 'brand', ''),
            categoryId: get(product, 'category', ''),
            subCategoryId: get(product, 'subcategory', ''),
            sizeId: get(product, 'size', ''),
            condition: get(product, 'condition', 'new'),
            availability: get(product, 'availability', 'sale'),
        },
        enableReinitialize: true,
        validationSchema: productSchema,
        onSubmit: values => {
            showLoading(true);
            if (product) {
                dispatch({type: UPDATE_PRODUCT_REQUEST, payload: {...values}})
            } else {
                dispatch({type: ADD_NEW_PRODUCT_REQUEST, payload: {...values, images: images.map((v) => v.file)}})
            }
        },
    });

    const brandChange = (data) => {
        formik.handleChange(data);
        formik.setFieldValue('categoryId', '');
        formik.setFieldValue('subCategoryId', '');
        formik.setFieldValue('sizeId', '');
        getCategoriesRequest({brands: [data.target.value]}).then((data) => {
            setCategories(data)
        })
    };

    const categoryChange = (data) => {
        formik.handleChange(data);
        const {brandId} = formik.values;
        const category = data.target.value;
        formik.setFieldValue('subCategoryId', '');
        formik.setFieldValue('sizeId', '');
        getSubcategoriesRequest({
            categories: [category],
            brands: [brandId]
        }).then((data) => {
            setSubCategories(data);
        });
        getSizeRequest({categories: [category]}).then((data) => {
            setSizes(data)
        })
    };

    const deleteImg = (index) => {
        deleteProductImg(images[index].id).then(v => v.json()).then((result) => {
            setImages(result)
        })
    };

    const imgUpdate = (imageList, addUpdateIndex) => {
        if (product) {
            const files = addUpdateIndex.map((i) => imageList[i].file);
            addProductImgs(files, product.id).then(v => v.json()).then((result) => {
                setImages(result)
            })
        } else {
            setImages(imageList)
        }
    };

    const {touched, errors} = formik;

    useEffect(() => {
        setSuccess(false);
    }, []);

    useEffect(() => {
        if ((updateProduct && updateComponent)) {
            router.push(redirect);
        }
    }, [updateProduct]);

    return (
        <section className={styles.product}>
            <div className="container">
                {(!success || product) ? <div className={styles.productInner}>
                        <h1>{product ? 'Update your product' : 'List your product'}</h1>
                        <div>
                            <form onSubmit={formik.handleSubmit} onClick={() => setProductError(false)}>
                                <InputItem title={"Title"}
                                           name={"title"}
                                           placeholder={"Enter a title"}
                                           value={get(formik.values, 'title', '')}
                                           touched={touched.title}
                                           error={errors.title}
                                           handleChange={formik.handleChange} />

                                <InputItem title={"Description"}
                                           name={"description"}
                                           placeholder={"Enter a description"}
                                           value={get(formik.values, 'description', '')}
                                           touched={touched.description}
                                           error={errors.description}
                                           handleChange={formik.handleChange} />


                                <InputItem title={"Price"}
                                           name={"price"}
                                           value={get(formik.values, 'price', '')}
                                           touched={touched.price}
                                           type={"number"}
                                           error={errors.price}
                                           handleChange={(value) => {
                                               formik.setFieldValue('price', value);
                                           }} />

                                <SelectItem title={"Brand"}
                                            name={"brandId"}
                                            value={get(formik.values, 'brandId', '')}
                                            touched={touched.brandId}
                                            error={errors.brandId}
                                            handleChange={brandChange}
                                            options={brands} />

                                <SelectItem title={"Category"}
                                            name={"categoryId"}
                                            disabled={!get(formik.values, 'brandId', '')}
                                            value={get(formik.values, 'categoryId', '')}
                                            touched={touched.categoryId}
                                            error={errors.categoryId}
                                            handleChange={categoryChange}
                                            options={categories} />

                                {get(formik.values, 'categoryId', null) && subCategories.length === 0 ? null :
                                    <SelectItem title={"Sub Category"}
                                                disabled={!get(formik.values, 'categoryId', '')}
                                                name={"subCategoryId"}
                                                value={get(formik.values, 'subCategoryId', '')}
                                                touched={touched.subCategoryId}
                                                error={errors.subCategoryId}
                                                handleChange={formik.handleChange}
                                                options={subCategories} />
                                }

                                {get(formik.values, 'categoryId', null) && sizes.length === 0 ? null :
                                    <SelectItem title={"Size"}
                                                name={"sizeId"}
                                                disabled={!get(formik.values, 'categoryId', '')}
                                                value={get(formik.values, 'sizeId', '')}
                                                touched={touched.sizeId}
                                                error={errors.sizeId}
                                                handleChange={formik.handleChange}
                                                options={sizes} />}

                                <SelectItem title={"Condition"}
                                            name={"condition"}
                                            value={get(formik.values, 'condition', '')}
                                            touched={touched.condition}
                                            error={errors.condition}
                                            handleChange={formik.handleChange}
                                            options={[{id: "new", name: "New "}, {id: "used", name: "Used"}]} />

                                <SelectItem title={"Available For"}
                                            name={"availability"}
                                            value={get(formik.values, 'availability', '')}
                                            touched={touched.availability}
                                            error={errors.availability}
                                            handleChange={formik.handleChange}
                                            options={[{id: "sale", name: "Sale"}, {id: "trade", name: "Trade"}]} />

                                <ImageUploader list={images}
                                               update={product}
                                               product={product}
                                               onDelete={deleteImg}
                                               onChange={imgUpdate} />

                                {getProductError && <div className={classNames('error', styles.error)}>
                                    *User should <Link href='/'><a onClick={(e) => {
                                    e.preventDefault();
                                    setShowModal('create-store')
                                }}>create store</a></Link> in order to list products</div>}
                                <button type="submit" className='btn-second'>Continue</button>
                            </form>
                        </div>
                    </div>
                    : !product && <div className={styles.success}>
                    <h1>Congratulations on creating your listing!</h1>
                    <h3 className={styles.subTitle}>Now share your product to start getting purchases</h3>
                    {images.length !== 0 ?
                        <img src={images[0].url} alt='' /> :
                        <img src='/images/placeholder-image.png' alt='' />}
                    <h3>{formik.values.title}</h3>
                    <button type='button' className='btn-primary'
                            onClick={() => {
                                setSuccess(false);
                                selectedProduct({});
                                setImages([]);
                                formik.resetForm()
                            }}>List
                        another product
                    </button>
                    <Link href={routes.marketplace}>
                        <a className='btn-second'>View product on the marketplace</a>
                    </Link>
                </div>}
            </div>
        </section>
    )
};

export default ProductList
