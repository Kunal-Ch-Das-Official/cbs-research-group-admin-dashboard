// Project: CBS Research Group Admin Dashboard
// Content: Change existing user password
// Date: 30/08/2024
import { useRef, useState } from "react";
import axios from "../../../../axios/axios";
import envConfig from "../../../../envConfig";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../../utils/custom-models/CustomModel";
import PasswordInput from "../../../utils/inputs/PasswordInput";
import YellowBtn from "../../../utils/buttons/YellowBtn";
import TransparentLink from "../../../utils/custom-link/TransparentLink";
import { FaExchangeAlt } from "react-icons/fa";
import { TbCalendarCancel } from "react-icons/tb";
const ChangeAdminPassword = () => {
  const changePasswordRef = useRef();
  const [newPassword, setNewpassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);
  const [changePasswordAlert, setChangePasswordAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  console.log(newPassword);
  console.log(newConfirmPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== newConfirmPassword) {
      setLoading(false);
      setPasswordValidationError(true);
      return null;
    } else {
      try {
        const newPasswordInfo = {
          adminUserPassword: newPassword,
          adminUserPassword_confirmation: newConfirmPassword,
        };
        const authToken = localStorage.getItem("auth-token");
        const adminToken = localStorage.getItem("admin-token");
        const token = authToken || adminToken;
        await axios
          .post(envConfig.changePasswordUrl, newPasswordInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setChangePasswordAlert({
              message: res.data.message,
              details: res.data.details,
              statusIcon: (
                <MdDownloadDone className="text-4xl font-bold text-green-600" />
              ),
              buttonColor: "bg-green-600",
            });
          });
      } catch (error) {
        setChangePasswordAlert({
          message: error.response.data.issue,
          details: error.response.data.details,
          statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
          buttonColor: "bg-red-600",
        });
      } finally {
        setLoading(false);
        setCustomAlert(true);
        changePasswordRef.current.reset();
      }
    }
  };
  const closeModelHandler = () => {
    setCustomAlert(false);
    setPasswordValidationError(false);
  };
  return (
    <>
      {loading === true && <LoadingSpinner />}
      {customAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide="flex"
          closeButton={closeModelHandler}
          statusIcon={changePasswordAlert.statusIcon}
          alertHead={changePasswordAlert.message}
          message1={changePasswordAlert.details}
          buttonColor={changePasswordAlert.buttonColor}
        />
      )}
      <section className="bg-gray-50 min-h-screen py-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 mt-12 lg:mt-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Change existing password
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                ref={changePasswordRef}
              >
                {/* PASSWORD FIELDS  */}
                <div id="password">
                  <PasswordInput
                    inputId={"changePassword"}
                    passwordLabel={"Password"}
                    inputValue={setNewpassword}
                    validationError={passwordValidationError}
                  />
                </div>
                {/* CONFIRM PASSWORD FIELDS  */}
                <div id="confirmPassword">
                  <PasswordInput
                    inputId={"changePasswordConfirm"}
                    passwordLabel={"Confirm password"}
                    inputValue={setNewConfirmPassword}
                    validationError={passwordValidationError}
                  />
                  {passwordValidationError === true ? (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      Password and confirm password are not same
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                {/* SUBMIT BUTTON  */}
                <div className="flex flex-col">
                  <YellowBtn
                    btnType={"submit"}
                    eventHandler={null}
                    btnText={"Change password"}
                    icon={<FaExchangeAlt />}
                  />

                  <TransparentLink
                    path={"/"}
                    linkText={"Cancel"}
                    icon={<TbCalendarCancel />}
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

export default ChangeAdminPassword;
