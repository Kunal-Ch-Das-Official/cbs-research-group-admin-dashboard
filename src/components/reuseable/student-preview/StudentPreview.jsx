import { FaGoogleScholar } from "react-icons/fa6";
import { FaResearchgate } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import PropTypes from "prop-types";
const StudentPreview = ({
  studentName,
  profileImageUrl,
  previewHeading,
  googleScholarId,
  researchGateId,
  emailId,
  phoneNumber,
  bscCollege,
  mscCollege,
  yearOfPassout,
  currentYear,
  aboutInfo,
  goBackLink,
}) => {
  return (
    <div className="text-center mt-28">
      <div className="bg-white p-4">
        <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
          <div className="flex rounded-t-lg bg-gray-200 sm:px-2 w-full">
            <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
              <img src={profileImageUrl} alt={studentName} />
            </div>

            <div className="w-11/12 sm:text-center pl-5 mt-10 text-start">
              <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                {studentName}
              </p>
              <p className="text-heading mt-1">{previewHeading}</p>
              <p className="text-center inline-flex item-center">
                <a
                  href={`https://${googleScholarId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGoogleScholar className="text-xl text-gray-500 mt-1 hover:text-blue-500 transform translate-y-1 hover:scale-110 cursor-pointer" />
                </a>
                <a
                  href={`https://${researchGateId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaResearchgate className="text-xl text-gray-500 mt-1 hover:text-orange-300 ml-2 transform translate-y-1 hover:scale-110 cursor-pointer" />
                </a>
              </p>
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-col sm:flex-row sm:mt-10">
              <div className="flex flex-col sm:w-1/3">
                <div className="py-3 sm:order-none order-3">
                  <h2 className="text-lg font-poppins font-bold text-start ml-0 lg:ml-6">
                    Contact Details
                  </h2>
                  <div className="border-2 w-32 border-top-color my-3 ml-0 lg:ml-6"></div>

                  <div className="flex flex-col justify-start ml-0 mr-2 text-lg font-bold text-gray-500">
                    <div className="flex items-start my-1">
                      <div className="ml-0 lg:ml-6">{emailId}</div>
                    </div>
                    <div className="flex items-start my-1">
                      <div className="ml-0 lg:ml-6"> {phoneNumber}</div>
                    </div>
                    <div className="flex flex-col items-start my-1">
                      <div className="ml-0 lg:ml-2"> BSC: {bscCollege}</div>
                    </div>
                    <div
                      className={`${
                        mscCollege ? "flex" : "hidden"
                      } flex-col items-start my-1`}
                    >
                      <div className="ml-0 lg:ml-6"> MSC: {mscCollege}</div>
                    </div>
                    {yearOfPassout ? (
                      <div className="inline-flex items-center justify-start my-1">
                        <div className="ml-0 lg:ml-6">
                          Completed At: {yearOfPassout}
                        </div>
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-start my-1">
                        <div className="ml-0 lg:ml-6">
                          Current Year: {currentYear}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:w-2/3 sm:-mt-10">
                <div className="py-3">
                  <h2 className="text-lg font-poppins font-bold text-start">
                    About Info
                  </h2>
                  <div className="border-2 w-24 border-top-color my-3"></div>
                  <p className="text-start">{aboutInfo}</p>
                  <div className="flex justify-start mt-4">
                    <Link
                      to={goBackLink}
                      className="text-gray-700 text-lg font-bold bg-yellow-500 px-6 py-1 rounded-lg inline-flex items-center hover:bg-yellow-600 transform translate-y-1 hover:scale-110 cursor-pointer"
                    >
                      <FaLongArrowAltLeft />
                      <span className="ml-2">Return</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
StudentPreview.propTypes = {
  studentName: PropTypes.string,
  profileImageUrl: PropTypes.string,
  previewHeading: PropTypes.string,
  googleScholarId: PropTypes.string,
  researchGateId: PropTypes.string,
  emailId: PropTypes.string,
  phoneNumber: PropTypes.string,
  bscCollege: PropTypes.string,
  mscCollege: PropTypes.string || null,
  yearOfPassout: PropTypes.string || null,
  currentYear: PropTypes.string || null,
  aboutInfo: PropTypes.string,
  goBackLink: PropTypes.string,
};
export default StudentPreview;
