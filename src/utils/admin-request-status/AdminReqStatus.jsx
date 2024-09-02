import React from "react";
import { IoIosCopy } from "react-icons/io";
const AdminReqStatus = ({ backgroundColor, statusIcon, statusText }) => {
  return (
    <p
      className={`px-3 py-1 text-xs inline-flex items-center text-white uppercase ${backgroundColor} rounded-full`}
    >
      <span className="font-medium">{statusText}</span>
      <span className="ml-4 mr-0">{statusIcon}</span>
    </p>
  );
};

export default AdminReqStatus;
