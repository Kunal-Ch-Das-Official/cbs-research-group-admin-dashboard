import cbsLogo from "../../assets/CBS Research Group Logo-resized.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useApp } from "../../app-context/useApp";
import TextEditor from "../../utils/text-editor/TextEditor";
import TextInput from "../../utils/inputs/TextInput";
const SendApplicationResponse = () => {
  const { id } = useParams();
  const { setisContactResSend } = useApp();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const responseSendingHandler = async (e) => {
    e.preventDefault();
    const emailData = {
      subject: subject,
      emailBody: emailBody,
    };
    const authToken = localStorage.getItem("auth-token") || null;
    const adminToken = localStorage.getItem("admin-token") || null;
    const token = authToken || adminToken;
    try {
      setLoading(true);
      await axios
        .post(`${envConfig.contactApplicationResUrl}/${id}`, emailData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setisContactResSend(id);
          setCustomAlert({
            message: res.data.message,
            details: res.data.details,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
        });
    } catch (error) {
      console.log(error);
      setCustomAlert({
        message: error.message,
        details: error.response.data.issue,
        statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
        buttonColor: "bg-red-600",
      });
    } finally {
      setLoading(false);
      setShowAlert(true);
      setSubject("");
      setEmailBody("");
    }
  };

  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-contacts");
  };

  return (
    <>
      {loading === true && <LoadingSpinner />}
      {showAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide={showAlert === true ? "flex" : "hidden"}
          closeButton={closeModelHandler}
          statusIcon={customAlert.statusIcon}
          alertHead={customAlert.message}
          message1={customAlert.details}
          buttonColor={customAlert.buttonColor}
        />
      )}
      <section className="pt-32">
        <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={cbsLogo} alt="cbsLogo" />
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
              Send Response
            </h3>

            <p className="mt-1 text-center text-gray-500">
              Send response to the coresponding user application
            </p>

            <form onSubmit={responseSendingHandler}>
              <TextInput
                inputLabel={""}
                defaultText={null}
                textValue={setSubject}
                placeHolderText={"Write email subject"}
                isRequired={true}
              />

              <div className="w-full mb-4 mt-6 border border-gray-100 bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                  <TextEditor
                    editorLabel={"Email Body"}
                    eventValue={emailBody}
                    eventHandler={setEmailBody}
                  />
                </div>
                <div className="flex items-center px-3 py-2 border-t ">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg f  hover:bg-blue-800"
                  >
                    Send Response
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin-panel/preview-contacts/${id}`)
                    }
                    className="ml-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black
                     bg-gray-300 rounded-lg f  hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SendApplicationResponse;
