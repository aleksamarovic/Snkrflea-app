// core
import React, { useEffect, useState } from 'react'

// library
import { useDispatch } from "react-redux";
import _ from 'lodash';
import classNames from "classnames";

// components
import { generalActions } from "../../redux/general/actions";
import { getBrandsRequest, getCategoriesRequest, getSizeRequest, getSubcategoriesRequest, } from '../../api/actions'
import { Item } from "./components/Item/Item";

// assets
import styles from "./Filter.module.scss";

const initialFilter = {
    brand: [],
    category: [],
    subcategory: [],
    size: [],
    price: [],
    condition: [],
    availability: []
};
export const Filter = ({getProducts, showFilter}) => {
    const dispatch = useDispatch();

    const toggle = (array, item) => _.xor(array, [item]);
    const condition = [{id: 'new', name: 'new'}, {id: 'used', name: 'used'}];
    const availability = [{id: 'trade', name: 'trade'}, {id: 'sale', name: 'sale'}];
    const prices = [{id: 1, from: 0, to: 50}, {id: 2, from: 50, to: 200}, {id: 3, from: 100, to: 250}, {
        id: 4,
        from: 250,
        to: 500
    }, {id: 5, from: 500, to: 1000}, {id: 6, from: 1000, to: 10000000}];

    const [brands, setBrands] = useState(null);
    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [filters, setFilters] = useState(initialFilter);
    const [price, setPrice] = useState([]);
    const [searchArray, setSearchArray] = useState([]);
    const [updateSearch, setUpdateSearch] = useState(false);

    const setShowFilters = (state) => dispatch(generalActions.setShowFilters(state));

    // const onConditionChange = (e) => {
    //       setFilters((prev) => ({...prev, condition:e.target.value }))
    // };

    //  const onAvailabilityChange = (e) => {
    //      setFilters((prev) => ({...prev, availability:e.target.value }))
    // };

    useEffect(() => {
        getBrandsRequest().then((brands) => {
            setBrands(brands)
        });
        let categoryQuery = filters.brand.length > 0 ? {brands: filters.brand} : {};
        getCategoriesRequest(categoryQuery).then((categories) => {
            setCategories(() => (categories))
        });

        let subcategory1 = filters.category.length > 0 ? {categories: filters.category} : {};
        let subcategory2 = filters.brand.length > 0 ? {brands: filters.brand} : {};
        getSubcategoriesRequest(subcategory1, subcategory2).then((subCategories) => {
            setSubCategories(subCategories)
        });

        getSubcategoriesRequest({
            categories: filters.category,
            brands: filters.brand
        }).then((subcategories) => {
            setSubCategories(() => (subcategories))
        });
        getSizeRequest({}).then((sizes) => {
            setSizes(sizes)
        });

    }, [searchArray]);

    useEffect(() => {
        let categoryQuery = filters.category.length > 0 ? {categories: filters.category} : {};
        getSizeRequest(categoryQuery).then((categories) => {
            setSizes(categories)
        });

        setUpdateSearch(false);
    }, [updateSearch]);

    useEffect(() => {
        let INS = {};
        let ORS = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (!_.isEmpty(value)) {
                if (['brand', 'category', 'size', 'subcategory'].includes(key)) {
                    INS[key] = value;
                }
                if (['condition', 'availability'].includes(key)) {
                    ORS[key] = value;
                }
            }
        });

        getProducts({INS, ORS, range: prices.filter(v => price.includes(v.id))});

        setUpdateSearch(false);
    }, [updateSearch]);

    useEffect(() => {
        getSubcategoriesRequest({
            categories: filters.category,
            brands: filters.brand
        }).then((subcategories) => {
            setSubCategories(() => (subcategories))
        });

        setUpdateSearch(false);
    }, [updateSearch]);

    useEffect(() => {
        getCategoriesRequest({brands: filters.brand}).then((categories) => {
            setCategories(() => (categories))
        });

        setUpdateSearch(false);
    }, [updateSearch]);

    return (
        <div className={classNames(styles.filterItem, showFilter ? styles.show : '')}>
            <h5>
                <img onClick={() => setShowFilters(!showFilter)}
                     className={styles.close}
                     src='./icons/cancel-orange.svg'
                     alt='' />
                <span className={styles.title}
                      onClick={() => {
                          if (window.innerWidth < 768) setShowFilters(!showFilter)
                      }}>
                    Filters
                </span>
                <span className={styles.clear} onClick={() => {
                  setFilters(initialFilter)
                  setPrice([])
                } }>Clear</span>
            </h5>
            {/*<div className={styles.search}>*/}
            {/*    {searchArray.map((search) => (*/}
            {/*        <div className={styles.item}>{search}</div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div className={styles.main}>
                <Item single='brand'
                      name='brands'
                      filter={brands}
                      filters={filters}
                      toggle={toggle}
                      setFilters={setFilters}
                      searchArray={searchArray}
                      setSearchArray={setSearchArray} />
                <Item single='category'
                      name='categories'
                      filter={categories}
                      filters={filters}
                      toggle={toggle}
                      setFilters={setFilters}
                      searchArray={searchArray}
                      setSearchArray={setSearchArray} />
                <Item single='subcategory'
                      name='subCategories'
                      filter={subCategories}
                      filters={filters}
                      toggle={toggle}
                      setFilters={setFilters}
                      searchArray={searchArray}
                      setSearchArray={setSearchArray} />
                <Item single='size'
                      name='sizes'
                      filter={sizes}
                      filters={filters}
                      toggle={toggle}
                      setFilters={setFilters}
                      searchArray={searchArray}
                      setSearchArray={setSearchArray} />
                <Item single='price'
                      name='prices'
                      filter={prices}
                      filters={price}
                      toggle={toggle}
                      setFilters={setPrice}
                      searchArray={searchArray}
                      setSearchArray={setSearchArray} />
                <Item single='condition'
                      name='condition'
                      filter={condition}
                      filters={filters}
                      toggle={toggle}
                      setFilters={setFilters}
                      searchArray={searchArray}
                      setSearchArray={setSearchArray} />
                <Item single='availability'
                      name='availability'
                      filter={availability}
                      filters={filters}
                      toggle={toggle}
                      setFilters={setFilters}
                      searchArray={searchArray}
                      setSearchArray={setSearchArray} />
                <div className={styles.updateSearch}>
                    <h4 onClick={() => {
                        setUpdateSearch(true);
                        if (window.innerWidth < 768) setShowFilters(!showFilter)
                    }}>Update Search</h4>
                </div>
            </div>

        </div>
    )
};
