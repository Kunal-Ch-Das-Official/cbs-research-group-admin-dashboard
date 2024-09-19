import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import TextInput from "../../utils/inputs/TextInput";
import FileInput from "../../utils/inputs/FileInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import { MdAssignmentAdd } from "react-icons/md";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
const UploadLabInstrument = () => {
  const navigate = useNavigate();
  const labInstrumentFormRef = useRef();
  const [instrumentName, setInstrumentName] = useState("");
  const [aboutInstrument, setAboutInstrument] = useState("");
  const [instrumentImage, setInstrumentImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });
  const handleSubmition = async (e) => {
    e.preventDefault();
    const instrumentForm = new FormData();

    instrumentForm.append("instrumentName", instrumentName);
    instrumentForm.append("instrumentImage", instrumentImage);
    instrumentForm.append("description", aboutInstrument);

    try {
      setLoading(true);
      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;
      await axios
        .post(envConfig.labInstrumntsUrl, instrumentForm, {
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
      setCustomAlert({
        message: error.response.data.details,
        details: error.response.data.issue,
        statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
        buttonColor: "bg-red-600",
      });
    } finally {
      setLoading(false);
      setShowAlert(true);
      labInstrumentFormRef.current.reset();
      setInstrumentImage(null);
    }
  };
  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-lab-instruments");
  };
  return (
    <main className="bg-gray-50">
      <SectionHeading
        heading={"Manage All Details"}
        subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
      />
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
      <div className="flex justify-center item-center py-10">
        <div className="w-full md:w-1/2 lg:w-1/2 m-1 mx-auto">
          <form
            className="w-full bg-white shadow-md p-6"
            onSubmit={handleSubmition}
            ref={labInstrumentFormRef}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6">
                <TextInput
                  inputLabel={"Instruement name"}
                  defaultText={null}
                  textValue={setInstrumentName}
                  placeHolderText={"Instruement Name"}
                  isRequired={true}
                  fieldId={"labInstrumentUpload"}
                />
              </div>
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase text-gray-500 text-sm font-bold mb-2"
                  htmlFor="instrumentDetails"
                >
                  Instruement details
                </label>
                <textarea
                  id="instrumentDetails"
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border pl-2 pt-2 border-gray-400 rounded-lg"
                  placeholder="Write something about instrument...."
                  required
                  onChange={(e) => setAboutInstrument(e.target.value)}
                ></textarea>
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <YellowBtn
                  btnType={"submit"}
                  eventHandler={null}
                  btnText={"Add Instrument"}
                  icon={<MdAssignmentAdd />}
                />
              </div>

              <div className="flex items-center justify-center w-full mb-4">
                <FileInput
                  givenFile={instrumentImage}
                  fileName={instrumentImage && instrumentImage.name}
                  fileSize={instrumentImage && instrumentImage.size}
                  setFile={setInstrumentImage}
                  isRequired={true}
                  previousImage={null}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UploadLabInstrument;
