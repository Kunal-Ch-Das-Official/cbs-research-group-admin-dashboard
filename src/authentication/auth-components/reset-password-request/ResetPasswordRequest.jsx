// Project: CBS Research Group Admin Dashboard
// Content: Send email for password reset
// Date: 30/08/2024

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../axios/axios";
import envConfig from "../../../../envConfig";
import { MdFileDownloadDone } from "react-icons/md";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../../utils/custom-models/CustomModel";
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
  // Password show and hide handler

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
                <div id="email">
                  <label
                    htmlFor="adminUserEmail"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Authorized email
                  </label>
                  <input
                    type="email"
                    name="adminUserEmail"
                    id="adminUserEmail"
                    className="bg-gray-50 border lowercase border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                  {emailValidationError === true ? (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      Please provide a valid email
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
                {/* ACTION BUTTONS  */}
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Send request
                  </button>

                  <Link
                    to={"/"}
                    className="mt-4 w-full text-gray-700 bg-white hover:bg-gray-100 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                        rounded-lg text-sm px-5 py-2.5 text-center
                        border border-gray-400"
                  >
                    Cancel
                  </Link>
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
