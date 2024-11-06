import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { FaFilePdf } from "react-icons/fa6";

import { IoArrowBack } from "react-icons/io5";
import { getSingleData } from "../../../operations/apis/getSingleData";
import { Helmet } from "react-helmet";
const PreviewPublication = () => {
  const { id } = useParams();
  const [publicationInfo, setPublicationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractDescription, setExtractDescription] = useState("");
  const [isExtractDescription, setIsExtractDescription] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.publicationsUrl,
        id
      );
      response && setPublicationInfo(response);
    };
    fetchReqData();
  }, [id]);

  useEffect(() => {
    if (publicationInfo) {
      if (publicationInfo.aboutPublication.length > 300) {
        const firstText = publicationInfo.aboutPublication.slice(0, 300);
        setExtractDescription(firstText);
        setIsExtractDescription(true);
      } else {
        setExtractDescription(publicationInfo.aboutPublication);
        setIsExtractDescription(false);
      }
    }
  }, [publicationInfo]);

  const handleReadmore = () => {
    setShowFullText((prev) => !prev);
  };

  return (
    <>
      

      <Helmet>
                <title>
                Publication Overview | CBS Research Group
                </title>
                <meta name="keywords" content="Researcher" />
                <meta name="keywords" content="Dr. Chinmoy Bhattacharya" />
                <meta
                    name="keywords"
                    content="Indian Institute of Engineering Science and Technology"
                />
                <meta name="keywords" content="IIEST" />
                <meta name="keywords" content="Shibpur" />
                <meta name="keywords" content="Electrochemistry" />
                <meta name="keywords" content="Materials Chemistry" />
                <meta name="keywords" content="Photoelectrochemical" />
                <meta name="keywords" content="Solar Cells" />

                <meta
                    name="description"
                    content="Joined the Institute as Assistant Professor , Department of Chemistry, Indian Institute of Engineering Science & Technology, Shibpur (formerly, BESUS) Howrah – 711 103, West Bengal on 23rd June 2006. Promoted to Associate Professor, Department of Chemistry, IIESTS on 22nd Feb. 2019."
                />
                <meta
                    name="location"
                    content="IIEST, Shibpur is located in Howrah— just across the River Hoogly from the city of Kolkata. It is well connected to other parts of the country by road, rail and air. The campus is situated adjacent to the A.J.C. Bose Indian Botanic Garden which boasts of the 250-year-old Great Banyan Tree.
It takes around 20 minutes to reach IIEST, Shibpur from the heart of the city and approximately 90 minutes from the airport. The Howrah Railway Station is about 5 kms away from the institute."
                />
            </Helmet>

      {loading === true && <LoadingSpinner />}

      {publicationInfo ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 pt-28 border border-gray-100 py-20">
          <div className="h-full flex flex-col items-center justify-center w-full  -mx-4 lg:pl-10 order-last lg:order-none">
            <h2 className="text-xl font-bold text-gray-500">
              {publicationInfo.title}
            </h2>
            <p className="mt-1 inline-flex item-center font-medium">
              <span className="text-gray-500 mr-2">Published Date:</span>
              <span className="text-green-500">
                {new Date(publicationInfo.publishedDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-md text-gray-500 font-normal my-2">
              {publicationInfo.contributer}
            </p>
            <div className="w-full border-t border-gray-200 mb-4"></div>

            <div>
              {showFullText === true ? (
                <p className="mt-4 text-sm text-gray-600 ">
                  {publicationInfo.aboutPublication}
                </p>
              ) : (
                <p className="mt-4 text-sm text-gray-600 ">
                  {isExtractDescription === true
                    ? `${extractDescription}....`
                    : extractDescription}
                </p>
              )}
            </div>
            <div>
              <button
                onClick={handleReadmore}
                className="text-sm text-blue-600 font-bold cursor-pointer hover:underline"
              >
                {" "}
                {isExtractDescription === true ? (
                  <>{showFullText === true ? "Showless..." : " Showmore..."}</>
                ) : (
                  ""
                )}
              </button>
            </div>

            <div className="mt-10 ">
              <Link
                to={"/admin-panel/manage-publications"}
                className="border border-gray-200 px-6 py-1 inline-flex items-center mr-4 cursor-pointer transform translate-1 hover:scale-110 text-yellow-500 bg-gray-50 rounded-md"
              >
                <IoArrowBack className="text-xl font-bold mr-2" />
                <span className="font-bold">Back</span>
              </Link>
              <a
                href={`https://${publicationInfo.pdfLink}`}
                target="_blank"
                className="border border-gray-200 px-6 py-1 inline-flex items-center cursor-pointer transform translate-1 hover:scale-110  text-blue-500 bg-gray-50 rounded-md"
              >
                <FaFilePdf className="text-lg font-bold mr-2" />
                <span className="font-bold">View Pdf</span>
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center w-full  -mx-4 lg:pl-10">
              <div className="flex flex-col items-end px-3">
                <img
                  className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                  src={publicationInfo.publicationThumbnail}
                  alt={publicationInfo.publicationThumbnailPublicId}
                />
                <img
                  className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                  src={publicationInfo.firstOverview}
                  alt={publicationInfo.firstOverviewPublicId}
                />
              </div>
              <div className="px-3">
                <img
                  className="object-cover w-40 h-40 rounded shadow-lg sm:hbg-green-500ray-50-64 xl:h-80 sm:w-full xl:w-80"
                  src={publicationInfo.secondOverview}
                  alt={publicationInfo.secondOverviewPublicId}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-2xl pt-28 text-gray-500 font-bold text-center">
          Something went wrong please try again later
        </h2>
      )}
    </>
  );
};

export default PreviewPublication;
