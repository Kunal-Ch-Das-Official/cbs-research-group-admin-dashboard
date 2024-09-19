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
    <>
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
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Send reset password request
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
    </>
  );
};

export default ResetPasswordRequest;
