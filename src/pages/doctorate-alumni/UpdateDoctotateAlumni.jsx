import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
import TextEditor from "../../utils/text-editor/TextEditor";
import EmailInput from "../../utils/inputs/EmailInput";
import TextInput from "../../utils/inputs/TextInput";
const UpdateDoctotateAlumni = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState(null);
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

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.doctorateAlumniUrl,
        id
      );
      response && setPreviousData(response);
    };
    fetchReqData();
  }, [id]);

  const updateMasterAlumniHandler = async (e) => {
    e.preventDefault();
    const dateObject = new Date(passoutYear);
    const year = dateObject.getFullYear();
    const stringifyYear = year.toString();

    setLoading(true);
    const updatedDoctorateAlumniInfo = new FormData();
    updatedDoctorateAlumniInfo.append("alumniName", alumniName);
    updatedDoctorateAlumniInfo.append("profilePicture", alumniImage);
    updatedDoctorateAlumniInfo.append("emailId", alumniEmailId);
    updatedDoctorateAlumniInfo.append("phoneNumber", alumniPhoneNo);
    updatedDoctorateAlumniInfo.append("bscDoneFrom", graduateFrom);
    updatedDoctorateAlumniInfo.append("mscDoneFrom", mastersDoneFrom);
    updatedDoctorateAlumniInfo.append("researchGateId", alumniResearchGateUrl);
    updatedDoctorateAlumniInfo.append(
      "googleScholarId",
      alumniGoogleSchollarUrl
    );
    updatedDoctorateAlumniInfo.append("yearOfPassout", stringifyYear);
    updatedDoctorateAlumniInfo.append("details", alumniDetails);

    const authToken = localStorage.getItem("auth-token");
    const adminToken = localStorage.getItem("admin-token");
    const token = authToken || adminToken;

    try {
      await axios
        .patch(
          `${envConfig.doctorateAlumniUrl}/${id}`,
          updatedDoctorateAlumniInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
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

      setPassoutYear(null);
      setAlumniDetails("");
      setAlumniImage(null);
      setPhoneNumberValidatErr(false);
      setEmailValidatErr(false);
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
      {previousData ? (
        <main className="bg-gray-50 min-h-screen pt-20 pb-12">
          <div className="text-center">
            <h1 className="text-2xl text-gray-500 font-bold">
              Doctorate Alumni Information Update
            </h1>
            <p className="flex flex-wrap flex-col mx-20 lg:mx-40">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              eveniet ipsam dolorum architecto quod aliquam possimus nemo
              excepturi vitae vero illum non expedita cumque repellat velit
              consequatur, eos cupiditate minus.
            </p>
          </div>

          <form
            className="grid grid-cols-1 lg:grid-cols-2"
            onSubmit={updateMasterAlumniHandler}
          >
            <div className=" mt-2" id="columnOne">
              <div className="py-0 px-4 mx-auto max-w-2xl">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <TextInput
                    inputLabel={"Alumni Name"}
                    defaultText={previousData.alumniName}
                    textValue={setAlumniName}
                    placeHolderText={null}
                    isRequired={false}
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
                          id="minmax"
                          value={passoutYear}
                          onChange={(e) => setPassoutYear(e.value)}
                          view="year"
                          dateFormat="yy"
                          placeholder={previousData.yearOfPassout}
                          className="outline-none opacity-1"
                        />
                      </div>
                    </div>
                  </div>

                  <TextInput
                    inputLabel={"Graduate from"}
                    defaultText={previousData.bscDoneFrom}
                    textValue={setGraduateFrom}
                    placeHolderText={null}
                    isRequired={false}
                  />
                  <TextInput
                    inputLabel={"Masters done from"}
                    defaultText={previousData.mscDoneFrom}
                    textValue={setMastersDoneFrom}
                    placeHolderText={null}
                    isRequired={false}
                  />
                  <div className="sm:col-span-2 mt-2">
                    <TextEditor
                      editorLabel={"Alumni details"}
                      eventValue={previousData.details}
                      eventHandler={setAlumniDetails}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center shadow-xl bg-[#ffde499f] hover:bg-[#f7ca00] rounded-xl"
                  >
                    Update Alumni Details
                  </button>
                  <Link
                    to={"/admin-panel/manage-doctorate-alumni"}
                    className="ml-2 inline-flex cursor-pointer items-center px-5 py-2.5 mt-4 
                    sm:mt-6 text-sm font-medium text-center shadow-xl bg-white border border-gray-200 hover:bg-[#f7ca00] rounded-xl"
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="mt-2 lg:mt-24 lg:order-last order-first"
              id="columnTwo"
            >
              <div className="py-4 px-4 mx-auto max-w-2xl">
                <div className="flex items-center justify-center w-full mb-4">
                  <div
                    className="w-full h-44 relative border-2 border-gray-300 border-dashed rounded-lg p-8"
                    id="dropzone"
                  >
                    <input
                      type="file"
                      onChange={(e) => setAlumniImage(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 z-50"
                    />
                    <div className="text-center">
                      <img
                        className="mx-auto h-12 w-12"
                        src="https://www.svgrepo.com/show/357902/image-upload.svg"
                        alt="uploadImage"
                      />

                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer"
                        >
                          {alumniImage ? (
                            <>
                              <p className="text-green-500 font-bold">
                                {alumniImage.name}
                              </p>
                              <p className="text-gray-500 font-bold">
                                {alumniImage.size / 1000}Kb
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-gray-500">
                                <span>Drag and drop</span>
                                <span className="text-indigo-600">
                                  {" "}
                                  or browse{" "}
                                </span>
                                <span>to upload</span>
                              </p>
                              <div className="text-xs text-gray-500 flex flex-col overflow-hidden">
                                {previousData.profilePicture}
                              </div>
                            </>
                          )}

                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </h3>
                    </div>
                  </div>
                </div>

                <EmailInput
                  inputLabel={"Email Id"}
                  defaultEmail={previousData.emailId}
                  emailValue={setAlumniEmailId}
                  emailValidationError={emailValidatErr}
                  placeHolderText={null}
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
                    defaultValue={previousData.phoneNumber}
                    name="phoneNumber"
                    id="phoneNumber"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter  master alumni phone number "
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
                  defaultText={previousData.researchGateId}
                  textValue={setAlumniResearchGateUrl}
                  placeHolderText={null}
                  isRequired={false}
                />

                <TextInput
                  inputLabel={"Google Schollar Id"}
                  defaultText={previousData.googleScholarId}
                  textValue={setAlumniGoogleSchollarUrl}
                  placeHolderText={null}
                  isRequired={false}
                />
              </div>
            </div>
          </form>
        </main>
      ) : (
        <h1 className="text-2xl text-gray-500 text-center mt-24 font-bold">
          Alumni details are not available.
        </h1>
      )}
    </>
  );
};

export default UpdateDoctotateAlumni;
