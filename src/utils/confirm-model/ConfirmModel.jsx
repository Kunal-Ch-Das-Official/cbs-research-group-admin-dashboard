/* 
Project: CBS Research Group Admin Dashboard
Content: Common Confirmation model
Date: 31/08/2024 
*/

import PropTypes from "prop-types";
import alertStyle from "./ConfirmModel.module.css";
const ConfirmModel = ({
  showOrHide,
  confirmHandler,
  cancelHandler,
  statusIcon,
  alertHead,
  confirmHandlerColor,
  cancelHandlerColor,
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
          <div className="flex flex-row justify-between mx-2">
            <button
              onClick={confirmHandler}
              className={`mx-2 px-6 py-2.5 mt-8 w-full rounded cursor-pointer text-white text-sm font-semibold border-none outline-none ${confirmHandlerColor}`}
            >
              Confirm
            </button>
            <button
              onClick={cancelHandler}
              className={`mx-2 px-6 py-2.5 mt-8 w-full rounded cursor-pointer text-gray-700 text-sm font-semibold border-[1px] border-gray-400 outline-none ${cancelHandlerColor}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmModel.propTypes = {
  showOrHide: PropTypes.any,
  confirmHandler: PropTypes.func,
  cancelHandler: PropTypes.func,
  statusIcon: PropTypes.element,
  alertHead: PropTypes.string,
  confirmHandlerColor: PropTypes.string,
  cancelHandlerColor: PropTypes.string,
};

export default ConfirmModel;
