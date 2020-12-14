// core
import React, { useState } from 'react'

// assets
import styles from "./Item.module.scss";
import { Loading } from "../../..";

export const Item = ({single, name, filter, filters, toggle, setFilters, searchArray, setSearchArray}) => {
    const [count, setCount] = useState(0);

    const hideFilters = (filter, count) => {
        if (filter.length > count) return count;
    };

    return (
        single !== 'price' ? <div className={styles.item}>
                <h4 onClick={() => filter.length !== count ? setCount(filter.length) : setCount(0)}
                    className={count !== 0 ? styles.active : ''}>
                    {name}
                </h4>
                {!filter ? <div className={styles.loading}><Loading relative /></div>
                    : filter.length !== 0 ? <div className={styles.itemInner}>{filter.map((b) => (
                            <button key={b.id}
                                    className={filters[single].includes(b.id) ? styles.selected : ''}
                                    onClick={() => {
                                        setSearchArray(()=> [...searchArray, b.name]);
                                        setFilters((prev) => ({...prev, [single]: toggle(prev[single], b.id)}))}
                                    }>
                                {b.name}
                            </button>)).slice(0, hideFilters(name, count))}</div>
                        : <h6>Not found</h6>}
            </div>
            : <div className={styles.item}>
                <h4 onClick={() => filter.length !== count ? setCount(filter.length) : setCount(0)}
                    className={count !== 0 ? styles.active : ''}>
                    {single}
                </h4>
                {filter.length !== 0 ? <div className={styles.itemInner}>{filter.map((c) =>
                        (<button key={c.id} className={filters.includes(c.id) ? styles.selected : ''}
                                 onClick={() => setFilters((prev) => (toggle(prev, c.id)))}>
                          {c.from == 1000 ? "$1000+" : `$${c.from} - $${c.to}` }  
                        </button>)).slice(0, hideFilters(name, count))}</div>
                    : <div className={styles.loading}><Loading relative /></div>}
            </div>
    )
};
