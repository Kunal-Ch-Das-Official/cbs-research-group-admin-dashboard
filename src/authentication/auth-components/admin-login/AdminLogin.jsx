// Project: CBS Research Group Admin Dashboard
// Content: Login setup
// Date: 30/08/2024

import { useRef, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import envConfig from "../../../../envConfig";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../axios/axios";
import CustomModel from "../../../utils/custom-models/CustomModel";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import { useAuth } from "../../auth-context/AuthContext";
const AdminLogin = () => {
  const loginFormRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [closeModel, setCloseModel] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberMeChecked, setRememberMeChecked] = useState(null);
  const [loginResponse, setLoginResponse] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  // Password show and hide handler
  const showHidePassword = () => {
    const adminUserPassword = document.getElementById("adminUserPassword");
    if (adminUserPassword.type == "password") {
      adminUserPassword.type = "text";
    } else {
      adminUserPassword.type = "password";
    }
  };

  // Submit handler
  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const emailValidate = adminEmail.split("@")[1];
    if (emailValidate === "gmail.com" || emailValidate === "outlook.com") {
      setEmailValidationError(false);
      const loginCredentials = {
        adminUserEmail: adminEmail,
        adminUserPassword: adminPassword,
      };
      try {
        await axios.post(envConfig.loginUrl, loginCredentials).then((res) => {
          setToken(res.data.authentication_sign);
          setLoginResponse({
            message: res.data.message,
            details: res.data.details,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
          if (isRememberMeChecked === true) {
            localStorage.setItem("auth-token", res.data.authentication_sign);
          } else {
            localStorage.setItem("admin-token", res.data.authentication_sign);
          }
          setIsLoading(false);
          setCloseModel(true);
          login();
        });
      } catch (error) {
        setLoginResponse({
          message: error.response.data.issue,
          details: error.response.data.details,
          statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
          buttonColor: "bg-red-600",
        });
        setToken(null);
        setCloseModel(true);
        setIsLoading(false);
      }
    } else {
      setEmailValidationError(true);
      setIsLoading(false);
    }
    loginFormRef.current.reset();
  };

  const closeModelHandler = () => {
    setCloseModel(false);
    if (token) {
      navigate("/admin-panel");
    }
  };
  return (
    <>
      {isLoading === true && <LoadingSpinner />}
      {
        <CustomModel
          buttonText={"Got it"}
          showOrHide={closeModel === true ? "flex" : "hidden"}
          closeButton={closeModelHandler}
          statusIcon={loginResponse.statusIcon}
          alertHead={loginResponse.message}
          message1={loginResponse.details}
          buttonColor={loginResponse.buttonColor}
        />
      }
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in as an admin
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleLogin}
                ref={loginFormRef}
              >
                {/* EMAIL FIELDS  */}
                <div id="email">
                  <label
                    htmlFor="adminUserEmail"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Admin email id
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
                {/* PASSWORD FIELDS  */}
                <div id="password">
                  <label
                    htmlFor="adminUserPassword"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Admin password
                  </label>

                  <div className="relative flex items-center">
                    <input
                      type="password"
                      name="adminUserPassword"
                      id="adminUserPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <IoEyeSharp
                      className="text-xl text-gray-600 absolute right-2 cursor-pointer"
                      onClick={showHidePassword}
                    />
                  </div>
                </div>

                {/* REMEMBER ME AND FORGOT PASSWORD BUTTON  */}
                <div className="flex items-center justify-between ">
                  <button
                    className="flex items-start cursor-pointer"
                    // onClick={memorizedAdminHandler}
                  >
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border 
                        cursor-pointer border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        onChange={(e) => setRememberMeChecked(e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-900 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                  </button>
                  <Link
                    to={"/forgot-password"}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* SUBMIT BUTTON  */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>

                {/* SEND REQUEST FOR BECOME ADMIN  */}
                <p className="text-sm font-base text-gray-900">
                  Don’t have admin access?{" "}
                  <Link
                    to={"/become-admin-request"}
                    className="font-medium text-blue-700 hover:underline"
                  >
                    Send registration request
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
