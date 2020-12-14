// core
import React, { useState } from 'react'

// library
import Select from 'react-select';


export const CustomSelect = ({ options, placeholder, onChange, name }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: base => ({
      ...base,
      // This line disable the blue border
      boxShadow: 'none'
    }),
  };
  return (
    <Select
      instanceId
      styles={customStyles}
      isSearchable={false}
      className="select"
      classNamePrefix="select"
      defaultValue={selectedOption}
      onChange={onChange ? (e) => onChange(e, name) : setSelectedOption}
      options={options}
      name={name}
      placeholder={placeholder}
      isClearable={true}
    />
  )
};
