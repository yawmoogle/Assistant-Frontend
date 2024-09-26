import { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({label, inputValue, inputChange}) => {
    return (
        <div>
            <label className="text-black text-xl text-left font-bold mb-2 flex items-center">{label}</label>
            <div className="border border-gray rounded-lg flex flex-wrap items-center focus-within:border-blue mt-5">
            <input 
                type="text"
                name="title"
                id="title"
                value={inputValue}
                onChange={inputChange}
                placeholder={`Enter your ${label} here`}
                className="bg-white text-black flex-grow p-2 border-none outline-none"
                required
                />
            </div>
        </div>
    )
};
TextField.propTypes = {
    label: PropTypes.string,
    inputValue: PropTypes.string,
    inputChange: PropTypes.func,
}

export default TextField;