// core
import React from 'react'

// library
import classNames from 'classnames'

// assets
import styles from './Loading.module.scss'

export const Loading = ({relative = null, absolute = null}) => {

    return (
        <div className={classNames(styles.loading, relative && styles.relative, absolute && styles.absolute)}>
            {!relative ? <img src='/icons/loading.svg' alt='' /> : <img src='/icons/loading-orange.svg' alt='' />}
        </div>
    )
};



