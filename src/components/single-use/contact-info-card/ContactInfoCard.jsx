import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { useApp } from "../../../app-context/useApp";
import { useEffect, useState } from "react";
const ContactInfoCard = ({
  customerName,
  providedEmail,
  providedNumber,
  submitionDate,
  submitionTime,
  preViewUrl,
  deleteUrl,
  id,
}) => {
  const [isResponseSend, setIsResponseSend] = useState(() => {
    return localStorage.getItem(`res-send-${id}`) || false;
  });
  const { isContactResSend } = useApp();
  const date = new Date(submitionDate); // Sample date
  // Get full month name (e.g., "September")
  const fullMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
  useEffect(() => {
    if (
      isContactResSend !== null &&
      isContactResSend !== undefined &&
      isContactResSend.includes(id)
    ) {
      setIsResponseSend(() => localStorage.setItem(`res-send-${id}`, true));
    }
  }, [isContactResSend, id]);

  useEffect(() => {
    if (id.includes(isContactResSend)) {
      setIsResponseSend(true);
    }
  }, [id, isContactResSend]);

  const trim = submitionDate.split("T")[0];
  const getExactDate = trim.split("-")[2];

  return (
    <div>
      <div className="lg:flex  rounded-lg border  border-gray-200 my-12 shadow-xl">
        <div className="bg-green-400 rounded-lg lg:w-2/12 py-4 block h-full shadow-inner">
          <div className="text-center tracking-wide">
            <div className="text-white font-bold text-4xl ">{getExactDate}</div>
            <div className="text-white font-normal text-2xl">
              {fullMonthName}
            </div>
          </div>
        </div>
        <div className="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
          <div className="flex flex-row lg:justify-start justify-center">
            <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
              <i className="far fa-clock"></i> {submitionTime}
            </div>
            <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2 inline-flex item-center my-auto">
              <span className="text-gray-600 font-bold mr-1">
                Response Status:
              </span>
              {isResponseSend ? (
                <FcApproval className="text-xl" />
              ) : (
                <MdOutlineSpeakerNotesOff className="text-red-500 rounded-full font-bold text-lg" />
              )}
            </div>
          </div>
          <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
            {customerName}
          </div>

          <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
            {providedEmail}
          </div>
          <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
            {providedNumber}
          </div>
        </div>
        <div className="flex flex-row items-center w-full lg:w-1/3 bg-white lg:justify-end justify-center px-2 py-4 lg:px-0">
          <Link
            to={preViewUrl}
            className="tracking-wider text-gray-800 bg-yellow-400 px-2 text-sm rounded leading-loose mx-2 font-semibold cursor-pointer"
          >
            Preview
          </Link>
          <Link
            to={deleteUrl}
            className="tracking-wider text-gray-800 bg-red-400 px-2 text-sm rounded leading-loose mx-2 font-semibold cursor-pointer"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

ContactInfoCard.propTypes = {
  customerName: PropTypes.string,
  providedEmail: PropTypes.string,
  providedNumber: PropTypes.string,
  submitionDate: PropTypes.string,
  submitionTime: PropTypes.string,
  preViewUrl: PropTypes.string,
  deleteUrl: PropTypes.string,
  id: PropTypes.string,
};

export default ContactInfoCard;
