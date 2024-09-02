// Functionalities.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AddButton from './FuncAddButton';
import RemoveButton from './FuncRemoveButton';

const Functionalities = ({ functionalities, handleChange, handleAddFunctionality, handleRemoveFunctionality }) => {

    return (
        <div className="mt-5">
            <div className="flex items-center justify-between mb-2 gap-10">
                <h2 className="text-black text-xl font-bold mb-5 text-left">Desired Functionalities</h2>
                <AddButton onClick={handleAddFunctionality} />
            </div>

            {functionalities.map((func) => (
                <div key={func.id} className="relative mb-4 flex flex-col">
                    <div className="flex items-center gap-1">
                        <textarea
                            name={`functionality${func.id}`} // Trailing Id
                            value={func.value}
                            onChange={(e) => handleChange(func.id, e)}
                            className="bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:shadow-outline resize-none"
                            rows="1"
                            placeholder={`${func.value}`}
                        />
                        <RemoveButton onClick={() => handleRemoveFunctionality(func.id)} className="absolute right-1" />
                    </div>
                </div>
            ))}
        </div>
    );
};
Functionalities.propTypes = {
    functionalities: PropTypes.array,
    handleChange: PropTypes.func,
    handleAddFunctionality: PropTypes.func,
    handleRemoveFunctionality: PropTypes.func
}

export default Functionalities;
