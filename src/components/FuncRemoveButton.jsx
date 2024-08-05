import React from 'react';

const RemoveButton = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-0.5 right-1 rounded-full ${className} cursor-pointer bg-slate-50 text-red-600 p-1 px-3 hover:bg-slate-100 `}
    >
      X
    </button>
  );
};

export default RemoveButton;