/* 
Project: CBS Research Group Admin Dashboard
Content: Common alert model
Date: 29/08/2024 
*/
import PropTypes from "prop-types";
import alertStyle from "./CustomModel.module.css";
const CustomModel = ({
  buttonText,
  showOrHide,
  closeButton,
  statusIcon,
  alertHead,
  message1,
  message2,
  buttonColor,
}) => {
  return (
    <div
      className={`${showOrHide} min-h-screen fixed inset-0 px-4 flex-wrap justify-center items-center w-full h-full z-[9999] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto ${alertStyle.overlay}`}
    >
      <div className="w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 bg-white shadow-lg rounded-md px-5 py-10 relative mx-auto text-center">
        <div className="flex flex-col justify-center items-center">
          <div> {statusIcon} </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold flex-1">{alertHead}</h3>
          <p className="text-md text-gray-500 mt-2">
            {" "}
            {message1} <br />
            {message2}
          </p>
          <button
            onClick={closeButton}
            className={`px-6 py-2.5 mt-8 w-full rounded cursor-pointer text-white text-sm font-semibold border-none outline-none ${buttonColor}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

CustomModel.propTypes = {
  buttonText: PropTypes.string,
  showOrHide: PropTypes.any,
  closeButton: PropTypes.func,
  statusIcon: PropTypes.element,
  message1: PropTypes.string,
  alertHead: PropTypes.string,
  message2: PropTypes.string,
  buttonColor: PropTypes.string,
};

export default CustomModel;
