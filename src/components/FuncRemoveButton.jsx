import React from 'react';

const RemoveButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-50 hover:bg-red-100 text-black font-bold text-m py-0.5 px-2 border-black rounded-full focus:outline-none focus:shadow-outline"
    >
      X
    </button>
  );
};

export default RemoveButton;