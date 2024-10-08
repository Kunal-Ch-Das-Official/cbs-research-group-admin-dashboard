import { MdUpdate } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const LabInstrumentCard = ({
  instrumentName,
  aboutInstrument,
  instrumentImage,
  uploadAt,
  updateAt,
  deleteUrl,
  updateUrl,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isExtractAboutInstrumnet, setIsExtractAboutInstrumnet] =
    useState(false);
  const [extractAboutInstrument, setExtractAboutInstrument] = useState("");
  useEffect(() => {
    if (aboutInstrument.length > 120) {
      const firstText = aboutInstrument.slice(0, 120);
      setExtractAboutInstrument(firstText);
      setIsExtractAboutInstrumnet(true);
    } else {
      setExtractAboutInstrument(aboutInstrument);
      setIsExtractAboutInstrumnet(false);
    }
  }, [aboutInstrument]);

  const handleReadmore = () => {
    setShowFullText((prev) => !prev);
  };
  return (
  <div className="flex justify-center items-center">
      <div className="text-gray-600 rounded-lg text-sm w-[400px] h-[340px] no-scrollbar bg-white border border-gray-200 shadow-xl overflow-y-scroll overflow-x-hidden">
        <div className="w-full flex flex-row space-x-3 p-4">
          <img
            className="rounded-2xl border-zinc-700 w-24 h-24"
            alt={instrumentName}
            src={instrumentImage}
          />
          <div className="w-full text-gray-500">
            <h2 className="w-[280px] text-lg font-semibold space-x-1 flex flex-colwhitespace-nowrap text-ellipsis">
              {instrumentName}
            </h2>
          </div>
        </div>
        <div className="w-full border-b border-gray-400"></div>
        <div className="w-full flex flex-row space-x-4 p-4 text-gray-500 text-sm">
          <div className="flex flex-row w-full justify-around h-4">
            <Link
              to={updateUrl}
              className="text-lg font-bold border-r justify-center
             border-gray-400 w-[50%] text-center inline-flex items-center
              text-green-500 cursor-pointer transform translate-1 hover:scale-110 "
            >
              <span className="mr-2">Update</span>
              <MdUpdate className="text-2xl mt-1" />
            </Link>

            <Link
              to={deleteUrl}
              className="text-lg font-bold justify-center w-[50%] text-center
             inline-flex items-center text-red-500 cursor-pointer transform translate-1 hover:scale-110 "
            >
              <span>Delete</span>
              <FaRegTrashCan className="text-xl ml-2" />
            </Link>
          </div>
        </div>
        <div className="w-full border-b border-gray-400"></div>
        <div className="h-6 w-full border-b border-gray-400 flex justify-around pt-1">
          <div>
            <p className="text-xs text-gray-500">
              <span className="font-bold mr-1">Uploaded At:</span>
              <span className="text-green-600">{uploadAt}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              <span className="font-bold mr-1">Last Update:</span>
              <span className="text-green-600">{updateAt}</span>
            </p>
          </div>
        </div>
        <div className="w-full flex-col space-y-1 p-4 text-gray-500 text-sm">
          <div>
            {showFullText === true ? (
              <p className="mt-4 text-sm text-gray-600 ">{aboutInstrument}</p>
            ) : (
              <p className="mt-4 text-sm text-gray-600 ">
                {isExtractAboutInstrumnet === true
                  ? `${extractAboutInstrument}....`
                  : extractAboutInstrument}
              </p>
            )}
          </div>
          <div>
            <button
              onClick={handleReadmore}
              className="text-sm text-blue-600 font-bold cursor-pointer hover:underline"
            >
              {" "}
              {isExtractAboutInstrumnet === true ? (
                <>{showFullText === true ? "Showless..." : " Showmore..."}</>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>
      </div>
   
  );
};

LabInstrumentCard.propTypes = {
  instrumentName: PropTypes.string,
  aboutInstrument: PropTypes.string,
  instrumentImage: PropTypes.string,
  uploadAt: PropTypes.string,
  updateAt: PropTypes.string,
  deleteUrl: PropTypes.string,
  updateUrl: PropTypes.string,
};

export default LabInstrumentCard;
