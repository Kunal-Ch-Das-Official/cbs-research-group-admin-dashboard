import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import envConfig from "../../../envConfig";
import { SiMinutemailer } from "react-icons/si";
import axios from "../../../axios/axios";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { MdCancelScheduleSend } from "react-icons/md";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useApp } from "../../app-context/useApp";
import PasswordInput from "../../utils/inputs/PasswordInput";
import EmailInput from "../../utils/inputs/EmailInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import TransparentLink from "../../utils/custom-link/TransparentLink";

const ApproveRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setisIdAccepted } = useApp();
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailValidatErr, setEmailValidatErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const mailSendHandler = async (e) => {
    e.preventDefault();
    const validateId = loginId.split("@")[1];
    if (validateId === "gmail.com" || validateId === "outlook.com") {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("auth-token");
        const adminToken = localStorage.getItem("admin-token");
        const token = authToken || adminToken;
        const loginCredentials = {
          loginId: loginId,
          loginPassword: loginPassword,
        };
        await axios
          .post(
            `${envConfig.becomeAdminReqApprovedUrl}/${id}`,
            loginCredentials,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setisIdAccepted(id);
            setAlertMessage({
              message: res.data.message,
              details: res.data.notification,
              statusIcon: (
                <MdDownloadDone className="text-4xl font-bold text-green-600" />
              ),
              buttonColor: "bg-green-600",
            });
          });
      } catch (error) {
        setAlertMessage({
          message: error.response.data.issue,
          details: error.response.data.details,
          statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
          buttonColor: "bg-red-600",
        });
      } finally {
        setLoading(false);
        setShowAlert(true);
      }
    } else {
      setEmailValidatErr(true);
    }
  };
  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-request");
  };
  return (
    <main className="min-h-screen py-10">
      {loading === true && <LoadingSpinner />}
      {showAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide="flex"
          closeButton={closeModelHandler}
          statusIcon={alertMessage.statusIcon}
          alertHead={alertMessage.message}
          message1={alertMessage.details}
          buttonColor={alertMessage.buttonColor}
        />
      )}
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 mt-12 lg:mt-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Send login credentials to requested user
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={mailSendHandler}
                // ref={changePasswordRef}
              >
                {/* LOGIN EMAIL ID FIELDS  */}

                <EmailInput
                  inputLabel={"New Admin User Login ID"}
                  defaultEmail={null}
                  emailValue={setLoginId}
                  emailValidationError={emailValidatErr}
                  placeHolderText={"your_name@email.com"}
                  isRequired={true}
                  fieldId={"newLoginId"}
                />
                {/* CONFIRM PASSWORD FIELDS  */}

                <PasswordInput
                  inputId={"newAdminUsersPassword"}
                  passwordLabel={"New Admin User Login Password"}
                  inputValue={setLoginPassword}
                  validationError={null}
                />

                {/* SUBMIT BUTTON  */}
                <div className="flex flex-col">
                  <YellowBtn
                    btnType={"submit"}
                    eventHandler={null}
                    btnText={"Compose This Email"}
                    icon={<SiMinutemailer />}
                  />

                  <TransparentLink
                    path={"/admin-panel/manage-request"}
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

export default ApproveRequest;
