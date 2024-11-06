import cbsLogo from "../../assets/CBS Research Group Logo-resized.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useApp } from "../../app-context/useApp";
import TextEditor from "../../utils/text-editor/TextEditor";
import TextInput from "../../utils/inputs/TextInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import TransparentLink from "../../utils/custom-link/TransparentLink";
import { IoSendSharp } from "react-icons/io5";
import { MdCancelScheduleSend } from "react-icons/md";
import { Helmet } from "react-helmet";
const SendApplicationResponse = () => {
  const { id } = useParams();
  const { setisContactResSend } = useApp();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const responseSendingHandler = async (e) => {
    e.preventDefault();
    const emailData = {
      subject: subject,
      emailBody: emailBody,
    };
    const authToken = localStorage.getItem("auth-token") || null;
    const adminToken = localStorage.getItem("admin-token") || null;
    const token = authToken || adminToken;
    try {
      setLoading(true);
      await axios
        .post(`${envConfig.contactApplicationResUrl}/${id}`, emailData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setisContactResSend(id);
          setCustomAlert({
            message: res.data.message,
            details: res.data.details,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
        });
    } catch (error) {
      console.log(error);
      setCustomAlert({
        message: error.message,
        details: error.response.data.issue,
        statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
        buttonColor: "bg-red-600",
      });
    } finally {
      setLoading(false);
      setShowAlert(true);
      setSubject("");
      setEmailBody("");
    }
  };

  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-contacts");
  };

  return (
    <>
      <Helmet>
                <title>Contact Inquiry Response | CBS Research Group</title>
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
      {showAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide={showAlert === true ? "flex" : "hidden"}
          closeButton={closeModelHandler}
          statusIcon={customAlert.statusIcon}
          alertHead={customAlert.message}
          message1={customAlert.details}
          buttonColor={customAlert.buttonColor}
        />
      )}
      <section className="py-32 bg-gray-50 ">
        <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={cbsLogo} alt="cbsLogo" />
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
            Respond to Inquiries
            </h3>

            <p className="mt-1 text-center text-gray-500">
            Send a response to the applicant regarding their submitted application.
            </p>

            <form onSubmit={responseSendingHandler}>
              <TextInput
                inputLabel={"Email Subject"}
                defaultText={null}
                textValue={setSubject}
                placeHolderText={"Write email subject"}
                isRequired={true}
                fieldId={"emailSubject"}
              />

              <div className="w-full mb-4 mt-6 border border-gray-100 bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                  <TextEditor
                    editorLabel={"Email Body"}
                    eventValue={emailBody}
                    eventHandler={setEmailBody}
                  />
                </div>

                <div className="flex flex-col">
                  <YellowBtn
                    btnType={"submit"}
                    eventHandler={null}
                    btnText={"Send Response"}
                    icon={<IoSendSharp />}
                  />

                  <TransparentLink
                    path={`/admin-panel/preview-contacts/${id}`}
                    linkText={"Cancel"}
                    icon={<MdCancelScheduleSend />}
                  />
                </div>
                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2"></div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SendApplicationResponse;
