// Project: CBS Research Group Admin Dashboard
// Content: Change existing user password
// Date: 30/08/2024
import { useRef, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import axios from "../../../../axios/axios";
import envConfig from "../../../../envConfig";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../../utils/custom-models/CustomModel";
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
  // Password show and hide handler
  const showHidePassword = (id) => {
    const getPassword = document.getElementById("adminUserPassword");
    const getConfirmPassword = document.getElementById(
      "adminUserPassword_confirmation"
    );
    if (id === 1) {
      getPassword.type === "password"
        ? (getPassword.type = "text")
        : (getPassword.type = "password");
    }
    if (id === 2) {
      getConfirmPassword.type === "password"
        ? (getConfirmPassword.type = "text")
        : (getConfirmPassword.type = "password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== newConfirmPassword) {
      setPasswordValidationError(true);
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
      <section className="bg-gray-50">
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
                  <label
                    htmlFor="adminUserPassword"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>

                  <div className="relative flex items-center">
                    <input
                      type="password"
                      name="adminUserPassword"
                      id="adminUserPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onChange={(e) => setNewpassword(e.target.value)}
                    />
                    <IoEyeSharp
                      className="text-xl text-gray-600 absolute right-2 cursor-pointer"
                      onClick={() => showHidePassword(1)}
                    />
                  </div>
                </div>
                {/* CONFIRM PASSWORD FIELDS  */}
                <div id="confirmPassword">
                  <label
                    htmlFor="adminUserPassword_confirmation"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>

                  <div className="relative flex items-center">
                    <input
                      type="password"
                      name="adminUserPassword_confirmation"
                      id="adminUserPassword_confirmation"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onChange={(e) => setNewConfirmPassword(e.target.value)}
                    />
                    <IoEyeSharp
                      className="text-xl text-gray-600 absolute right-2 cursor-pointer"
                      onClick={() => showHidePassword(2)}
                    />
                  </div>
                  {passwordValidationError === true ? (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      Password and confirm password are not same
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                {/* SUBMIT BUTTON  */}
                <button
                  type="submit"
                  className="w-full text-white bg-[#f7ca00] hover:bg-[#c1a630] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

export default ChangeAdminPassword;
