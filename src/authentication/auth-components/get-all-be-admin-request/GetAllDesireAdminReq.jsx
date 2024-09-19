import { useEffect, useState } from "react";
import { IoIosCopy } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import AdminReqStatus from "../../../utils/admin-request-status/AdminReqStatus";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbMessageCancel } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";
import { MdSpeakerNotesOff } from "react-icons/md";
import PropTypes from "prop-types";
import { useApp } from "../../../app-context/useApp";

const GetAllDesireAdminReq = ({
  userName,
  userEmail,
  recivedAt,
  id,
  message,
}) => {
  const { isIdAccepted, isIdRejected } = useApp();
  const [copySuccess, setCopySuccess] = useState(false);

  const [isAccepted, setIsAccepted] = useState(() => {
    return localStorage.getItem(`isAccepted-${id}`) || false;
  });
  const [isRejected, setIsRejected] = useState(() => {
    return localStorage.getItem(`isRejected-${id}`) || false;
  });

  const copyEmailHandler = () => {
    const userEmail = document.getElementById("reqUserEmail").innerText;
    navigator.clipboard.writeText(userEmail);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, "1000");
  };

  useEffect(() => {
    if (
      isIdRejected !== null &&
      isIdRejected !== undefined &&
      isIdRejected.includes(id)
    ) {
      setIsRejected(() => localStorage.setItem(`isRejected-${id}`, true));
    }
    if (
      isIdAccepted !== null &&
      isIdAccepted !== undefined &&
      isIdAccepted.includes(id)
    ) {
      setIsAccepted(() => localStorage.setItem(`isAccepted-${id}`, true));
    }
  }, [id, isIdAccepted, isIdRejected]);
  useEffect(() => {
    if (id.includes(isIdRejected)) {
      setIsRejected(true);
    }
    if (id.includes(isIdAccepted)) {
      setIsAccepted(true);
    }
  }, [id, isIdAccepted, isIdRejected]);

  return (
    <>
      {copySuccess === true && (
        <div
          className="min-h-screen fixed inset-0 top-4 left-[30%] md:left-[40%] lg:left-[40%] px-4
         flex-wrap justify-center items-center w-full h-full z-[9999]"
        >
          <p className="inline-flex items-center shadow-xl px-4 bg-green-400 text-sm rounded-full">
            <span>Copied to clipboard</span>
            <MdOutlineDone className="bg-white text-black rounded-full ml-4 font-bold" />
          </p>
        </div>
      )}
      <div className="w-full min-w-[350px] h-[270px] px-4 py-3 bg-white border border-gray-300 rounded-md">
        <div className="flex items-center justify-end">
          {isAccepted && (
            <AdminReqStatus
              textColor={"text-green-500"}
              statusIcon={<FcApproval className="text-lg" />}
              statusText={"Approved"}
            />
          )}
          {isRejected && (
            <AdminReqStatus
              textColor={"text-red-500"}
              statusIcon={
                <MdSpeakerNotesOff className="text-red-600 text-[15px]" />
              }
              statusText={"rejected"}
            />
          )}
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

          <div className="py-2 text-center text-gray-500">
            <p className="text-xs my-1">{message}</p>
          </div>
        </div>

        <div className="-mt-px flex divide-x border-t border-gray-200 border-b  divide-gray-200">
          <div className="flex w-0 flex-1">
            <div className="flex w-0 flex-1">
              <Link
                to={`/admin-panel/approve-request/${id}`}
                className={`relative  inline-flex w-0 flex-1 items-center justify-center 
            gap-x-3 rounded-bl-lg pt-2 pb-4 text-sm font-semibold
             text-gray-900 transform translate-y-1 hover:scale-110 border-r border-gray-200
             ${
               localStorage.getItem(`isRejected-${id}`) ||
               localStorage.getItem(`isAccepted-${id}`)
                 ? "hidden"
                 : "flex"
             }`}
              >
                <FcApproval className="text-2xl" />
                Approve
              </Link>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <Link
                to={`/admin-panel/reject-request/${id}`}
                className={`relative inline-flex w-0 flex-1 items-center justify-center 
              gap-x-3 rounded-bl-lg pt-2 pb-4 text-sm font-semibold
               text-gray-900 transform translate-y-1 hover:scale-110 border-r border-gray-200
               ${
                 localStorage.getItem(`isRejected-${id}`) ||
                 localStorage.getItem(`isAccepted-${id}`)
                   ? "hidden"
                   : "flex"
               }`}
              >
                <TbMessageCancel className="text-2xl text-yellow-500" />
                Reject
              </Link>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <Link
                to={`/admin-panel/delete-request/${id}`}
                className="relative pt-2 pb-4 inline-flex w-0 flex-1 items-center justify-center 
              gap-x-3 rounded-bl-lg border border-transparent text-sm font-semibold
               text-gray-900 transform translate-y-1 hover:scale-110"
              >
                <MdDeleteForever className="text-2xl text-red-500" />
                Delete
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

GetAllDesireAdminReq.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  recivedAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default GetAllDesireAdminReq;
