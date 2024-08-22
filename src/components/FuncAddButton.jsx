import React from 'react';

const AddButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-50 text-black text-l border-black font-bold p-1 px-1 rounded-full hover:bg-red-300 focus:shadow-outline mb-4 mr-1.5"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    </button>
  );
};

export default AddButton;