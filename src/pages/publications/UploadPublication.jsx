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
      <section className="bg-gray-50 pt-10">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Add a new publication
          </h2>
          <form onSubmit={uploadPublicationHandler} ref={publicationFormRef}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-10">
              <div className="sm:col-span-2">
                <label
                  htmlFor="publicationTitle"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Publication title
                </label>
                <input
                  onChange={(e) => setpPublicationTitle(e.target.value)}
                  type="text"
                  name="publicationTitle"
                  id="publicationTitle"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Type publication title"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="contributerName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Publication contributer
                </label>
                <input
                  onChange={(e) => setpPublicationContributer(e.target.value)}
                  type="text"
                  name="contributerName"
                  id="contributerName"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Type contributers name with comma"
                  required=""
                />
              </div>

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
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
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
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
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
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-2 outline-none rounded-md cursor-pointer ml-auto w-max block"
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

              <div className="sm:col-span-2">
                <label
                  htmlFor="pdfLink"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Coresponding PDF Link
                </label>
                <input
                  onChange={(e) => setPdfLink(e.target.value)}
                  type="text"
                  name="pdfLink"
                  id="pdfLink"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Paste coresponding pdf link"
                  required=""
                />
              </div>

              <div className="sm:col-span-2">
                <TextEditor
                  editorLabel={"Description"}
                  eventValue={aboutPublication}
                  eventHandler={setAboutPublication}
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center
               text-black bg-yellow-500 rounded-lg"
            >
              Add publication
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadPublication;
