// Project: CBS Research Group Admin Dashboard
// Content: Login setup
// Date: 30/08/2024

import { useRef, useState } from "react";
import envConfig from "../../../../envConfig";
import { Link } from "react-router-dom";
import axios from "../../../../axios/axios";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../../utils/custom-models/CustomModel";
import TacModal from "../../../utils/terms-and-conditions/TacModal";
const SendRegistrationRequest = () => {
  const userMessageRef = useRef();

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [closeModel, setCloseModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTacPopup, setShowTacPopup] = useState(false);
  const [inputValueLengthDisplayer, setInputValueLengthDisplayer] = useState(0);
  const [serverResponse, setServerResponse] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const handleMesageOnChange = (e) => {
    const messageValue = e.target.value;
    setInputValueLengthDisplayer(e.target.value);
    if (messageValue.length >= 150) {
      e.target.value = messageValue.slice(0, 150);
      setUserMessage(e.target.value);
    }
  };

  const handlerMessageSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const emailValidation = userEmail.split("@")[1];
    if (emailValidation === "gmail.com" || emailValidation === "outlook.com") {
      setEmailValidationError(false);
      try {
        const userInfo = {
          reqUserName: userName,
          reqUserEmail: userEmail,
          message: userMessage,
          termsAndConditions: termsAndConditions,
        };
        await axios
          .post(envConfig.becomeAdminRequestUrl, userInfo)
          .then((res) => {
            setServerResponse({
              message: res.data.details,
              details:
                "Thanks for your interest. We will connect with you very soon through your given email.",
              statusIcon: (
                <MdDownloadDone className="text-4xl text-green-500 font-bold" />
              ),
              buttonColor: "bg-green-500",
            });
            setIsLoading(false);
            setCloseModel(true);
          });
      } catch (error) {
        setServerResponse({
          message: error.response.data.details,
          details: error.response.data.issue,
          statusIcon: <FcCancel className="text-4xl text-red-500 font-bold" />,
          buttonColor: "bg-red-500",
        });
      }
      setIsLoading(false);
      setCloseModel(true);
    }

    userMessageRef.current.reset();
  };

  const closeModelHandler = () => setCloseModel(false);
  const handlerTermsAndConditonShow = () => {
    setShowTacPopup(true);
  };

  return (
    <>
      {showTacPopup === true && (
        <TacModal closeTerms={() => setShowTacPopup(false)} />
      )}
      {isLoading === true && <LoadingSpinner />}
      {
        <CustomModel
          buttonText={"Got it"}
          showOrHide={closeModel === true ? "flex" : "hidden"}
          closeButton={closeModelHandler}
          statusIcon={serverResponse.statusIcon}
          alertHead={serverResponse.message}
          message1={serverResponse.details}
          buttonColor={serverResponse.buttonColor}
        />
      }

      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Send admin registration request
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handlerMessageSubmit}
                ref={userMessageRef}
              >
                {/* USER NAME FIELDS  */}
                <div id="userName">
                  <label
                    htmlFor="reqUserName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="reqUserName"
                    id="reqUserName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="John doe"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                {/* USER EMAI FIELDS  */}
                <div id="emailId">
                  <label
                    htmlFor="reqUserEmail"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email id
                  </label>
                  <input
                    type="email"
                    name="reqUserEmail"
                    id="reqUserEmail"
                    className="bg-gray-50 border  border-gray-300 lowercase text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="adress@company.com"
                    required
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  {emailValidationError === true ? (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      Please provide a valid email
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                <div id="message">
                  <label
                    htmlFor="reqUserMessage"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your message
                  </label>
                  <textarea
                    type="text"
                    name="reqUserMessage"
                    id="reqUserMessage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter your message"
                    onChange={handleMesageOnChange}
                  />
                  {inputValueLengthDisplayer ? (
                    <p className="text-yellow-700 text-right">
                      <span className="text-sm mr-1">Character left:</span>
                      <span className="text-gray-600 text-sm">
                        {150 - inputValueLengthDisplayer.length + 1}
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {/* TERMS AND CONDITIONS  */}
                <div className="flex items-start cursor-pointer">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAndConditions"
                      aria-describedby="termsAndConditions"
                      type="checkbox"
                      className="w-4 h-4 border 
                        cursor-pointer border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required
                      onChange={(e) => setTermsAndConditions(e.target.checked)}
                    />
                  </div>

                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="termsAndConditions"
                      className="text-gray-900 cursor-pointer "
                    >
                      <button
                        type="button"
                        className="hover:underline"
                        onClick={handlerTermsAndConditonShow}
                      >
                        Terms and conditions
                      </button>
                    </label>
                  </div>
                </div>

                {/* SUBMIT BUTTON  */}
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Send Message
                  </button>
                  <Link
                    to={"/"}
                    className="mt-4 w-full text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-gray-400"
                  >
                    Back
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

export default SendRegistrationRequest;
