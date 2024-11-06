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
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";
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

    let emailValidation = true;
    let imageValidation = true;
    let numberValidation = true;

    const validateEmail = alumniEmailId.split("@")[1];
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      emailValidation = true;
    } else {
      setEmailValidatErr(true);
      emailValidation = false;
    }

    if (alumniPhoneNo.length === 10) {
      numberValidation = true;
    } else {
      setPhoneNumberValidatErr(true);
      numberValidation = false;
    }

    if (!alumniImage) {
      setNoImageErr(true);
      imageValidation = false;
    } else {
      imageValidation = true;
    }
    if (
      emailValidation === true &&
      imageValidation === true &&
      numberValidation === true
    ) {
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
      <main className="bg-gray-50 min-h-screen">
      <Helmet>
    <title>
        Create Master Alumnus Profile | CBS Research Group
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
        <SectionHeading
          heading={"Upload MSc Alumnus Profile"}
          subHeading={`
         Submit and upload the profile of a specific MSc alumnus from the CBS Research Group, including their academic achievements and professional milestones.`}
        />

        <form
          className="grid grid-cols-1 lg:grid-cols-2 pt-20"
          onSubmit={mastersAlumniSubmitionHandler}
          ref={mastersAlumniSubmitionRef}
        >
          <div className=" mt-4" id="columnOne">
            <div className="py-0 px-4 mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput
                  inputLabel={"Alumnus Name"}
                  defaultText={null}
                  textValue={setAlumniName}
                  placeHolderText={"Enter masters alumnus name"}
                  isRequired={true}
                  fieldId={"masterAlumniName"}
                />
                <div>
                  <label
                    htmlFor="Calendar"
                    className="block mb-2 text-sm font-medium text-gray-900 mt-2"
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
                  inputLabel={"Graduate From"}
                  defaultText={null}
                  textValue={setGraduateFrom}
                  placeHolderText={"Bachelor's complete from"}
                  isRequired={true}
                  fieldId={"masterAlumniGraduateFrom"}
                />

                <div className="sm:col-span-2 mt-2">
                  <TextEditor
                    editorLabel={"Alumnus Details"}
                    eventValue={alumniDetails}
                    eventHandler={setAlumniDetails}
                  />
                </div>
              </div>
              <YellowBtn
                btnType={"submit"}
                eventHandler={null}
                btnText={"Upload Alumnus Details"}
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
                placeHolderText={"your_email_id@gmail.com"}
                isRequired={true}
                fieldId={"masterAlumniEmailUpload"}
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
                  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                  block w-full p-2.5`}
                  placeholder="Enter master alumnus phone number"
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
                placeHolderText={"Research gate id"}
                isRequired={true}
                fieldId={"masterAlumniRGId"}
              />
              <TextInput
                inputLabel={"Google Schollar Id"}
                defaultText={null}
                textValue={setAlumniGoogleSchollarUrl}
                placeHolderText={"Google schollar id"}
                isRequired={true}
                fieldId={"masterAlumniGSId"}
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default UploadMasterAlumni;
