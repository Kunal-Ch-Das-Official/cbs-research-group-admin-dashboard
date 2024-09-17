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
const UploadMscMember = () => {
  const navigate = useNavigate();
  const mscMemberSubmitionRef = useRef();
  const [membersName, setMembersName] = useState("");
  const [membersImage, setMembersImage] = useState(null);
  const [membersEmail, setMembersEmail] = useState("");
  const [membersPhoneNo, setMembersPhoneNo] = useState("");
  const [graduateFrom, setGraduateFrom] = useState("");
  const [researchGateHandle, setResearchGateHandle] = useState("");
  const [googleScholarHandle, setGoogleScholarHandle] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [aboutMember, setAboutMember] = useState("");

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

  const mscMemberSubmitionHandler = async (e) => {
    e.preventDefault();

    let validation = true;
    const validateEmail = membersEmail.split("@")[1];
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      validation = true;
    } else {
      setEmailValidatErr(true);
      validation = false;
    }

    if (membersPhoneNo.length === 10) {
      validation = true;
    } else {
      setPhoneNumberValidatErr(true);
      validation = false;
    }

    if (validation === true) {
      setLoading(true);
      const mscMembersInfo = new FormData();
      mscMembersInfo.append("memberName", membersName);
      mscMembersInfo.append("profilePicture", membersImage);
      mscMembersInfo.append("emailId", membersEmail);
      mscMembersInfo.append("phoneNumber", membersPhoneNo);
      mscMembersInfo.append("bscDoneFrom", graduateFrom);
      mscMembersInfo.append("researchGateId", researchGateHandle);
      mscMembersInfo.append("googleScholarId", googleScholarHandle);
      mscMembersInfo.append("currentYear", currentYear);
      mscMembersInfo.append("details", aboutMember);

      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;

      try {
        await axios
          .post(envConfig.mscMembersUrl, mscMembersInfo, {
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
        mscMemberSubmitionRef.current.reset();
        setAboutMember("");
        setMembersImage(null);
        setPhoneNumberValidatErr(false);
        setEmailValidatErr(false);
      }
    }
  };
  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-msc-members");
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
            MSC Members Information Upload
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
          onSubmit={mscMemberSubmitionHandler}
          ref={mscMemberSubmitionRef}
        >
          <div className=" mt-2" id="columnOne">
            <div className="py-0 px-4 mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput
                  inputLabel={"Member's Name"}
                  defaultText={null}
                  textValue={setMembersName}
                  placeHolderText={"Enter project student's name"}
                  isRequired={true}
                />

                <div>
                  <label
                    htmlFor="currentYear"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Current Year
                  </label>

                  <div
                    className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600  w-full inline-flex items-center"
                  >
                    <MdDateRange className="text-2xl mr-2 text-gray-600" />
                    <div className="bg-white outline-none ">
                      <select
                        id="currentYear"
                        className="w-64 py-2"
                        onChange={(e) => setCurrentYear(e.target.value)}
                      >
                        <option value={null}></option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                      </select>
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

                <div className="sm:col-span-2 mt-2">
                  <TextEditor
                    editorLabel={"About Member"}
                    eventValue={aboutMember}
                    eventHandler={setAboutMember}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center shadow-xl bg-[#ffde499f] hover:bg-[#f7ca00] rounded-xl"
                >
                  Upload Details
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
                    onChange={(e) => setMembersImage(e.target.files[0])}
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
                        {membersImage ? (
                          <>
                            <p className="text-green-500 font-bold">
                              {membersImage.name}
                            </p>
                            <p className="text-gray-500 font-bold">
                              {membersImage.size / 1000}Kb
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

              <EmailInput
                inputLabel={"Email Id"}
                defaultEmail={null}
                emailValue={setMembersEmail}
                emailValidationError={emailValidatErr}
                placeHolderText={"your_name@email.com"}
                isRequired={true}
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
                  onChange={(e) => setMembersPhoneNo(e.target.value)}
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
                textValue={setResearchGateHandle}
                placeHolderText={"Research Gate Url"}
                isRequired={true}
              />
              <TextInput
                inputLabel={"Google Schollar Id"}
                defaultText={null}
                textValue={setGoogleScholarHandle}
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

export default UploadMscMember;
