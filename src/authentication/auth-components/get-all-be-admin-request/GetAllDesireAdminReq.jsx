import React, { useState } from "react";
import { IoIosCopy } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import AdminReqStatus from "../../../utils/admin-request-status/AdminReqStatus";
import { Link } from "react-router-dom";
const GetAllDesireAdminReq = ({ userName, userEmail, recivedAt, id }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const copyEmailHandler = () => {
    const userEmail = document.getElementById("reqUserEmail").innerText;
    navigator.clipboard.writeText(userEmail);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, "1000");
  };
  return (
    <>
      {copySuccess === true && (
        <div className="min-h-screen fixed inset-0 top-4 left-[30%] md:left-[40%] lg:left-[40%] px-4 flex-wrap justify-center items-center w-full h-full z-[9999]">
          <p className="inline-flex items-center shadow-xl px-4 bg-green-400 text-sm rounded-full">
            <span>Copied to clipboard</span>
            <MdOutlineDone className="bg-white text-black rounded-full ml-4 font-bold" />
          </p>
        </div>
      )}
      <div className="w-full max-w-sm px-4 py-3 bg-white border-2 border-gray-300 rounded-md">
        <div className="flex items-center justify-end">
          <AdminReqStatus
            backgroundColor={"bg-green-500"}
            statusIcon={
              <MdOutlineDone className="text-black bg-white rounded-full px-1 py-1 text-lg" />
            }
            statusText={"Approved"}
          />
        </div>

        <div>
          <div className="mt-2 text-lg font-bold text-gray-500">{userName}</div>
          <div
            className="mt-2 mb-2 text-md font-semibold text-gray-500 shadow-md
           inline-flex items-center justify-between w-full rounded-md bg-gray-50 py-1 hover:bg-gray-200"
          >
            <span id="reqUserEmail" className="ml-2 overflow-auto">
              {userEmail}
            </span>
            <IoIosCopy
              className="text-gray-400 hover:text-gray-600 text-lg mr-2 cursor-pointer"
              onClick={copyEmailHandler}
            />
          </div>
          <div className="text-sm font-semibold text-gray-800 flex justify-end">
            Recived at: <span className="ml-1">{recivedAt}</span>
          </div>
        </div>

        <div className="flex items-center justify-around my-3">
          <Link
            to={`/admin-panel/approve-request/${id}`}
            className="px-4 cursor-pointer text-black py-1 text-sm uppercase shadow-xl bg-blue-300
            font-semibold rounded-md  hover:bg-blue-500 mx-2"
          >
            Approve
          </Link>
          <span
            className="px-4 cursor-pointer text-black py-1 text-sm uppercase bg-[#ffe77a] shadow-xl
           hover:bg-[#f7ca00] font-semibold rounded-md  mx-2"
          >
            Reject
          </span>
          <span
            className="px-4 cursor-pointer text-black py-1 text-sm uppercase bg-red-300 shadow-xl
             font-semibold rounded-md hover:bg-red-400 mx-2"
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};

export default GetAllDesireAdminReq;
