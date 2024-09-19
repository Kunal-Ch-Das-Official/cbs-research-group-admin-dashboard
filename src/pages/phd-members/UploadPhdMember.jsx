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
import FileInput from "../../utils/inputs/FileInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import { IoPersonAddSharp } from "react-icons/io5";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
const UploadPhdMember = () => {
  const navigate = useNavigate();
  const phdMemberSubmitionRef = useRef();
  const [membersName, setMembersName] = useState("");
  const [membersImage, setMembersImage] = useState(null);
  const [membersEmail, setMembersEmail] = useState("");
  const [membersPhoneNo, setMembersPhoneNo] = useState("");
  const [graduateFrom, setGraduateFrom] = useState("");
  const [mastersFrom, setMastersFrom] = useState("");
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

  const phdMemberSubmitionHandler = async (e) => {
    e.preventDefault();

    let emailValidation = true;
    let numberValidation = true;
    const validateEmail = membersEmail.split("@")[1];
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      emailValidation = true;
    } else {
      setEmailValidatErr(true);
      emailValidation = false;
    }

    if (membersPhoneNo.length === 10) {
      numberValidation = true;
    } else {
      setPhoneNumberValidatErr(true);
      numberValidation = false;
    }

    if (emailValidation === true && numberValidation === true) {
      setLoading(true);
      const phdMembersInfo = new FormData();
      phdMembersInfo.append("memberName", membersName);
      phdMembersInfo.append("profilePicture", membersImage);
      phdMembersInfo.append("emailId", membersEmail);
      phdMembersInfo.append("phoneNumber", membersPhoneNo);
      phdMembersInfo.append("bscDoneFrom", graduateFrom);
      phdMembersInfo.append("mscDoneFrom", mastersFrom);
      phdMembersInfo.append("researchGateId", researchGateHandle);
      phdMembersInfo.append("googleScholarId", googleScholarHandle);
      phdMembersInfo.append("currentYear", currentYear);
      phdMembersInfo.append("details", aboutMember);

      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;

      try {
        await axios
          .post(envConfig.phdMembersUrl, phdMembersInfo, {
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
        phdMemberSubmitionRef.current.reset();
        setAboutMember("");
        setMembersImage(null);
        setPhoneNumberValidatErr(false);
        setEmailValidatErr(false);
      }
    }
  };
  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-phd-members");
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
      <main className="bg-gray-50 min-h-screen">
        <SectionHeading
          heading={"Manage All Details"}
          subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
        />

        <form
          className="grid grid-cols-1 lg:grid-cols-2"
          onSubmit={phdMemberSubmitionHandler}
          ref={phdMemberSubmitionRef}
        >
          <div className=" mt-2" id="columnOne">
            <div className="py-0 px-4 mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2 mt-2 lg:mt-20">
                  <label
                    htmlFor="mscMember"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {"Member's Name"}
                  </label>
                  <input
                    type="text"
                    name="mscMember"
                    id="mscMember"
                    className="bg-white border border-gray-300 text-gray-900 text-sm 
                  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter project student's name"
                    required
                    onChange={(e) => setMembersName(e.target.value)}
                  />
                </div>
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
                    <MdDateRange className="text-2xl mx-2 text-gray-600" />
                    <div className="bg-white outline-none ">
                      <select
                        id="currentYear"
                        className="w-64 py-2"
                        onChange={(e) => setCurrentYear(e.target.value)}
                      >
                        <option value={null}>Select Year</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                      </select>
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
                <div>
                  <label
                    htmlFor="mscDoneFrom"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Masters done from
                  </label>
                  <input
                    type="text"
                    name="mscDoneFrom"
                    id="mscDoneFrom"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Master's complete from"
                    required
                    onChange={(e) => setMastersFrom(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <TextEditor
                    editorLabel={"About Member"}
                    eventValue={aboutMember}
                    eventHandler={setAboutMember}
                  />
                </div>
              </div>
              <YellowBtn
                btnType={"submit"}
                eventHandler={null}
                btnText={"Upload Member Details"}
                icon={<IoPersonAddSharp />}
              />
            </div>
          </div>

          <div
            className="mt-2 lg:mt-24 lg:order-last order-first"
            id="columnTwo"
          >
            <div className="py-4 px-4 mx-auto max-w-2xl">
              <FileInput
                givenFile={membersImage}
                fileName={membersImage && membersImage.name}
                fileSize={membersImage && membersImage.size}
                setFile={setMembersImage}
                isRequired={true}
                previousImage={null}
              />
              <EmailInput
                inputLabel={"Email Id"}
                defaultEmail={null}
                emailValue={setMembersEmail}
                emailValidationError={emailValidatErr}
                placeHolderText={"your_name@email.com"}
                isRequired={true}
                fieldId={"phdMemberEmailUpload"}
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
                  className={`bg-white border 
                   ${
                     phoneNumberValidatErr === true
                       ? "border-red-600"
                       : "border-gray-300"
                   }
                  text-gray-900 text-sm rounded-lg focus:ring-primary-600
                   focus:border-primary-600 block w-full p-2.5`}
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
                  onChange={(e) => setResearchGateHandle(e.target.value)}
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
                  onChange={(e) => setGoogleScholarHandle(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default UploadPhdMember;
