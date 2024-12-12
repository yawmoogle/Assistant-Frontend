import { useState } from 'react';
import PropTypes from 'prop-types';

const TooltipTextField = ({ required, label, name, inputValue, inputChange, tooltip }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const placeholderTooltip = tooltip || "Placeholder Tooltip"
    return(
<div>
            <label className="text-black text-xl font-bold mb-2 flex items-center mt-5">
                {label}
                <span
                    className="ml-2 text-blue cursor-pointer-relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
                >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8H12.01M12 11V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              />
            </svg>
                {showTooltip && (
                    <div className="absolute bg-black text-white text-xs rounded px-2 py-1 z-50">
                        {placeholderTooltip}
                    </div>
                )}
                </span>
            </label>
            <div className="border border-gray rounded-lg flex flex-wrap items-center focus-within:border-blue mt-5">
            <input
                type="text"
                name={name}
                value={inputValue}
                onChange={inputChange}
                placeholder={`Enter your ${label} here`}
                className="bg-white text-black flex-grow p-2 border-none outline-none"
                required={required}
                />
        </div>
        </div>    
)};
TooltipTextField.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  inputValue: PropTypes.string,
  inputChange: PropTypes.func,
  tooltip: PropTypes.string,
}

export default TooltipTextField;

