import PropTypes from 'prop-types';

const PillTextField = ({label, inputValue, inputPills, handleInputChange, handleInputEntry, handleInputRemove}) => {

    return (
        <div className="w-full mt-5 mb-2">
            <label className="text-black text-xl text-left font-bold mb-2 flex items-center">{label}</label>
            <div className="bg-slate-50 border border-grey rounded-lg flex-grow flex-wrap items-center focus-within:border-blue">
                <div className="flex flex-wrap items-center">
                {inputPills.map((pill,index) => (
                    <div
                    key={index}
                    className="bg-red-200 text-black border border-black flex items-center rounded-full px-3 py-1 ml-2 mr-1 mb-1 mt-1">
                        {pill}
                        <span
                        onClick={() => handleInputRemove(index)}
                        className="ml-2 cursor-pointer font-bold text-red-600">
                            &times;
                        </span>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputEntry}
                    placeholder={`Enter your ${label} and press Enter`}
                    className="bg-slate-50 flex-grow p-2 border-none outline-none w-full"
                >
                </input>
            </div>
            </div>
        </div>
    );
};
PillTextField.propTypes = {
    inputValue: PropTypes.string,
    inputPills: PropTypes.array,
    handleInputChange: PropTypes.func,
    handleInputEntry: PropTypes.func,
    handleInputRemove: PropTypes.func
}

export default PillTextField;