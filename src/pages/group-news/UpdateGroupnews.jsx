// Project: CBS Research Group Admin Dashboard
// Content: Change existing user password
// Date: 30/08/2024
import { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
import TextInput from "../../utils/inputs/TextInput";
import YellowBtn from "../../utils/buttons/YellowBtn";
import TransparentLink from "../../utils/custom-link/TransparentLink";
import { MdSpeakerNotes } from "react-icons/md";
import { MdSpeakerNotesOff } from "react-icons/md";

const UpdateGroupnews = () => {
  const { id } = useParams();
  const [prevData, setPrevData] = useState(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.groupNewsUrl,
        id
      );
      response && setPrevData(response);
    };
    fetchReqData();
  }, [id]);

  const handleGroupNewsUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedGroupNews = {
        newsTitle: newsTitle,
        content: newsContent,
      };
      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;

      await axios
        .patch(`${envConfig.groupNewsUrl}/${id}`, updatedGroupNews, {
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
    }
  };
  const closeModelHandler = () => {
    setCustomAlert(false);
    navigate("/admin-panel/manage-group-news");
  };
  return (
    <>
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
      <section className="bg-gray-50 py-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 mt-12 lg:mt-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Update existing group news
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleGroupNewsUpdate}
              >
                {/* PASSWORD FIELDS  */}

                <TextInput
                  inputLabel={"News title"}
                  defaultText={prevData && prevData.newsTitle}
                  textValue={setNewsTitle}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"newsTitleUpdate"}
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
                      defaultValue={prevData && prevData.content}
                      type="text"
                      name="newsContent"
                      id="newsContent"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={(e) => setNewsContent(e.target.value)}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON  */}
                <div className="flex flex-col">
                  <YellowBtn
                    btnType={"submit"}
                    eventHandler={null}
                    btnText={"Update Group News"}
                    icon={<MdSpeakerNotes />}
                  />

                  <TransparentLink
                    path={"/admin-panel/manage-group-news"}
                    linkText={"Cancel"}
                    icon={<MdSpeakerNotesOff />}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateGroupnews;
