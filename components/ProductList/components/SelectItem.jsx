// core
import React, { useEffect, useState } from 'react'

export const SelectItem = ({title = '', name = '', value = '', options = [], disabled = false, touched = false, error, handleChange}) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        setList(options);
    }, [options]);
    return (<label>
        <span>{title}</span>
        <select name={name}
                disabled={disabled}
                value={value}
                onChange={handleChange}>
            <option value={''}>Choose...</option>
            {list.map((b, index) =>
                <option key={index} value={b.id}>{b.name}</option>)}
        </select>
        {touched && error ? (
            <div className='error'>{error}</div>
        ) : null}
    </label>)
};
