import { Calendar } from "primereact/calendar";
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
import { FaUserEdit } from "react-icons/fa";
import { TbUserCancel } from "react-icons/tb";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
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

    let emailValidation = true;
    let numberValidation = true;

    const validateEmail = alumniEmailId.split("@")[1];
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      emailValidation = true;
    } else {
      emailValidation = false;
      setEmailValidatErr(true);
    }
    if (alumniPhoneNo.length === 10) {
      numberValidation = true;
    } else {
      setPhoneNumberValidatErr(true);
      numberValidation = false;
    }
    if (emailValidation === true && numberValidation === true) {
      setLoading(true);
      const updatedDoctorateAlumniInfo = new FormData();
      updatedDoctorateAlumniInfo.append("alumniName", alumniName);
      updatedDoctorateAlumniInfo.append("profilePicture", alumniImage);
      updatedDoctorateAlumniInfo.append("emailId", alumniEmailId);
      updatedDoctorateAlumniInfo.append("phoneNumber", alumniPhoneNo);
      updatedDoctorateAlumniInfo.append("bscDoneFrom", graduateFrom);
      updatedDoctorateAlumniInfo.append("mscDoneFrom", mastersDoneFrom);
      updatedDoctorateAlumniInfo.append(
        "researchGateId",
        alumniResearchGateUrl
      );
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
        <main className="bg-gray-50 min-h-screen pb-12">
          <SectionHeading
            heading={"Manage All Details"}
            subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
          />

          <form
            className="grid grid-cols-1 lg:grid-cols-2 pt-20"
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
                    fieldId={"UpdateAlumniName"}
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
                    fieldId={"docAlumnibscDoneFromUpdate"}
                  />
                  <TextInput
                    inputLabel={"Masters done from"}
                    defaultText={previousData.mscDoneFrom}
                    textValue={setMastersDoneFrom}
                    placeHolderText={null}
                    isRequired={false}
                    fieldId={"docAlumnimscDoneFromUpdate"}
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
                  <div className="flex flex-col">
                    <YellowBtn
                      btnType={"submit"}
                      eventHandler={null}
                      btnText={"Update Alumni Details"}
                      icon={<FaUserEdit />}
                    />

                    <TransparentLink
                      path={"/admin-panel/manage-doctorate-alumni"}
                      linkText={"Cancel"}
                      icon={<TbUserCancel />}
                    />
                  </div>
                </div>
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
                  isRequired={false}
                  previousImage={previousData && previousData.profilePicture}
                />

                <EmailInput
                  inputLabel={"Email Id"}
                  defaultEmail={previousData.emailId}
                  emailValue={setAlumniEmailId}
                  emailValidationError={emailValidatErr}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"docAlumniEmailIdUpdate"}
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
                    className={`bg-white border

 ${phoneNumberValidatErr === true ? "border-red-600" : "border-gray-300"}

                     text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                     focus:border-primary-600 block w-full p-2.5`}
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
                  fieldId={"docAlumniresearchGateIdUpdate"}
                />

                <TextInput
                  inputLabel={"Google Schollar Id"}
                  defaultText={previousData.googleScholarId}
                  textValue={setAlumniGoogleSchollarUrl}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"docAlumnigooglescholarUpdate"}
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
