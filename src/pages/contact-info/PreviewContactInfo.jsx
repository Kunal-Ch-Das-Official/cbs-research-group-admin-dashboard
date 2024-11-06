import { RiMailSendFill } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import { getSingleData } from "../../../operations/apis/getSingleData";
import { Helmet } from "react-helmet";

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
    <main className="bg-gray-50">

<Helmet>
                <title>Contact Inquiry Preview | CBS Research Group</title>
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
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h2 className="text-2xl ">Contact Us Inquiry</h2>
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
            <div className="flex flex-col md:flex-row justify-around items-center py-8 px-6">
              <Link
                to={`/admin-panel/send-contact-application-response/${
                  corespondingInfo && corespondingInfo._id
                }`}
                className={`${
                  localStorage.getItem(`res-send-${id}`) ? "hidden" : "flex"
                } flex-row item-center border border-gray-300 mx-4 rounded-md shadow-lg bg-gray-50
               justify-center h-10 w-full md:w-[33.3%] transform translate-1 hover:scale-110 text-green-500`}
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
               justify-center h-10 my-4 md:my-0 w-full md:w-[33.3%] transform translate-1 hover:scale-110 text-red-500"
              >
                <BsTrashFill className="text-xl my-auto mr-2" />
                <span className="text-md font-semibold my-auto">Delete</span>
              </Link>

              <button
                onClick={() => navigate("/admin-panel/manage-contacts")}
                className="flex flex-row item-center border border-gray-300 mx-4 rounded-md shadow-lg bg-gray-50
               justify-center h-10 w-full md:w-[33.3%] transform translate-1 hover:scale-110 text-yellow-500"
              >
                <IoArrowBack className="text-xl my-auto mr-2" />
                <span className="text-md font-semibold my-auto">Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PreviewContactInfo;
