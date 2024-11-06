import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
import TextEditor from "../../utils/text-editor/TextEditor";
import EmailInput from "../../utils/inputs/EmailInput";
import TextInput from "../../utils/inputs/TextInput";
import FileInput from "../../utils/inputs/FileInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import TransparentLink from "../../utils/custom-link/TransparentLink";
import { BiSolidEdit } from "react-icons/bi";
import { TbEditOff } from "react-icons/tb";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";
const UpdatePhdMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState(null);
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

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.phdMembersUrl,
        id
      );
      response && setPreviousData(response);
    };
    fetchReqData();
  }, [id]);

  const updatePhdMemberHandler = async (e) => {
    e.preventDefault();

    let emailValidation = true;
    let numberValidation = true;
    let previousEmail = previousData.emailId;
    let previousPhoneNo = previousData.phoneNumber;
    const validateEmail = membersEmail.split("@")[1] || previousEmail.split("@")[1] ;
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      emailValidation = true;
    } else {
      emailValidation = false;
      setEmailValidatErr(true);
    }
    if (membersPhoneNo.length === 10 || previousPhoneNo.length === 10) {
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
          .patch(`${envConfig.phdMembersUrl}/${id}`, phdMembersInfo, {
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
        setMembersImage("");
        setAboutMember(null);
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
      
      <Helmet>
                <title>
                Edit PHd Member&apos;s Profile | CBS Research Group
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
      {previousData ? (
        <main className="bg-gray-50 min-h-screen">
                    <SectionHeading
                        heading={`Update Information Of ${
                            previousData && previousData.memberName
                        }`}
                        subHeading={`Update ${
                            previousData && previousData.memberName
                        }'s details, and ensuring accurate records of their achievements and contributions.`}
                    />

          <form
            className="grid grid-cols-1 lg:grid-cols-2 pt-20"
            onSubmit={updatePhdMemberHandler}
          >
            <div className="mt-4" id="columnOne">
              <div className="py-0 px-4 mx-auto max-w-2xl">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <TextInput
                    inputLabel={"Member's Name"}
                    defaultText={previousData.memberName}
                    textValue={setMembersName}
                    placeHolderText={null}
                    isRequired={false}
                    fieldId={"updatePhdmemberName"}
                  />

                  <div>
                    <label
                      htmlFor="currentYear"
                      className="block mb-2 text-sm font-medium text-gray-900 mt-2"
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
                          defaultValue={previousData.currentYear}
                          className="w-64 py-3"
                          onChange={(e) => setCurrentYear(e.target.value)}
                        >
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
                  <TextInput
                    inputLabel={"Graduate from"}
                    defaultText={previousData.bscDoneFrom}
                    textValue={setGraduateFrom}
                    placeHolderText={null}
                    isRequired={false}
                    fieldId={"updatePhdmemberGraduate"}
                  />
                  <TextInput
                    inputLabel={"Masters done from"}
                    defaultText={previousData.mscDoneFrom}
                    textValue={setMastersFrom}
                    placeHolderText={null}
                    isRequired={false}
                    fieldId={"updatePhdmemberMasters"}
                  />

                  <div className="sm:col-span-2 mt-2">
                    <TextEditor
                      editorLabel={"About Member"}
                      eventValue={previousData.details}
                      eventHandler={setAboutMember}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <YellowBtn
                    btnType={"submit"}
                    eventHandler={null}
                    btnText={"Update Member Details"}
                    icon={<BiSolidEdit />}
                  />

                  <TransparentLink
                    path={"/admin-panel/manage-phd-members"}
                    linkText={"Cancel"}
                    icon={<TbEditOff />}
                  />
                </div>
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
                  isRequired={false}
                  previousImage={previousData && previousData.profilePicture}
                />

                <EmailInput
                  inputLabel={"Email Id"}
                  defaultEmail={previousData.emailId}
                  emailValue={setMembersEmail}
                  emailValidationError={emailValidatErr}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"phdMemberEmailUpdate"}
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
                       } text-gray-900 text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    defaultValue={previousData.phoneNumber}
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
                  defaultText={previousData.researchGateId}
                  textValue={setResearchGateHandle}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"updatePhdmemberRGId"}
                />
                <TextInput
                  inputLabel={"Google Schollar Id"}
                  defaultText={previousData.googleScholarId}
                  textValue={setGoogleScholarHandle}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"updatePhdmemberGSId"}
                />
              </div>
            </div>
          </form>
        </main>
      ) : (
        <h1>Currently members details are not available!</h1>
      )}
    </>
  );
};

export default UpdatePhdMember;
