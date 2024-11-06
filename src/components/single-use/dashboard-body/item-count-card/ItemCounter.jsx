import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CustomKnob from "../../../../utils/knob/CustomKnob";

const ItemCounter = ({
  itemName,
  totalCount,
  lastUpdate,
  sectionIcon,
  iconBackgroundColor,
  textColor,
  manageUrl,
  manageButtonText,
  uploadUrl,
  uploadButtonText
}) => {
  let updateDate = lastUpdate && lastUpdate.updatedAt;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <p className="text-lg text-start font-bold text-gray-500">{itemName}</p>

          <div className="mt-4 text-sm inline-flex items-center text-start">
            <span className="text-green-700 font-bold text-center mr-2">
              Last Update:
            </span>
            {!updateDate ? (
              <span className="text-red-600 font-bold">N/A</span>
            ) : (
              new Date(updateDate).toLocaleDateString()
            )}
          </div>

          <div className="flex-row mt-2">
          <Link
            to={manageUrl}
            className={`border border-yellow-300 shadow-lg mt-2 font-semibold text-black rounded-md bg-yellow-300 cursor-pointer hover:bg-yellow-500 w-[80px] px-3 mr-4 py-auto text-sm`}
          >
            {manageButtonText}
          </Link>
          <Link
            to={uploadUrl}
            className={`${uploadButtonText === null ? 'hidden' : 'visible'} border border-green-300 bg-green-300 shadow-lg mt-2 font-semibold text-black rounded-md  cursor-pointer hover:bg-green-500 px-3 w-[80px] item-center text-sm`}
          >
            {uploadButtonText}
            </Link>
            </div>
        </div>
        <div className={`${iconBackgroundColor} p-2 md:p-1 xl:p-2 rounded-md`}>
          <p className="flex justify-center mb-2">{sectionIcon}</p>
          <h3 className={`mt-1 text-2xl ${textColor} font-bold`}>
            <CustomKnob itemLength={totalCount} maxItems={100} />
          </h3>
        </div>
      </div>
    </div>
  );
};

ItemCounter.propTypes = {
  itemName: PropTypes.string,
  totalCount: PropTypes.number,
  lastUpdate: PropTypes.any,
  sectionIcon: PropTypes.element,
  iconBackgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  manageUrl: PropTypes.string,
  manageButtonText: PropTypes.string,
  uploadUrl: PropTypes.string || null, 
  uploadButtonText:PropTypes.string || null, 
};

export default ItemCounter;
