import React from 'react';

const SubmitButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`bg-button ${loading ? 'opacity-50 cursor-note-allowed' : 'hover:bg-sidebar'}
      text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
      { loading ? "Submitting" : "Submit"}
    </button>
  );
};

export default SubmitButton;