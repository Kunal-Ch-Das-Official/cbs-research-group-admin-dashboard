import { RiMailSendFill } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import { getSingleData } from "../../../operations/apis/getSingleData";

const PreviewContactInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [corespondingInfo, setCorespondingInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.contactFormDataUrl,
        id
      );
      response && setCorespondingInfo(response);
    };
    fetchReqData();
  }, [id]);

  return (
    <div>
      {loading === true && <LoadingSpinner />}
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h2 className="text-2xl ">Applicant Information</h2>
            <p className="text-sm text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Full name</p>
              <p>{corespondingInfo && corespondingInfo.userName}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Contact Number</p>
              <p>{corespondingInfo && corespondingInfo.phoneNumber}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Email Address</p>
              <p>{corespondingInfo && corespondingInfo.emailId}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Desire Course</p>
              <p>{corespondingInfo && corespondingInfo.desireCourse}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Message</p>
              <p>{corespondingInfo && corespondingInfo.message}</p>
            </div>
            <div className="flex justify-around items-center py-8 px-6">
              <Link
                to={`/admin-panel/send-contact-application-response/${
                  corespondingInfo && corespondingInfo._id
                }`}
                className={`${
                  localStorage.getItem(`res-send-${id}`) ? "hidden" : "flex"
                } flex-row item-center border border-gray-300 mx-4 rounded-md shadow-lg bg-gray-50
               justify-center h-10 w-[33.3%] transform translate-1 hover:scale-110 text-green-500`}
              >
                <RiMailSendFill className="text-xl my-auto mr-2" />
                <span className="text-md font-semibold my-auto">
                  Send Response
                </span>
              </Link>

              <Link
                to={`/admin-panel/delete-contacts/${
                  corespondingInfo && corespondingInfo._id
                }`}
                className="flex border border-gray-300 flex-row item-center mx-4 rounded-md shadow-lg bg-gray-50
               justify-center h-10 w-[33.3%] transform translate-1 hover:scale-110 text-red-500"
              >
                <BsTrashFill className="text-xl my-auto mr-2" />
                <span className="text-md font-semibold my-auto">Delete</span>
              </Link>

              <button
                onClick={() => navigate("/admin-panel/manage-contacts")}
                className="flex flex-row item-center border border-gray-300 mx-4 rounded-md shadow-lg bg-gray-50
               justify-center h-10 w-[33.3%] transform translate-1 hover:scale-110 text-yellow-500"
              >
                <IoArrowBack className="text-xl my-auto mr-2" />
                <span className="text-md font-semibold my-auto">Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewContactInfo;
