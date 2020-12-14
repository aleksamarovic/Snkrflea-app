// core
import React from 'react'

// library
import CurrencyInput from 'react-currency-input-field';

export const InputItem = ({title, name, placeholder, value, touched, error, handleChange, type = "text"}) => {
    return (
        <label>
            <span>{title}</span>
            {name === 'price' ? <CurrencyInput
                    name={name}
                    placeholder="$1,000"
                    prefix={"$"}
                    value={value}
                    allowDecimals={true}
                    decimalsLimit={2}
                    onChange={(value) => handleChange(value)} /> :
                <input name={name} type={type} placeholder={placeholder}
                       onChange={(e) => {
                           handleChange(e)
                       }}
                       value={value} />}
            {touched && error ? (
                <div className='error'>{error}</div>
            ) : null}
        </label>)
};
