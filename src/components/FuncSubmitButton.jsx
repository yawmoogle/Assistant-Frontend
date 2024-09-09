import React from 'react';

const SubmitButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`bg-cyan-500 ${loading ? 'opacity-50 cursor-note-allowed' : 'hover:bg-blue-700'}
      text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
      { loading ? "Submitting" : "Submit"}
    </button>
  );
};

export default SubmitButton;