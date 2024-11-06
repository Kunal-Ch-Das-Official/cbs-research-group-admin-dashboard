// Project: CBS Research Group Admin Dashboard
// Content: Send email for password reset
// Date: 30/08/2024

import { useRef, useState } from "react";
import axios from "../../../../axios/axios";
import envConfig from "../../../../envConfig";
import { MdFileDownloadDone } from "react-icons/md";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../../utils/custom-models/CustomModel";
import EmailInput from "../../../utils/inputs/EmailInput";
import TransparentLink from "../../../utils/custom-link/TransparentLink";
import { MdCancelScheduleSend } from "react-icons/md";
import YellowBtn from "../../../utils/buttons/YellowBtn";
import { IoSend } from "react-icons/io5";
import { Helmet } from "react-helmet";
const ResetPasswordRequest = () => {
  const requestFormRef = useRef();
  const [adminEmail, setAdminEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [closeModel, setCloseModel] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    heading: null,
    message: null,
    statusIcon: null,
    buttonColor: null,
  });

  const sendRequest = async (e) => {
    setLoading(true);
    e.preventDefault();
    const emailValidate = adminEmail.split("@")[1];
    if (emailValidate === "gmail.com" || emailValidate === "outlook.com") {
      setEmailValidationError(false);
      try {
        await axios
          .post(envConfig.passwordResetLinkSend, { adminUserEmail: adminEmail })
          .then((res) => {
            setResponseMessage({
              heading: res.data.message,
              message: res.data.notification,
              statusIcon: (
                <MdFileDownloadDone className="text-4xl text-green-600 font-bold" />
              ),
              buttonColor: "bg-green-600",
            });
            setLoading(false);
            setCloseModel(true);
          });
      } catch (error) {
        setResponseMessage({
          heading: error.response.data.issue,
          message: error.response.data.details,
          statusIcon: (
            <MdOutlineCancelScheduleSend className="text-4xl text-red-600 font-bold" />
          ),
          buttonColor: "bg-red-600",
        });
        setLoading(false);
        setCloseModel(true);
      }
    } else {
      setEmailValidationError(true);
      setLoading(false);
    }
    requestFormRef.current.reset();
  };

  const closeModelHandler = () => {
    setCloseModel(false);
  };
  return (
    <main className="min-h-screen py-20 lg:py-0 md:py-0 bg-gray-50">
      {/* SEO  */}
      <Helmet>
                <title>Forget Password | CBS Research Group</title>
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
      {
        <CustomModel
          buttonText={"Got it"}
          showOrHide={closeModel === true ? "flex" : "hidden"}
          closeButton={closeModelHandler}
          statusIcon={responseMessage.statusIcon}
          alertHead={responseMessage.heading}
          message1={responseMessage.message}
          buttonColor={responseMessage.buttonColor}
        />
      }
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-500 md:text-2xl">
                Send Request For Password Reset
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={sendRequest}
                ref={requestFormRef}
              >
                {/* EMAIL FIELDS  */}
                <EmailInput
                  inputLabel={"Authorized email"}
                  defaultEmail={null}
                  emailValue={setAdminEmail}
                  emailValidationError={emailValidationError}
                  placeHolderText={"your_name@email.com"}
                  isRequired={true}
                  fieldId={"authUserEmail"}
                />
                {/* ACTION BUTTONS  */}
                <div className="flex flex-col">
                  <YellowBtn
                    btnType={"submit"}
                    eventHandler={null}
                    btnText={"Send request"}
                    icon={<IoSend />}
                  />

                  <TransparentLink
                    path={"/"}
                    linkText={"Cancel"}
                    icon={<MdCancelScheduleSend />}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordRequest;
