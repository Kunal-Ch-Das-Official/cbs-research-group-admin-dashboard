import cbsLogo from "../../assets/CBS Research Group Logo-resized.png";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import TextEditor from "../../utils/text-editor/TextEditor";
import TextInput from "../../utils/inputs/TextInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import { RiContactsBookUploadFill } from "react-icons/ri";

const UploadProject = () => {
  const projectformRef = useRef();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const projectUploadHandler = async (e) => {
    e.preventDefault();
    const projectdata = {
      projectName: projectName,
      description: projectDescription,
      projectStatus: projectStatus,
    };
    const authToken = localStorage.getItem("auth-token") || null;
    const adminToken = localStorage.getItem("admin-token") || null;
    const token = authToken || adminToken;
    try {
      setLoading(true);
      await axios
        .post(envConfig.projectsUrl, projectdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
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
      projectformRef.current.reset();
    }
  };

  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-projects");
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
      <section className="pt-32 bg-gray-50">
        <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={cbsLogo} alt="cbsLogo" />
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
              Project Upload
            </h3>

            <p className="mt-1 text-center text-gray-500">
              Send response to the coresponding user application
            </p>

            <form onSubmit={projectUploadHandler} ref={projectformRef}>
              <div className="w-full mt-4">
                <TextInput
                  inputLabel={""}
                  defaultText={null}
                  textValue={setProjectName}
                  placeHolderText={"Enter the project name"}
                  isRequired={true}
                  fieldId={"projectNameUpload"}
                />
              </div>

              <div className="max-w-full mx-auto my-4 bg-white">
                <label
                  htmlFor="projectStatus"
                  className=" mb-2 text-sm font-medium text-gray-900 hidden"
                >
                  Select an option
                </label>
                <select
                  onChange={(e) => setProjectStatus(e.target.value)}
                  id="projectStatus"
                  className="bg-white border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option selected>Choose project status</option>
                  <option value="on-going">On-going</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="w-full mb-4 mt-6 border border-gray-100 bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                  <TextEditor
                    editorLabel={"About Project"}
                    eventValue={projectDescription}
                    eventHandler={setProjectDescription}
                  />
                </div>
                <div className="flex items-center px-3 py-2 border-t ">
                  <YellowBtn
                    btnType={"submit"}
                    eventHandler={null}
                    btnText={"Upload New Project"}
                    icon={<RiContactsBookUploadFill />}
                  />

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

export default UploadProject;
