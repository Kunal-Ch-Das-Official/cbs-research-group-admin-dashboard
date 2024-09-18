import { Calendar } from "primereact/calendar";
import { useRef, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../utils/text-editor/TextEditor";
import EmailInput from "../../utils/inputs/EmailInput";
import TextInput from "../../utils/inputs/TextInput";
import FileInput from "../../utils/inputs/FileInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import { MdDriveFolderUpload } from "react-icons/md";
const UploadDoctorateAlumni = () => {
  const navigate = useNavigate();
  const doctorateAlumniSubmitionRef = useRef();
  const [alumniName, setAlumniName] = useState("");
  const [passoutYear, setPassoutYear] = useState(null);
  const [graduateFrom, setGraduateFrom] = useState("");
  const [mastersDoneFrom, setMastersDoneFrom] = useState("");
  const [alumniDetails, setAlumniDetails] = useState("");
  const [alumniImage, setAlumniImage] = useState(null);
  const [alumniEmailId, setAlumniEmailId] = useState("");
  const [alumniPhoneNo, setAlumniPhoneNo] = useState("");
  const [alumniGoogleSchollarUrl, setAlumniGoogleSchollarUrl] = useState("");
  const [alumniResearchGateUrl, setAlumniResearchGateUrl] = useState("");

  // Functional State
  const [emailValidatErr, setEmailValidatErr] = useState(false);
  const [phoneNumberValidatErr, setPhoneNumberValidatErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const doctorateAlumniSubmitionHandler = async (e) => {
    e.preventDefault();
    const dateObject = new Date(passoutYear);
    const year = dateObject.getFullYear();
    const stringifyYear = year.toString();

    let validation = true;
    const validateEmail = alumniEmailId.split("@")[1];
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      validation = true;
    } else {
      setEmailValidatErr(true);
      validation = false;
    }

    if (alumniPhoneNo.length === 10) {
      validation = true;
    } else {
      setPhoneNumberValidatErr(true);
      validation = false;
    }

    if (validation === true) {
      setLoading(true);
      const doctorateAlumniInfo = new FormData();
      doctorateAlumniInfo.append("alumniName", alumniName);
      doctorateAlumniInfo.append("profilePicture", alumniImage);
      doctorateAlumniInfo.append("emailId", alumniEmailId);
      doctorateAlumniInfo.append("phoneNumber", alumniPhoneNo);
      doctorateAlumniInfo.append("bscDoneFrom", graduateFrom);
      doctorateAlumniInfo.append("mscDoneFrom", mastersDoneFrom);
      doctorateAlumniInfo.append("researchGateId", alumniResearchGateUrl);
      doctorateAlumniInfo.append("googleScholarId", alumniGoogleSchollarUrl);
      doctorateAlumniInfo.append("yearOfPassout", stringifyYear);
      doctorateAlumniInfo.append("details", alumniDetails);

      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;

      try {
        await axios
          .post(envConfig.doctorateAlumniUrl, doctorateAlumniInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
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
        doctorateAlumniSubmitionRef.current.reset();
        setPassoutYear(null);
        setAlumniDetails("");
        setAlumniImage(null);
        setPhoneNumberValidatErr(false);
        setEmailValidatErr(false);
      }
    }
  };
  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-doctorate-alumni");
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
      <main className="bg-gray-50 min-h-screen pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-2xl text-gray-500 font-bold">
            Doctorate Alumni Information Upload
          </h1>
          <p className="flex flex-wrap flex-col mx-20 lg:mx-40">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            eveniet ipsam dolorum architecto quod aliquam possimus nemo
            excepturi vitae vero illum non expedita cumque repellat velit
            consequatur, eos cupiditate minus.
          </p>
        </div>

        <form
          className="grid grid-cols-1 lg:grid-cols-2 pt-20"
          onSubmit={doctorateAlumniSubmitionHandler}
          ref={doctorateAlumniSubmitionRef}
        >
          <div className=" mt-4" id="columnOne">
            <div className="py-0 px-4 mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput
                  inputLabel={"Alumni Name"}
                  defaultText={null}
                  textValue={setAlumniName}
                  placeHolderText={"Enter doctorate alumni name"}
                  isRequired={true}
                />
                <div>
                  <label
                    htmlFor="Calendar"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Passout Year
                  </label>

                  <div
                    className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 inline-flex items-center"
                  >
                    <MdDateRange className="text-2xl mr-2 text-gray-600" />
                    <div className="bg-white outline-none ">
                      <Calendar
                        inputId="Calendar"
                        value={passoutYear}
                        onChange={(e) => setPassoutYear(e.value)}
                        view="year"
                        dateFormat="yy"
                        placeholder="Passout year"
                        className="outline-none opacity-1 passoutYear"
                      />
                    </div>
                  </div>
                </div>

                <TextInput
                  inputLabel={"Graduate from"}
                  defaultText={null}
                  textValue={setGraduateFrom}
                  placeHolderText={"Bachelor's complete from"}
                  isRequired={true}
                />

                <TextInput
                  inputLabel={"Masters done from"}
                  defaultText={null}
                  textValue={setMastersDoneFrom}
                  placeHolderText={"Master's complete from"}
                  isRequired={true}
                />
                <div className="sm:col-span-2 mt-2">
                  <TextEditor
                    editorLabel={"Alumni details"}
                    eventValue={alumniDetails}
                    eventHandler={setAlumniDetails}
                  />
                </div>
              </div>
              <YellowBtn
                btnType={"submit"}
                eventHandler={null}
                btnText={"Upload Alumni Details"}
                icon={<MdDriveFolderUpload />}
              />
            </div>
          </div>

          <div
            className="mt-2 lg:mt-24 lg:order-last order-first"
            id="columnTwo"
          >
            <div className="py-4 px-4 mx-auto max-w-2xl">
              <FileInput
                givenFile={alumniImage}
                fileName={alumniImage && alumniImage.name}
                fileSize={alumniImage && alumniImage.size}
                setFile={setAlumniImage}
                isRequired={true}
                previousImage={null}
              />

              <EmailInput
                inputLabel={"Email Id"}
                defaultEmail={null}
                emailValue={setAlumniEmailId}
                emailValidationError={emailValidatErr}
                placeHolderText={"your_name@email.com"}
                isRequired={false}
              />
              <div className="w-full mt-2" id="PhoneNumber">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter  master alumni phone number "
                  required
                  onChange={(e) => setAlumniPhoneNo(e.target.value)}
                />
                {phoneNumberValidatErr === true ? (
                  <p className="text-red-600 text-xs">
                    Phone number is not valid.
                  </p>
                ) : (
                  ""
                )}
              </div>

              <TextInput
                inputLabel={"Research Gate Id"}
                defaultText={null}
                textValue={setAlumniResearchGateUrl}
                placeHolderText={"Research Gate Url"}
                isRequired={true}
              />
              <TextInput
                inputLabel={"Google Schollar Id"}
                defaultText={null}
                textValue={setAlumniGoogleSchollarUrl}
                placeHolderText={"Google Schollar Url"}
                isRequired={true}
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default UploadDoctorateAlumni;
