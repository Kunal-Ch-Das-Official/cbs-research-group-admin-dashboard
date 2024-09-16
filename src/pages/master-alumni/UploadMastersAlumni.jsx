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
const UploadMasterAlumni = () => {
  const navigate = useNavigate();
  const mastersAlumniSubmitionRef = useRef();
  const [alumniName, setAlumniName] = useState("");
  const [passoutYear, setPassoutYear] = useState(null);
  const [graduateFrom, setGraduateFrom] = useState("");
  const [alumniDetails, setAlumniDetails] = useState("");
  const [alumniImage, setAlumniImage] = useState(null);
  const [alumniEmailId, setAlumniEmailId] = useState("");
  const [alumniPhoneNo, setAlumniPhoneNo] = useState("");
  const [alumniGoogleSchollarUrl, setAlumniGoogleSchollarUrl] = useState("");
  const [alumniResearchGateUrl, setAlumniResearchGateUrl] = useState("");

  // Functional State
  const [emailValidatErr, setEmailValidatErr] = useState(false);
  const [phoneNumberValidatErr, setPhoneNumberValidatErr] = useState(false);
  const [noImageErr, setNoImageErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const mastersAlumniSubmitionHandler = async (e) => {
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

    if (!alumniImage) {
      setNoImageErr(true);
      validation = false;
    }
    if (validation === true) {
      setLoading(true);
      const mastersAlumniInfo = new FormData();
      mastersAlumniInfo.append("alumniName", alumniName);
      mastersAlumniInfo.append("profilePicture", alumniImage);
      mastersAlumniInfo.append("emailId", alumniEmailId);
      mastersAlumniInfo.append("phoneNumber", alumniPhoneNo);
      mastersAlumniInfo.append("bscDoneFrom", graduateFrom);
      mastersAlumniInfo.append("researchGateId", alumniResearchGateUrl);
      mastersAlumniInfo.append("googleScholarId", alumniGoogleSchollarUrl);
      mastersAlumniInfo.append("yearOfPassout", stringifyYear);
      mastersAlumniInfo.append("details", alumniDetails);

      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;

      try {
        await axios
          .post(envConfig.mastersAlumniUrl, mastersAlumniInfo, {
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
        mastersAlumniSubmitionRef.current.reset();
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
    navigate("/admin-panel/manage-masters-alumni");
  };

  if (noImageErr === true) {
    alert("image missing");
  }
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
            Master Alumni Information Upload
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
          onSubmit={mastersAlumniSubmitionHandler}
          ref={mastersAlumniSubmitionRef}
        >
          <div className=" mt-2" id="columnOne">
            <div className="py-0 px-4 mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2 mt-2 lg:mt-20">
                  <label
                    htmlFor="masterAlumniName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Alumni Name
                  </label>
                  <input
                    type="text"
                    name="masterAlumniName"
                    id="masterAlumniName"
                    className="bg-white border border-gray-300 text-gray-900 text-sm 
                  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter masters alumni name"
                    required
                    onChange={(e) => setAlumniName(e.target.value)}
                  />
                </div>
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
                <div>
                  <label
                    htmlFor="bscDoneFrom"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Graduate from
                  </label>
                  <input
                    type="text"
                    name="bscDoneFrom"
                    id="bscDoneFrom"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Bachelor's complete from"
                    required
                    onChange={(e) => setGraduateFrom(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <TextEditor
                    editorLabel={"Alumni details"}
                    eventValue={alumniDetails}
                    eventHandler={setAlumniDetails}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center shadow-xl bg-[#ffde499f] hover:bg-[#f7ca00] rounded-xl"
                >
                  Upload Alumni Details
                </button>
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
                    required
                    className="absolute inset-0 w-full h-full opacity-0 z-50"
                  />
                  <div className="text-center">
                    <img
                      className="mx-auto h-12 w-12"
                      src="https://www.svgrepo.com/show/357902/image-upload.svg"
                      alt=""
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
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG, JPEG, or WEBP files are allowed
                            </p>
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

              <div className="w-full mt-2" id=" EmailId">
                <label
                  htmlFor="emailId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email Id
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  className="bg-white lowercase border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter master alumni emails"
                  required
                  onChange={(e) => setAlumniEmailId(e.target.value)}
                />
                {emailValidatErr === true ? (
                  <p className="text-red-600 text-xs">Email id is not valid.</p>
                ) : (
                  ""
                )}
              </div>
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
              <div className="w-full mt-2" id="ResearchGate">
                <label
                  htmlFor="researchGateId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Research Gate Id
                </label>
                <input
                  type="text"
                  name="researchGateId"
                  id="researchGateId"
                  className="bg-white  border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Research Gate Url"
                  required
                  onChange={(e) => setAlumniResearchGateUrl(e.target.value)}
                />
              </div>
              <div className="w-full mt-2" id="GoogleSchollar">
                <label
                  htmlFor="GoogleSchollarId"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Google Schollar Id
                </label>
                <input
                  type="text"
                  name="GoogleSchollarId"
                  id="GoogleSchollarId"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Google Schollar Url"
                  required
                  onChange={(e) => setAlumniGoogleSchollarUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default UploadMasterAlumni;
