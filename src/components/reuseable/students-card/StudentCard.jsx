import { FaGoogleScholar } from "react-icons/fa6";
import { FaResearchgate } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdPreview } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const StudentCard = ({
  requiredName,
  googleSchollarUrl,
  researchGateUrl,
  ImageUrl,
  EmailId,
  contactNumber,
  PreviousCollege,
  PreviousMastersCollege,
  passwoutYear,
  currentYear,
  uploadDate,
  updateDate,
  previewRouteLink,
  updateRouteLink,
  deleteRouteLink,
}) => {
  return (
    <section>
      <ul role="list">
        <li
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow h-[350px]
         overflow-y-scroll overflow-x-hidden no-scrollbar"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-lg font-medium text-gray-900">
                  {requiredName}
                </h3>
              </div>
              <div id="socialHandle" className="inline-flex items-center">
                <a
                  href={`https://${googleSchollarUrl}`}
                  target="_blank"
                  className="mr-4"
                >
                  <FaGoogleScholar className="text-xl text-gray-500 hover:text-blue-500 transform translate-y-1 hover:scale-110" />
                </a>
                <a href={`https://${researchGateUrl}`} target="_blank">
                  <FaResearchgate className="text-xl text-gray-500 hover:text-orange-300 transform translate-y-1 hover:scale-110" />
                </a>
              </div>
            </div>
            <img
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 ring-2 ring-gray-300"
              src={ImageUrl}
              alt={requiredName}
            />
          </div>

          <div className="pl-6 mb-2 flex flex-col" id="AditionalInfo">
            <p className="mt-1 truncate text-md text-gray-500 inline-flex items-center">
              <span className="text-gray-600 font-bold mr-1">Email Id:</span>
              <span className="text-md flex flex-wrap flex-col">{EmailId}</span>
            </p>
            <p className="mt-1 truncate text-md text-gray-500 inline-flex items-center">
              <span className="text-gray-600 font-bold mr-1">Phone:</span>
              <span className="text-md flex flex-wrap flex-col">
                {contactNumber}
              </span>
            </p>
            <div className="mt-1 text-md text-gray-500 inline-flex item-center">
              <span className="text-gray-600 font-bold mr-1">Graduate:</span>
              <div className="text-md flex flex-col max-w-[400px]">
                {PreviousCollege}
              </div>
            </div>

            <div className="mt-1 text-md text-gray-500 inline-flex item-center">
              <span
                className={`text-gray-600 font-bold mr-1 ${
                  PreviousMastersCollege ? "inline-flex" : "hidden"
                }`}
              >
                Masters:
              </span>
              <div
                className={`text-md flex flex-col max-w-[400px] ${
                  PreviousMastersCollege ? "inline-flex" : "hidden"
                }`}
              >
                {PreviousMastersCollege}
              </div>
            </div>

            <p className="mt-1 truncate text-md text-gray-500 inline-flex items-center">
              <span className="text-gray-600 font-bold mr-1">
                {currentYear ? "Current Year:" : "Passout Year:"}
              </span>
              <span className="text-md flex flex-wrap flex-col">
                {currentYear ? currentYear : passwoutYear}
              </span>
            </p>
          </div>

          <div
            className="flex justify-between px-6 py-2"
            id="CreateAndUpdateDate"
          >
            <div>
              <p className="text-xs text-gray-500">
                <span className="font-bold mr-1">Uploaded At:</span>
                <span className="text-green-600">{uploadDate}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">
                <span className="font-bold mr-1">Last Update:</span>
                <span className="text-green-600">{updateDate}</span>
              </p>
            </div>
          </div>

          <div>
            <div className="-mt-px flex divide-x  divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  to={previewRouteLink}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center 
                  gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold
                   text-gray-900 transform translate-y-1 hover:scale-110"
                >
                  <MdPreview className="text-2xl text-yellow-400" />
                  Preview
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  to={updateRouteLink}
                  className="relative inline-flex w-0 flex-1 items-center justify-center 
                  gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold
                   text-gray-900 transform translate-y-1 hover:scale-110"
                >
                  <GrDocumentUpdate className="text-xl text-green-500" />
                  Update
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  to={deleteRouteLink}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 
                  rounded-br-lg border border-transparent py-4 text-sm font-semibold
                   text-gray-900 transform translate-y-1 hover:scale-110"
                >
                  <MdDeleteForever className="text-2xl text-red-500" />
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

StudentCard.propTypes = {
  requiredName: PropTypes.string,
  googleSchollarUrl: PropTypes.string,
  researchGateUrl: PropTypes.string,
  ImageUrl: PropTypes.string,
  EmailId: PropTypes.string,
  contactNumber: PropTypes.string,
  PreviousCollege: PropTypes.string,
  PreviousMastersCollege: PropTypes.string || null,
  passwoutYear: PropTypes.string || null,
  currentYear: PropTypes.string || null,
  uploadDate: PropTypes.string,
  updateDate: PropTypes.string,
  previewRouteLink: PropTypes.string,
  updateRouteLink: PropTypes.string,
  deleteRouteLink: PropTypes.string,
};
export default StudentCard;
