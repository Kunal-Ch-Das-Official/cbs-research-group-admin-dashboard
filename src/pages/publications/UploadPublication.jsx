import { Calendar } from "primereact/calendar";
import { useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../utils/text-editor/TextEditor";
import TextInput from "../../utils/inputs/TextInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import { MdOutlinePostAdd } from "react-icons/md";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";
const UploadPublication = () => {
  const publicationFormRef = useRef();
  const navigate = useNavigate();
  const [publicationTitle, setpPublicationTitle] = useState("");
  const [publicationContributer, setpPublicationContributer] = useState("");
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [pdfLink, setPdfLink] = useState("");
  const [publishedDate, setPublishedDate] = useState(null);
  const [aboutPublication, setAboutPublication] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const uploadPublicationHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const publicationFormData = new FormData();
    publicationFormData.append("title", publicationTitle);
    publicationFormData.append("contributer", publicationContributer);
    publicationFormData.append("publicationThumbnail", firstImage);
    publicationFormData.append("firstOverview", secondImage);
    publicationFormData.append("secondOverview", thirdImage);
    publicationFormData.append("pdfLink", pdfLink);
    publicationFormData.append("publishedDate", publishedDate);
    publicationFormData.append("aboutPublication", aboutPublication);

    const authToken = localStorage.getItem("auth-token") || null;
    const adminToken = localStorage.getItem("admin-token") || null;
    const token = authToken || adminToken;

    try {
      await axios
        .post(envConfig.publicationsUrl, publicationFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
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
      publicationFormRef.current.reset();
      setFirstImage(null);
      setSecondImage(null);
      setThirdImage(null);
    }
  };

  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-publications");
  };

  return (
    <div>

<Helmet>
                <title>
                Create New Publication | CBS Research Group
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
      <section className="bg-gray-50 ">
        <SectionHeading
          heading={"Upload Specific Publication Details for CBS Research Group"}
          subHeading={`
       Submit the details of a specific publication from the CBS Research Group, ensuring accurate documentation and easy access to research outputs.`}
        />
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <form onSubmit={uploadPublicationHandler} ref={publicationFormRef}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-10">
              <TextInput
                inputLabel={"Publication title"}
                defaultText={null}
                textValue={setpPublicationTitle}
                placeHolderText={"Enter publication title"}
                isRequired={true}
                fieldId={"publicationTitleUpdate"}
              />

              <TextInput
                inputLabel={"Publication contributer"}
                defaultText={null}
                textValue={setpPublicationContributer}
                placeHolderText={"Enter contributers name with comma"}
                isRequired={true}
                fieldId={"contributerNameUpdate"}
              />

              <div>
                <label htmlFor="buttondisplay"></label>
                <Calendar
                  id="buttondisplay"
                  className="border border-gray-300 py-3 px-4 rounded-md"
                  placeholder="Pick published date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.value)}
                  showIcon
                />
              </div>

              <div
                className="bg-white text-gray-600 flex items-center border
               border-gray-300 p-1 min-w-[300px] w-max rounded-md overflow-y-hidden mx-auto overflow-x-scroll no-scrollbar"
              >
                <div className="px-4 flex">
                  <FaFileImage className="text-xl" />
                  {firstImage ? (
                    <p
                      className="
                    ml-1 text-green-600 font-semibold"
                    >
                      {firstImage.name}
                    </p>
                  ) : (
                    <p className="text-xs ml-3">JPG, JPEG, PNG, SVG, WEBP</p>
                  )}
                </div>
                <label
                  htmlFor="uploadFile1"
                  className="bg-blue-600 hover:bg-blue-800 font-bold text-white text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="uploadFile1"
                  className="hidden"
                  onChange={(e) => setFirstImage(e.target.files[0])}
                />
              </div>

              <div
                className="bg-white text-gray-600 flex items-center border border-gray-300 p-1 min-w-[300px] w-max rounded-md
                overflow-y-hidden mx-auto overflow-x-scroll no-scrollbar my-[26px]"
              >
                <div className="px-4 flex">
                  <FaFileImage className="text-xl" />
                  {secondImage ? (
                    <p
                      className="
                    ml-1 text-green-600 font-semibold"
                    >
                      {secondImage.name}
                    </p>
                  ) : (
                    <p className="text-xs ml-3">JPG, JPEG, PNG, SVG, WEBP</p>
                  )}
                </div>
                <label
                  htmlFor="uploadFile2"
                  className="bg-blue-600 hover:bg-blue-800 font-bold text-white text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="uploadFile2"
                  className="hidden"
                  onChange={(e) => setSecondImage(e.target.files[0])}
                />
              </div>

              <div
                className="bg-white text-gray-600 flex items-center border border-gray-300 p-1 min-w-[300px] w-max rounded-md
               overflow-y-hidden  overflow-x-scroll no-scrollbar my-[26px] mx-auto"
              >
                <div className="px-4 flex">
                  <FaFileImage className="text-xl" />
                  {thirdImage ? (
                    <p
                      className="
                    ml-1 text-green-600 font-semibold"
                    >
                      {thirdImage.name}
                    </p>
                  ) : (
                    <p className="text-xs ml-3">JPG, JPEG, PNG, SVG, WEBP</p>
                  )}
                </div>
                <label
                  htmlFor="uploadFile3"
                  className="bg-blue-600 hover:bg-blue-800 font-bold text-white text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="uploadFile3"
                  className="hidden"
                  onChange={(e) => setThirdImage(e.target.files[0])}
                />
              </div>
              <TextInput
                inputLabel={"Coresponding PDF Link"}
                defaultText={null}
                textValue={setPdfLink}
                placeHolderText={"Paste coresponding pdf link"}
                isRequired={true}
                fieldId={"pdfLinkUpdate"}
              />

              <div className="sm:col-span-2">
                <TextEditor
                  editorLabel={"Description"}
                  eventValue={aboutPublication}
                  eventHandler={setAboutPublication}
                />
              </div>
            </div>

            <YellowBtn
              btnType={"submit"}
              eventHandler={null}
              btnText={"Upload Publication"}
              icon={<MdOutlinePostAdd />}
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadPublication;
