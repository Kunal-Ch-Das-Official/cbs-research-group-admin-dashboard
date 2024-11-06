import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import conditionalUserIconColor from "../../../../operations/functional/conditionalUserIconColor";

const AccountHolderCard = ({
  iconCharacter,
  accountHolderName,
  corespondingEmailId,
  deActivateLink,
  registerDate,
  updateDate,
}) => {
  const [bgColor, setBgColor] = useState("");
  useEffect(
    () => conditionalUserIconColor(iconCharacter, setBgColor),
    [iconCharacter]
  );

  return (
    <div className="flex  flex-col sm:flex-row items-center justify-between pb-3 pt-3">
      <div className="flex items-center ">
        <div
          className={`relative inline-flex items-center justify-center pb-1
         h-12 w-12 text-2xl rounded-full object-cover object-center border border-gray-500 font-bold
         ${bgColor}`}
        >
          {iconCharacter}
        </div>
        <div className="ml-8">
          <div className="flex justify-start font-bold text-lg">
            {accountHolderName}
          </div>
          <div className="flex justify-start mx-auto">
            {corespondingEmailId}
          </div>

          <div className="flex flex-col lg:flex-row items-baseline">
            <div className="inline-flex items-center justify-center mr-0 lg:mr-4 font-medium">
              <span className="font-bold text-green-600 mr-1">
                Registerd At:
              </span>
              {new Date(registerDate).toLocaleDateString()}
            </div>{" "}
            <div className="inline-flex items-baseline lg:items-center  font-medium">
              <span className="font-bold text-green-600 mr-1">
                Modified At:
              </span>
              {registerDate === updateDate
                ? "N/A"
                : new Date(updateDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <h6 className="block font-sans text-base font-semibold mt-4 sm:mt-0 text-blue-gray-900 ">
        <Link
          to={deActivateLink}
          className="border border-gray-300 px-4 py-1 rounded-md text-red-500 
          hover:bg-red-500 hover:text-white"
        >
          Deactivate
        </Link>
      </h6>
    </div>
  );
};
AccountHolderCard.propTypes = {
  iconCharacter: PropTypes.string,
  accountHolderName: PropTypes.string,
  corespondingEmailId: PropTypes.string,
  deActivateLink: PropTypes.string,
  registerDate: PropTypes.string,
  updateDate: PropTypes.string,
};

export default AccountHolderCard;
