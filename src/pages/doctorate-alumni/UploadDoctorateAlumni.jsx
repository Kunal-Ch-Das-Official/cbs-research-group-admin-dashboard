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

    let emailValidation;
    let numberValidation;

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

    if (emailValidation === true && numberValidation === true) {
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
      <Helmet>
                <title>
                    Create Doctorate Alumnus Profile | CBS Research Group
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
      <main className="bg-gray-50 min-h-screen pb-12">
      <SectionHeading
          heading={"Upload PHd Alumnus Profile"}
          subHeading={`
         Submit and upload the profile of a specific PHd alumnus from the CBS Research Group, including their academic achievements and professional milestones.`}
        />

        <form
          className="grid grid-cols-1 lg:grid-cols-2 pt-20"
          onSubmit={doctorateAlumniSubmitionHandler}
          ref={doctorateAlumniSubmitionRef}
        >
          <div className=" mt-4" id="columnOne">
            <div className="py-0 px-4 mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput
                  inputLabel={"Alumnus Name"}
                  defaultText={null}
                  textValue={setAlumniName}
                  placeHolderText={"Enter doctorate alumnus name"}
                  isRequired={true}
                  fieldId={"docAlumniName"}
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
                  fieldId={"DocAlumniGraduateFrom"}
                />

                <TextInput
                  inputLabel={"Masters Done From"}
                  defaultText={null}
                  textValue={setMastersDoneFrom}
                  placeHolderText={"Master's complete from"}
                  isRequired={true}
                  fieldId={"DocAlumniMasterFrom"}
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
                placeHolderText={"your_name@email.com"}
                isRequired={false}
                fieldId={"docAlumniEmailIdUpload"}
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
                placeHolderText={"Research Gate Url"}
                isRequired={true}
                fieldId={"DocAlumniRGId"}
              />
              <TextInput
                inputLabel={"Google Schollar Id"}
                defaultText={null}
                textValue={setAlumniGoogleSchollarUrl}
                placeHolderText={"Google Schollar Url"}
                isRequired={true}
                fieldId={"DocAlumniGSId"}
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default UploadDoctorateAlumni;
