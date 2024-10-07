import PropTypes from 'prop-types';

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
SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default SubmitButton;