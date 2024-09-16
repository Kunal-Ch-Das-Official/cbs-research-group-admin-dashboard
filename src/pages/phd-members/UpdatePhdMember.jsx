import { Editor } from "primereact/editor";
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
      {previousData ? (
        <main className="bg-gray-50 min-h-screen pt-20 pb-12">
          <div className="text-center">
            <h1 className="text-2xl text-gray-500 font-bold">
              PHD Members Information Update
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
            onSubmit={updatePhdMemberHandler}
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
                      defaultValue={previousData.memberName}
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
                      <MdDateRange className="text-2xl mr-2 text-gray-600" />
                      <div className="bg-white outline-none ">
                        <select
                          id="currentYear"
                          defaultValue={previousData.currentYear}
                          className="w-64 py-2"
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
                      defaultValue={previousData.bscDoneFrom}
                      onChange={(e) => setGraduateFrom(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mscDoneFrom"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Masters from
                    </label>
                    <input
                      type="text"
                      name="mscDoneFrom"
                      id="mscDoneFrom"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      defaultValue={previousData.mscDoneFrom}
                      onChange={(e) => setMastersFrom(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <label
                      htmlFor="msc_member_details"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      About Member
                    </label>
                    <div className="card" id="msc_member_details">
                      <Editor
                        className="bg-white"
                        value={previousData.details}
                        onTextChange={(e) => setAboutMember(e.textValue)}
                        style={{ height: "220px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <button
                    type="submit"
                    className="mr-2 inline-flex cursor-pointer items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center shadow-xl bg-[#ffde499f] hover:bg-[#f7ca00] rounded-xl"
                  >
                    Update Details
                  </button>
                  <Link
                    to={"/admin-panel/manage-phd-members"}
                    className="inline-flex cursor-pointer items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center 
                    shadow-xl bg-[#fff] hover:bg-[#f7ca00] rounded-xl border border-gray-200"
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
                      onChange={(e) => setMembersImage(e.target.files[0])}
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
                    defaultValue={previousData.emailId}
                    onChange={(e) => setMembersEmail(e.target.value)}
                  />
                  {emailValidatErr === true ? (
                    <p className="text-red-600 text-xs">
                      Email id is not valid.
                    </p>
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
                    defaultValue={previousData.researchGateId}
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
                    defaultValue={previousData.googleScholarId}
                    onChange={(e) => setGoogleScholarHandle(e.target.value)}
                  />
                </div>
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
