import { useState } from "react";
import style from "../../../utils/confirm-model/ConfirmModel.module.css";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import axios from "../../../../axios/axios";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../../utils/custom-models/CustomModel";
import PropTypes from "prop-types";

const CommonItemDelete = ({ deleteUrl, id, navigateUrl, explicitText }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });
  const deleteRequestedData = async () => {
    const authToken = localStorage.getItem("auth-token");
    const adminToken = localStorage.getItem("admin-token");
    const token = authToken || adminToken;

    try {
      setLoading(true);
      await axios
        .delete(`${deleteUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAlertMessage({
            message: res.data.details,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
        });
    } catch (error) {
      setAlertMessage({
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
    navigate(navigateUrl);
  };
  return (
    <div>
      {loading === true && <LoadingSpinner />}
      {showAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide="flex"
          closeButton={closeModelHandler}
          statusIcon={alertMessage.statusIcon}
          alertHead={alertMessage.message}
          message1={alertMessage.details}
          buttonColor={alertMessage.buttonColor}
        />
      )}
      <div
        className={`flex min-h-screen fixed inset-0 px-4 flex-wrap justify-center 
            items-center w-full h-full before:fixed before:inset-0 before:w-full before:h-full
             before:bg-[rgba(0,0,0,0.5)] ${style.overlay} overflow-auto`}
      >
        <div
          className="w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 bg-white
         shadow-lg rounded-md px-5 py-10 relative mx-auto text-center"
        >
          <div className="flex flex-col justify-center items-center">
            <div>
              <MdDeleteForever className="text-red-600 text-7xl" />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold flex-1 text-gray-600">
              {explicitText ? explicitText : "Sure want to delete?"}
            </h3>
            <div className="flex flex-row justify-between mx-2">
              <button
                onClick={deleteRequestedData}
                className={`mx-2 px-6 py-2.5 mt-8 w-full rounded cursor-pointer
                     text-black text-sm font-semibold border-none outline-none bg-red-500 shadow-xl
           hover:bg-red-600`}
              >
                Confirm
              </button>
              <button
                onClick={() => navigate(navigateUrl)}
                className={`mx-2 px-6 py-2.5 mt-8 w-full rounded cursor-pointer hover:text-black hover:bg-gray-300 text-gray-700 text-sm font-semibold shadow-xl outline-none bg-gray-200`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommonItemDelete.propTypes = {
  deleteUrl: PropTypes.string,
  id: PropTypes.string || PropTypes.number,
  navigateUrl: PropTypes.string,
  explicitText: PropTypes.string || null,
};

export default CommonItemDelete;
