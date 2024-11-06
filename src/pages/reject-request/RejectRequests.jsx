import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import { TbNotesOff } from "react-icons/tb";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import style from "../../utils/custom-models/CustomModel.module.css";
import { useApp } from "../../app-context/useApp";
import { Helmet } from "react-helmet";

const RejectRequests = () => {
  const { id } = useParams();
  const { setisIdRejected } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const handleRejection = async () => {
    const authToken = localStorage.getItem("auth-token");
    const adminToken = localStorage.getItem("admin-token");
    const token = authToken || adminToken;
    try {
      setLoading(true);
      await axios
        .post(`${envConfig.becomeAdminRequestRejectedUrl}/${id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setisIdRejected(id);
          setAlertMessage({
            message: res.data.message,
            details: res.data.notification,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
        });
    } catch (error) {
      setAlertMessage({
        message: error.response.data.issue,
        details: error.response.data.details,
        statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
        buttonColor: "bg-red-600",
      });
    } finally {
      setLoading(false);
      setOpenAlert(true);
    }
  };

  const closeModelHandler = () => {
    setOpenAlert(false);
    navigate("/admin-panel/manage-request");
  };
  return (
    <main className="min-h-screen">
<Helmet>
                <title>
                Reject Admin Proposal | CBS Research Group
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
      {openAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide="flex"
          closeButton={closeModelHandler}
          statusIcon={alertMessage.statusIcon}
          alertHead={alertMessage.message}
          message1={alertMessage.details}
          buttonColor={alertMessage.buttonColor}
        />
      )}
      <div
        className={`flex min-h-screen fixed inset-0 px-4 flex-wrap justify-center items-center w-full h-full before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] ${style.overlay} overflow-auto`}
      >
        <div
          className="w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 bg-white
         shadow-lg rounded-md px-5 py-10 relative mx-auto text-center"
        >
          <div className="flex flex-col justify-center items-center">
            <div>
              <TbNotesOff className="text-[#f7ca00]  text-4xl" />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold flex-1 text-gray-600">
              Are you really want to reject this request?
            </h3>
            <div className="flex flex-row justify-between mx-2">
              <button
                onClick={handleRejection}
                className={`mx-2 px-6 py-2.5 mt-8 w-full rounded cursor-pointer
                     text-black text-sm font-semibold border-none outline-none bg-[#ffe77a] shadow-xl
           hover:bg-[#f7ca00]`}
              >
                Confirm
              </button>
              <button
                onClick={() => navigate("/admin-panel/manage-request")}
                className={`mx-2 px-6 py-2.5 mt-8 w-full rounded cursor-pointer hover:text-black hover:bg-gray-300 text-gray-700 text-sm font-semibold shadow-xl outline-none bg-gray-200`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RejectRequests;
