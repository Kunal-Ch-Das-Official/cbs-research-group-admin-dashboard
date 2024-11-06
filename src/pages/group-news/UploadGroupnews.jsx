// Project: CBS Research Group Admin Dashboard
// Content: Change existing user password
// Date: 30/08/2024
import { useRef, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useNavigate } from "react-router-dom";
import TextInput from "../../utils/inputs/TextInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import { MdOutlinePostAdd } from "react-icons/md";
import { Helmet } from "react-helmet";
const UploadGroupnews = () => {
  const navigate = useNavigate();
  const groupNewsFormRef = useRef();
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  const handleGroupNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const groupNews = {
        newsTitle: newsTitle,
        content: newsContent,
      };
      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;

      await axios
        .post(envConfig.groupNewsUrl, groupNews, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAlertContent({
            message: res.data.message,
            details: res.data.details,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
        });
    } catch (error) {
      setAlertContent({
        message: error.response.data.issue,
        details: error.response.data.details,
        statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
        buttonColor: "bg-red-600",
      });
    } finally {
      setLoading(false);
      setCustomAlert(true);
      groupNewsFormRef.current.reset();
    }
  };
  const closeModelHandler = () => {
    setCustomAlert(false);
    navigate("/admin-panel/manage-group-news");
  };
  return (
    <>
      <Helmet>
                <title>
                    Create Group News | CBS Research Group
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
      {customAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide="flex"
          closeButton={closeModelHandler}
          statusIcon={alertContent.statusIcon}
          alertHead={alertContent.message}
          message1={alertContent.details}
          buttonColor={alertContent.buttonColor}
        />
      )}
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 mt-12 lg:mt-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Post Important News of CBS Research Group.
              </h1>
              <p>Submit the latest updates and news of the CBS Research Group, ensuring accurate and timely information is available to all stakeholders and users.</p>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleGroupNewsSubmit}
                ref={groupNewsFormRef}
              >
                {/* PASSWORD FIELDS  */}

                <TextInput
                  inputLabel={"News title"}
                  defaultText={null}
                  textValue={setNewsTitle}
                  placeHolderText={"Enter the title of the group news"}
                  isRequired={true}
                  fieldId={"newsTitleUpload"}
                />
                {/* CONFIRM PASSWORD FIELDS  */}
                <div id="content">
                  <label
                    htmlFor="newsContent"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    News content
                  </label>

                  <div className="relative flex items-center">
                    <textarea
                      type="text"
                      name="newsContent"
                      id="newsContent"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Enter news content"
                      required
                      onChange={(e) => setNewsContent(e.target.value)}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON  */}
                <YellowBtn
                  btnType={"submit"}
                  eventHandler={null}
                  btnText={"Upload Group News"}
                  icon={<MdOutlinePostAdd />}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadGroupnews;
