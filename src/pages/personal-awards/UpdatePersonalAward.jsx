import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { useState, useEffect } from "react";
import cbsLogo from "../../assets/CBS Research Group Logo-resized.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
const UpdatePersonalAward = () => {
  const { id } = useParams();
  const [prevData, setPrevData] = useState(null);
  const navigate = useNavigate();
  const [awardTitle, setAwardTitle] = useState("");
  const [awardDetails, setAwardDetails] = useState("");
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  useEffect(() => {
    setLoading(true);
    const getPreviousData = async () => {
      try {
        await axios.get(`${envConfig.personalAwardsUrl}/${id}`).then((res) => {
          setPrevData(res.data);
        });
      } catch (error) {
        console.log(error);
        setPrevData(null);
      } finally {
        setLoading(false);
      }
    };
    getPreviousData();
  }, [id]);

  const handleAwardUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formattedDate = date.toLocaleDateString("en-GB");
      const updatedInfo = {
        awardTitle: awardTitle,
        recivedFor: awardDetails,
        recivedDate: formattedDate,
      };
      const authToken = localStorage.getItem("auth-token") || null;
      const adminToken = localStorage.getItem("admin-token") || null;
      const token = authToken || adminToken;
      await axios
        .patch(`${envConfig.personalAwardsUrl}/${id}`, updatedInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
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
      console.log(error);
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
    navigate("/admin-panel/manage-personal-awards");
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

      <section className="pt-32">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={cbsLogo} alt="cbsLogo" />
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
              Update Personal Awards
            </h3>

            <p className="mt-1 text-center text-gray-500">
              Update personal awards info
            </p>

            <form onSubmit={handleAwardUpdate}>
              <div className="w-full mt-4">
                <input
                  defaultValue={prevData && prevData.awardTitle}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:outline-none "
                  type="text"
                  aria-label="award-title"
                  onChange={(e) => setAwardTitle(e.target.value)}
                />
              </div>
              <div className="w-full my-4 border border-gray-200 py-4">
                <div className="card">
                  <FloatLabel>
                    <label
                      htmlFor="recivedDate"
                      className="text-gray-500 z-[100] pl-4"
                    >
                      {prevData && prevData.recivedDate}
                    </label>
                    <Calendar
                      className="z-0 border-b  border-l  border-r border-gray-200 pl-4"
                      inputId="recivedDate"
                      value={date}
                      onChange={(e) => setDate(e.value)}
                    />
                  </FloatLabel>
                </div>
              </div>

              <div className="w-full mb-4 mt-6 border border-gray-200 rounded-lg bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                  <label htmlFor="awardDetails" className="sr-only">
                    About Awards
                  </label>
                  <textarea
                    defaultValue={prevData && prevData.recivedFor}
                    id="awardDetails"
                    rows="4"
                    className="w-full px-0 text-sm text-gray-900 bg-white border-0"
                    onChange={(e) => setAwardDetails(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t ">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-yellow-500 rounded-lg f  hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      navigate("/admin-panel/manage-personal-awards")
                    }
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-gray-300 rounded-lg f  hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                    <button
                      type="button"
                      className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                        />
                      </svg>
                      <span className="sr-only">Attach file</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      <span className="sr-only">Set location</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                      <span className="sr-only">Upload image</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePersonalAward;