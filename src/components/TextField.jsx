import PropTypes from 'prop-types';

const TextField = ({ required, label, name, inputValue, inputChange}) => {
    return (
        <div>
            <label className="text-black text-xl text-left font-bold mb-5 flex items-center">{label}</label>
            <div className="border border-gray rounded-lg flex flex-wrap items-center focus-within:border-blue mt-5 mb-5">
            <input 
                type="text"
                name={name}
                id={name}
                value={inputValue}
                onChange={inputChange}
                placeholder={`Enter your ${label} here`}
                className="bg-white text-black flex-grow p-2 border-none outline-none"
                required={required}
                />
            </div>
        </div>
    )
};
TextField.propTypes = {
    required: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    inputValue: PropTypes.string,
    inputChange: PropTypes.func,
}

export default TextField;