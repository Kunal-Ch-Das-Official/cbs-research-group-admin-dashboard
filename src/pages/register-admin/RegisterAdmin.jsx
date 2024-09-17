import { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { MdRememberMe } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import TacModal from "../../utils/terms-and-conditions/TacModal";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import CustomModel from "../../utils/custom-models/CustomModel";
import EmailInput from "../../utils/inputs/EmailInput";

const RegisterAdmin = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [emailValidationErr, setEmailValidationErr] = useState(false);
  const [passwordValidateErr, setPasswordValidateErr] = useState(false);
  const [accountTypeAdmin, setAccountTypeAdmin] = useState(false);
  const [accountTypeMember, setAccountTypeMember] = useState(false);
  const [termsNotFollow, setTermsNotFollow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAndCond, setTermsAndCond] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [registerResponse, setRegisterResponse] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const handlerTermsAndConditonShow = () => {
    setShowTerms(true);
  };

  const handleColorSwitch = (id) => {
    if (id === 1) {
      setAccountTypeAdmin(true);
      setAccountTypeMember(false);
    }
    if (id === 2) {
      setAccountTypeMember(true);
      setAccountTypeAdmin(false);
    }
  };

  const showHidePassword = (id) => {
    if (id === 1) {
      const Password = document.getElementById("Password");
      Password.type === "password"
        ? (Password.type = "text")
        : (Password.type = "password");
    }
    if (id === 2) {
      const confirmPassword = document.getElementById("password_confirm");
      confirmPassword.type === "password"
        ? (confirmPassword.type = "text")
        : (confirmPassword.type = "password");
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    let isValid = true;

    const validateEmail = userEmail.split("@")[1];
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      setEmailValidationErr(false);
    } else {
      setEmailValidationErr(true);
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordValidateErr(true);
      isValid = false;
    } else {
      setPasswordValidateErr(false);
    }

    if (!termsAndCond) {
      setTermsNotFollow(true);
      isValid = false;
    } else {
      setTermsNotFollow(false);
    }

    if (isValid) {
      try {
        const fullName = firstName + " " + lastName;
        const userInfo = {
          adminUserName: fullName,
          adminUserEmail: userEmail,
          adminUserPassword: password,
          adminUserPassword_confirmation: confirmPassword,
          termsAndConditions: termsAndCond,
        };

        const res = await axios.post(envConfig.registerAdminUrl, userInfo);
        setRegisterResponse({
          message: res.data.message,
          details: res.data.details,
          statusIcon: (
            <MdDownloadDone className="text-4xl font-bold text-green-600" />
          ),
          buttonColor: "bg-green-600",
        });
      } catch (error) {
        setRegisterResponse({
          message: error.response.data.issue,
          details: error.response.data.details,
          statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
          buttonColor: "bg-red-600",
        });
      } finally {
        setLoading(false);
        setOpenModal(true);
        setFirstName("");
        setLastName("");
        setUserEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      setLoading(false);
    }
  };

  const closeModelHandler = () => {
    setOpenModal(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {showTerms && <TacModal closeTerms={() => setShowTerms(false)} />}
      {openModal && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide="flex"
          closeButton={closeModelHandler}
          statusIcon={registerResponse.statusIcon}
          alertHead={registerResponse.message}
          message1={registerResponse.details}
          buttonColor={registerResponse.buttonColor}
        />
      )}
      <section className="bg-gray-50 min-h-screen mt-12">
        <div className="flex justify-center min-h-screen">
          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                Get your free account now.
              </h1>
              <p className="mt-4 text-gray-500">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>
              <div className="mt-6">
                <h1 className="text-gray-500">Select type of account</h1>
                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <button
                    onClick={() => handleColorSwitch(1)}
                    className={`flex justify-center w-full px-6 py-1 rounded-lg md:w-auto md:mx-2 focus:outline-none
                   ${
                     accountTypeAdmin
                       ? "text-black bg-[#f7ca00] hover:bg-[#c1a630]"
                       : " text-gray-500 border border-gray-500 hover:bg-gray-100"
                   }`}
                  >
                    <GrUserAdmin className="text-xl items-center" />
                    <span className="mx-2">Admin</span>
                  </button>
                  <button
                    onClick={() => handleColorSwitch(2)}
                    className={`flex justify-center w-full px-6 py-1 mt-4 rounded-lg md:mt-0 md:w-auto md:mx-2 
                    ${
                      accountTypeMember
                        ? "text-black bg-[#f7ca00] hover:bg-[#c1a630]"
                        : " text-gray-500 border border-gray-500 hover:bg-gray-100 "
                    }`}
                  >
                    <MdRememberMe className="text-xl items-center" />
                    <span className="mx-2">Member</span>
                  </button>
                  <div className="flex text-center items-start cursor-pointer ml-4 border border-gray-300 py-1 px-2 bg-gray-300 mt-3 md:mt-0 lg:mt-0 rounded-xl">
                    <div className="flex items-center h-5 text-center">
                      <div className="mr-3 text-lg">
                        <label
                          htmlFor="termsAndConditions"
                          className="text-gray-900 cursor-pointer text-center "
                        >
                          <button
                            type="button"
                            className="hover:underline text-blue-900 font-semibold text-center"
                            onClick={handlerTermsAndConditonShow}
                          >
                            Terms and conditions
                          </button>
                        </label>
                      </div>
                      <input
                        id="termsAndConditions"
                        aria-describedby="termsAndConditions"
                        type="checkbox"
                        className="w-4 h-4 border 
                        cursor-pointer border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        onClick={() => setTermsAndCond(!termsAndCond)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleRegistration}>
                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      First Name
                    </label>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      value={firstName}
                      placeholder="John"
                      id="firstName"
                      className="block w-full px-5 py-2 mt-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Last name
                    </label>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                      placeholder="Doe"
                      id="lastName"
                      className="block w-full px-5 py-2 mt-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <EmailInput
                    inputLabel={"Email address"}
                    defaultEmail={null}
                    emailValue={setUserEmail}
                    emailValidationError={emailValidationErr}
                    placeHolderText={"your_name@email.com"}
                  />
                  <div>
                    <label
                      htmlFor="Password"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <div className="relative flex items-center mt-2">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Enter Password"
                        id="Password"
                        className={`block w-full px-5 py-2 bg-white border rounded-md placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          passwordValidateErr
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-1 bg-gray-100 w-10 p-1 rounded-full hover:bg-gray-200"
                        onClick={() => showHidePassword(1)}
                      >
                        <FaEye />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password_confirm"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Confirm password
                    </label>
                    <div className="relative flex items-center mt-2">
                      <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        type="password"
                        placeholder="Enter Password"
                        id="password_confirm"
                        className={`block w-full px-5 py-2 bg-white border rounded-md placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          passwordValidateErr
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-1 bg-gray-100 w-10 p-1 rounded-full hover:bg-gray-200"
                        onClick={() => showHidePassword(2)}
                      >
                        <FaEye />
                      </button>
                    </div>
                    {passwordValidateErr && (
                      <span className="text-red-600">
                        Passwords do not match
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize rounded-md bg-[#f7ca00]
                     hover:bg-[#c1a630] focus:outline-none focus:bg-[#f7ca00]"
                  >
                    Create account
                  </button>
                </div>
              </form>
              {termsNotFollow && (
                <span className="text-red-600">
                  Please agree to the terms and conditions
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterAdmin;
