/* 
Project: CBS Research Group Admin Dashboard
Content: Password reset component
Date: 29/08/2024 
*/
import { useRef, useState } from "react";
import envConfig from "../../../../envConfig";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../../utils/custom-models/CustomModel";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../../axios/axios";
import PasswordInput from "../../../utils/inputs/PasswordInput";
const ResetPassword = () => {
  const navigate = useNavigate();
  const resetFormRef = useRef();
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);
  const [operationSuccess, setOperationSuccess] = useState(false);
  const [loginResponse, setLoginResponse] = useState({
    message: null,
    statusIcon: null,
    buttonColor: null,
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Check if passwords match
    if (newPassword !== newConfirmPassword) {
      setPasswordValidationError(true);
      setLoading(false);
      return; // Exit the function early if passwords do not match
    } else {
      setPasswordValidationError(false);
    }

    try {
      await axios
        .post(`${envConfig.resetPassword}/${id}/${token}`, {
          adminUserPassword: newPassword,
          adminUserPassword_confirmation: newConfirmPassword,
        })
        .then((res) => {
          if (res.status == 200) {
            setOperationSuccess(true);
          } else {
            setOperationSuccess(false);
          }
          setLoginResponse({
            message: res.data.details,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
          setLoading(false);
          setCustomAlert(true);
        });
    } catch (error) {
      setLoginResponse({
        message: error.message,
        statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
        buttonColor: "bg-red-600",
      });
      setLoading(false);
      setCustomAlert(true);
    }
    resetFormRef.current.reset();
  };
  const closeModelHandler = () => {
    setCustomAlert(false);
    operationSuccess === true ? navigate("/sign-in") : navigate(null);
  };

  return (
    <>
      {loading === true && <LoadingSpinner />}
      {
        <CustomModel
          buttonText={"Got it"}
          showOrHide={customAlert === true ? "flex" : "hidden"}
          closeButton={closeModelHandler}
          statusIcon={loginResponse.statusIcon}
          alertHead={loginResponse.message}
          buttonColor={loginResponse.buttonColor}
        />
      }
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Reset forgotten password
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                ref={resetFormRef}
              >
                {/* PASSWORD FIELDS */}
                <div id="confirmPassword">
                  <PasswordInput
                    inputId={"adminUserPassword"}
                    passwordLabel={"Password"}
                    inputValue={setNewPassword}
                  />
                </div>
                {/* CONFIRM PASSWORD FIELDS */}

                <div id="confirmPassword">
                  <PasswordInput
                    inputId={"confirmPassword"}
                    passwordLabel={"Confirm password"}
                    inputValue={setNewConfirmPassword}
                  />

                  {passwordValidationError && (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      Password and confirm password are not the same
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Change password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
