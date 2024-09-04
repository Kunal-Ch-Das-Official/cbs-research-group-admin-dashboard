import React, { useEffect, useState } from "react";
import { FaGoogleScholar } from "react-icons/fa6";
import { FaResearchgate } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
const PreviewMastersAlumni = () => {
  const { id } = useParams();
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchSingleAlumni = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${envConfig.mastersAlumniUrl}/${id}`);
        setAlumniInfo(res.data);
      } catch (error) {
        console.error(error);
        setAlumniInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleAlumni();
  }, [id]);

  return (
    <>
      {loading === true && <LoadingSpinner />}
      {alumniInfo ? (
        <div className="text-center mt-28">
          <div className="bg-white p-4">
            <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
              <div className="flex rounded-t-lg bg-gray-200 sm:px-2 w-full">
                <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
                  <img
                    src={alumniInfo.profilePicture}
                    alt={alumniInfo.profilePicturePublicId}
                  />
                </div>

                <div className="w-11/12 sm:text-center pl-5 mt-10 text-start">
                  <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                    {alumniInfo.alumniName}
                  </p>
                  <p className="text-heading mt-1">Masters Alumni</p>
                  <p className="text-center inline-flex item-center">
                    <a
                      href={`https://${alumniInfo.googleScholarId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGoogleScholar className="text-xl text-gray-500 mt-1 hover:text-blue-500 transform translate-y-1 hover:scale-110 cursor-pointer" />
                    </a>
                    <a
                      href={alumniInfo.researchGateId}
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
                          <div className="ml-0 lg:ml-6">
                            {alumniInfo.emailId}
                          </div>
                        </div>
                        <div className="flex items-start my-1">
                          <div className="ml-0 lg:ml-6">
                            {" "}
                            {alumniInfo.phoneNumber}
                          </div>
                        </div>
                        <div className="flex flex-col items-start my-1">
                          <div className="ml-0 lg:ml-6">
                            {" "}
                            {alumniInfo.bscDoneFrom}
                          </div>
                        </div>
                        <div className="flex items-start my-1">
                          <div className="ml-0 lg:ml-6">
                            {" "}
                            {alumniInfo.yearOfPassout}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:w-2/3 sm:-mt-10">
                    <div className="py-3">
                      <h2 className="text-lg font-poppins font-bold text-start">
                        About Info
                      </h2>
                      <div className="border-2 w-24 border-top-color my-3"></div>
                      <p className="text-start">{alumniInfo.details}</p>
                      <div className="flex justify-start mt-4">
                        <Link
                          to={"/admin-panel/manage-masters-alumni"}
                          className="text-gray-700 text-lg font-bold bg-yellow-500 px-6 py-1 rounded-lg inline-flex items-center hover:bg-yellow-600 transform translate-y-1 hover:scale-110 cursor-pointer"
                        >
                          <FaLongArrowAltLeft />
                          <span className="ml-2"> Back</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-gray-500 text-center text-2xl font-bold mt-24">
          Alumni details are not available!
        </h1>
      )}
    </>
  );
};

export default PreviewMastersAlumni;
