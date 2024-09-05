import PropTypes from "prop-types";

const AdminReqStatus = ({ textColor, statusIcon, statusText }) => {
  return (
    <p
      className={`px-3 py-1 text-xs inline-flex items-center bg-white shadow-md uppercase ${textColor} rounded-full`}
    >
      <span className="font-medium">{statusText}</span>
      <span className="ml-4 mr-0">{statusIcon}</span>
    </p>
  );
};

AdminReqStatus.propTypes = {
  statusIcon: PropTypes.any.isRequired,
  textColor: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
};

export default AdminReqStatus;
