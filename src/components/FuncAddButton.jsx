import React from 'react';

const AddButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-50 hover:bg-red-100 text-black text-l border-black font-bold py-0.5 px-2 rounded-full focus:outline-none focus:shadow-outline mb-4"
    >
      +
    </button>
  );
};

export default AddButton;