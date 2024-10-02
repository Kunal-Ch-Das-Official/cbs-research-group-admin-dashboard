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
}) => {
  let updateDate = lastUpdate && lastUpdate.updatedAt;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <p className="text-lg font-bold text-gray-500">{itemName}</p>

          <div className="mt-4 text-sm inline-flex items-center text-start">
            <span className="text-green-700 font-bold text-center ml-2 mr-2">
              Last Update:
            </span>
            {!updateDate ? (
              <span className="text-red-600 font-bold">N/A</span>
            ) : (
              new Date(updateDate).toLocaleDateString()
            )}
          </div>

          <Link
            to={manageUrl}
            className={`border border-gray-300 shadow-lg mt-2 font-semibold text-black rounded-md transform translate-1 hover:scale-110 cursor-pointer hover:bg-gray-100`}
          >
            Manage
          </Link>
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
};

export default ItemCounter;
