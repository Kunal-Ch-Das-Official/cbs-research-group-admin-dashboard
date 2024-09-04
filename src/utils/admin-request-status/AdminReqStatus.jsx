import React from "react";
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

export default AdminReqStatus;
