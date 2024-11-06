import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
import TextEditor from "../../utils/text-editor/TextEditor";
import TextInput from "../../utils/inputs/TextInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import TransparentLink from "../../utils/custom-link/TransparentLink";
import { BiSolidEdit } from "react-icons/bi";
import { TbEditOff } from "react-icons/tb";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";
const UpdatePublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prevData, setPrevData] = useState(null);
  const [publicationTitle, setpPublicationTitle] = useState("");
  const [publicationContributer, setPublicationContributer] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
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

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.publicationsUrl,
        id
      );
      response && setPrevData(response);
    };
    fetchReqData();
  }, [id]);

  const updatePublicationHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pubTitle = publicationTitle ? publicationTitle : prevData.title;
    const pubContributer = publicationContributer ? publicationContributer : prevData.contributer;
    const pubThumbnail = thumbnail ? thumbnail : prevData.publicationThumbnail;
    const pubfirstView = firstImage ? firstImage : prevData.firstOverview;
    const pubsecView = secondImage ? secondImage : prevData.secondOverview;
    const pubPdfLink = pdfLink ? pdfLink : prevData.pdfLink;
    const pubPublishedDate = publishedDate ? publishedDate : prevData.publishedDate;
    const pubDescription = aboutPublication ? aboutPublication : prevData.aboutPublication;

    const publicationFormData = new FormData();
    publicationFormData.append("title", pubTitle);
    publicationFormData.append("contributer", pubContributer);
    publicationFormData.append("publicationThumbnail", pubThumbnail);
    publicationFormData.append("firstOverview", pubfirstView);
    publicationFormData.append("secondOverview", pubsecView);
    publicationFormData.append("pdfLink", pubPdfLink);
    publicationFormData.append("publishedDate", pubPublishedDate);
    publicationFormData.append("aboutPublication", pubDescription);

    const authToken = localStorage.getItem("auth-token") || null;
    const adminToken = localStorage.getItem("admin-token") || null;
    const token = authToken || adminToken;

    try {
      await axios
        .patch(`${envConfig.publicationsUrl}/${id}`, publicationFormData, {
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
                Edit Publication | CBS Research Group
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
      {prevData ? (
        <section className="bg-gray-50">
          <SectionHeading
            heading={"Update This Publication Details for CBS Research Group"}
            subHeading={`
       Update the details of a specific publication within the CBS Research Group, ensuring that all information is accurate and up-to-date for future reference..`}
          />
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <form onSubmit={updatePublicationHandler}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-10">
                <TextInput
                  inputLabel={"Publication title"}
                  defaultText={prevData && prevData.title}
                  textValue={setpPublicationTitle}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"publicationTitle"}
                />

                <TextInput
                  inputLabel={" Publication contributer"}
                  defaultText={prevData && prevData.contributer}
                  textValue={setPublicationContributer}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"contributerName"}
                />

                <div>
                  <label htmlFor="buttondisplay"></label>
                  <Calendar
                    id="buttondisplay"
                    className="border border-gray-300 py-3 px-4 rounded-md"
                    placeholder={
                      prevData &&
                      new Date(prevData.publishedDate).toLocaleDateString()
                    }
                    value={prevData && prevData.publishedDate}
                    onChange={(e) => setPublishedDate(e.value)}
                    showIcon
                  />
                </div>

                <div
                  className="bg-white text-gray-600 flex items-center border
               border-gray-300 p-1 min-w-[300px] w-max rounded-md overflow-hidden mx-auto"
                >
                  <div className="px-4 flex">
                    <FaFileImage className="text-xl" />
                    {thumbnail ? (
                      <p
                        className="
                    ml-1 text-green-600 font-semibold"
                      >
                        {thumbnail.name}
                      </p>
                    ) : (
                      <p className="text-xs ml-3">JPG, JPEG, PNG, SVG, WEBP</p>
                    )}
                  </div>
                  <label
                    htmlFor="uploadFile1"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
                  >
                    Upload
                  </label>
                  <input
                    type="file"
                    id="uploadFile1"
                    className="hidden"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </div>

                <div
                  className="bg-white text-gray-600 flex items-center border border-gray-300 p-1 min-w-[300px] w-max rounded-md
                overflow-y-hidden mx-auto overflow-x-scroll no-scrollbar my-[26px]"
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
                    htmlFor="uploadFile2"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
                  >
                    Upload
                  </label>
                  <input
                    type="file"
                    id="uploadFile2"
                    className="hidden"
                    onChange={(e) => setFirstImage(e.target.files[0])}
                  />
                </div>

                <div
                  className="bg-white text-gray-600 flex items-center border border-gray-300 p-1 min-w-[300px] w-max rounded-md
               overflow-y-hidden  overflow-x-scroll no-scrollbar my-[26px] mx-auto"
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
                    htmlFor="uploadFile3"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
                  >
                    Upload
                  </label>
                  <input
                    type="file"
                    id="uploadFile3"
                    className="hidden"
                    onChange={(e) => setSecondImage(e.target.files[0])}
                  />
                </div>
                <TextInput
                  inputLabel={"Coresponding PDF Link"}
                  defaultText={prevData && prevData.pdfLink}
                  textValue={setPdfLink}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"pdfLink"}
                />

                <div className="sm:col-span-2">
                  <TextEditor
                    editorLabel={" About Project"}
                    eventValue={prevData && prevData.aboutPublication}
                    eventHandler={setAboutPublication}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <YellowBtn
                  btnType={"submit"}
                  eventHandler={null}
                  btnText={"Update Publication"}
                  icon={<BiSolidEdit />}
                />

                <TransparentLink
                  path={"/admin-panel/manage-publications"}
                  linkText={"Cancel"}
                  icon={<TbEditOff />}
                />
              </div>
            </form>
          </div>
        </section>
      ) : (
        <h1 className="text-center text-gray-600 text-2xl pt-28 font-bold">
          Something went wrong please try again later.
        </h1>
      )}
    </div>
  );
};

export default UpdatePublication;
