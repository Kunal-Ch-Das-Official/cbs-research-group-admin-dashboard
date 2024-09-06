import { LiaAwardSolid } from "react-icons/lia";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const AwardCard = ({
  awardTitle,
  recivedDate,
  overView,
  uploadDate,
  updateDate,
  deleteUrl,
  updateUrl,
}) => {
  const [extractOverview, setExtractOverview] = useState("");
  const [isExtractOverview, setIsExtractOverview] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  useEffect(() => {
    if (overView.length > 30) {
      const firstText = overView.slice(0, 30);
      setExtractOverview(firstText);
      setIsExtractOverview(true);
    } else {
      setExtractOverview(overView);
      setIsExtractOverview(false);
    }
  }, [overView]);

  const handleReadmore = () => {
    setShowFullText((prev) => !prev);
  };
  return (
    <div>
      <section className="max-w-md p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg h-[300px] overflow-y-scroll no-scrollbar">
        <div className="grid grid-cols-[35px_auto]">
          <div className="max-w-10">
            <LiaAwardSolid className="text-4xl text-black bg-[#FFD700] rounded-full" />
          </div>

          <h2 className="ml-3 font-bold text-lg text-gray-600">{awardTitle}</h2>
        </div>

        <div className="underline">
          <p className="text-sm text-gray-600 flex justify-start mt-2 ">
            <span className="text-md font-bold text-gray-500 mr-1">
              Recived At:
            </span>
            <span>{recivedDate}</span>
          </p>
        </div>

        <div>
          {showFullText === true ? (
            <p className="mt-4 text-sm text-gray-600 ">{overView}</p>
          ) : (
            <p className="mt-4 text-sm text-gray-600 ">
              {isExtractOverview === true
                ? `${extractOverview}....`
                : extractOverview}
            </p>
          )}
        </div>
        <div>
          <button
            onClick={handleReadmore}
            className="text-sm text-blue-600 font-bold cursor-pointer hover:underline"
          >
            {" "}
            {isExtractOverview === true ? (
              <>{showFullText === true ? "Showless..." : " Showmore..."}</>
            ) : (
              ""
            )}
          </button>
        </div>

        <div className="border-t border-b border-gray-400 mt-4 py-2 flex justify-between">
          <div>
            <p className="text-xs text-gray-500">
              <span className="font-bold mr-1">Uploaded At:</span>
              <span className="text-green-600">{uploadDate}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              <span className="font-bold mr-1">Last Update:</span>
              <span className="text-green-600">{updateDate}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-around mt-4 gap-x-2 shrink-0">
          <Link
            to={updateUrl}
            className=" text-sm border border-gray-200 hover:bg-gray-100 transform translate-y-1 hover:scale-110
          w-[45%] h-8 inline-flex item-center justify-center pt-1 rounded-lg shadow-lg"
          >
            <GrDocumentUpdate className="text-lg font-bold text-green-500 cursor-pointer mr-1" />
            <span className="font-bold text-green-500">Update</span>
          </Link>

          <Link
            to={deleteUrl}
            className=" text-sm border border-gray-200 hover:bg-gray-100 transform translate-y-1 hover:scale-110
          w-[45%] h-8 inline-flex item-center justify-center pt-1 rounded-lg shadow-lg"
          >
            <AiFillDelete className="text-xl font-bold text-red-500 cursor-pointer mr-1" />
            <span className="font-bold text-red-500">Delete</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

AwardCard.propTypes = {
  awardTitle: PropTypes.string,
  recivedDate: PropTypes.string,
  overView: PropTypes.string,
  uploadDate: PropTypes.string,
  updateDate: PropTypes.string,
  deleteUrl: PropTypes.string,
  updateUrl: PropTypes.string,
};

export default AwardCard;
