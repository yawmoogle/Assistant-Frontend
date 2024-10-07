// Functionalities.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AddButton from './FuncAddButton';
import RemoveButton from './FuncRemoveButton';

const MultiLineTextField = ({ label, items, handleChange, handleAddItem, handleRemoveItem }) => {

    return (
        <div className="mt-5">
            <div className="flex items-center justify-between mb-2 gap-10">
                <h2 className="text-black text-xl font-bold mb-5 text-left">{label}</h2>
                <AddButton onClick={handleAddItem} />
            </div>

            {items.map((item,index) => (
                <div key={index} className="relative mb-4 flex flex-col">
                    <div className="flex items-center gap-1">
                        <textarea
                            value={item || ''}
                            onChange={(e) => handleChange(e, index)}
                            className="bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:shadow-outline resize-none"
                            rows="1"
                            placeholder={`${item}` || `Enter ${label} here`}
                        />
                        <RemoveButton onClick={() => handleRemoveItem(index)} className="absolute right-1" />
                    </div>
                </div>
            ))}
        </div>
    );
};
MultiLineTextField.propTypes = {
    items: PropTypes.array,
    handleChange: PropTypes.func,
    handleAddItem: PropTypes.func,
    handleRemoveItem: PropTypes.func
}

export default MultiLineTextField;
