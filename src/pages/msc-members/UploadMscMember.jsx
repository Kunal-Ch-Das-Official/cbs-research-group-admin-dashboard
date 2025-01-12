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
import { MdDriveFolderUpload } from "react-icons/md";
import YellowBtn from "../../utils/buttons/YellowBtn";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";
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
       <Helmet>
                <title>
                    Create New MSc Member&apos;s Profile | CBS Research Group
                </title>
                <meta name="keywords" content="Researcher" />
                <meta name="keywords" content="Dr. Chinmoy Bhattacharya" />
                <meta
                    name="keywords"
                    content="Indian Institute of Engineering Science and Technology"
                />
                <meta name="keywords" content="IIEST" />
                <meta name="keywords" content="Shibpur" />
                <meta name="keywords" content="Electrochemistry" />
                <meta name="keywords" content="Materials Chemistry" />
                <meta name="keywords" content="Photoelectrochemical" />
                <meta name="keywords" content="Solar Cells" />

                <meta
                    name="description"
                    content="Joined the Institute as Assistant Professor , Department of Chemistry, Indian Institute of Engineering Science & Technology, Shibpur (formerly, BESUS) Howrah – 711 103, West Bengal on 23rd June 2006. Promoted to Associate Professor, Department of Chemistry, IIESTS on 22nd Feb. 2019."
                />
                <meta
                    name="location"
                    content="IIEST, Shibpur is located in Howrah— just across the River Hoogly from the city of Kolkata. It is well connected to other parts of the country by road, rail and air. The campus is situated adjacent to the A.J.C. Bose Indian Botanic Garden which boasts of the 250-year-old Great Banyan Tree.
It takes around 20 minutes to reach IIEST, Shibpur from the heart of the city and approximately 90 minutes from the airport. The Howrah Railway Station is about 5 kms away from the institute."
                />
            </Helmet>
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
          heading={"Upload MSc Member Profile Information"}
          subHeading={`Submit and upload essential details for MSc students in the CBS Research Group, including academic records and research contributions for comprehensive tracking.`}
        />

        <form
          className="grid grid-cols-1 lg:grid-cols-2 pt-20"
          onSubmit={mscMemberSubmitionHandler}
          ref={mscMemberSubmitionRef}
        >
          <div className=" mt-4" id="columnOne">
            <div className="py-0 px-4 mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput
                  inputLabel={"Member's Name"}
                  defaultText={null}
                  textValue={setMembersName}
                  placeHolderText={"Enter project student's name"}
                  isRequired={true}
                  fieldId={"mscMemberName"}
                />

                <div>
                  <label
                    htmlFor="currentYear"
                    className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  >
                    Current Year
                  </label>

                  <div
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600  w-full inline-flex items-center"
                  >
                    <MdDateRange className="text-2xl mx-2 text-gray-600" />
                    <div className="bg-white outline-none ">
                      <select
                        id="currentYear"
                        required
                        className="w-64 py-3"
                        onChange={(e) => setCurrentYear(e.target.value)}
                      >
                        <option value={null}>Select Year</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                      </select>
                    </div>
                  </div>
                </div>
                <TextInput
                  inputLabel={"Graduate From"}
                  defaultText={null}
                  textValue={setGraduateFrom}
                  placeHolderText={"Bachelor's complete from"}
                  isRequired={true}
                  fieldId={"mscMemberGraduateFrom"}
                />

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
                placeHolderText={"your_email_id@gmail.com"}
                isRequired={true}
                fieldId={"mscMemberEmailUpload"}
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
                  placeholder="Enter phone number of msc member "
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
                placeHolderText={"Research gate url"}
                isRequired={true}
                fieldId={"mscMemberRGId"}
              />
              <TextInput
                inputLabel={"Google Schollar Id"}
                defaultText={null}
                textValue={setGoogleScholarHandle}
                placeHolderText={"Google schollar url"}
                isRequired={true}
                fieldId={"mscMemberGSId"}
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default UploadMscMember;
