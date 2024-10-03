import { useState } from 'react';
import PropTypes from 'prop-types';

const DropdownOptions = ({ label, options }) => {
    const [value, setValue] = useState('')

    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={e => setValue(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
DropdownOptions.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string)
}

export default DropdownOptions;