import { MdOutlineUpdate } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const GroupNewsCard = ({
  newsTitle,
  newsContent,
  createDate,
  updateDate,
  updateUrl,
  deleteUrl,
}) => {
  const [extractContent, setExtractContent] = useState("");
  const [isExtractValue, setIsExtractValue] = useState(false);
  const [showOrHide, setShowOrHide] = useState(false);
  const [isBtn, setIsBtn] = useState(false);

  useEffect(() => {
    if (newsContent.length > 170) {
      setIsBtn(true);
      setIsExtractValue(true);
      const trimText = newsContent.slice(0, 170);
      setExtractContent(trimText);
    }
  }, [newsContent]);

  const handlerShowHide = () => {
    setShowOrHide((prev) => !prev);
    setIsExtractValue((prev) => !prev);
  };
  return (
    <div>
      <div
        className="relative flex flex-col my-6 bg-white shadow-lg border overflow-y-scroll overflow-x-hidden no-scrollbar
       border-slate-200 rounded-lg w-[400px] h-[260px]"
      >
        <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1 flex justify-between">
          <div className="inline-flex items-start">
            <span className="text-sm font-semibold text-gray-500">
              Uploaded:
            </span>
            <span className="text-green-700 font-normal text-sm">
              {new Date(createDate).toLocaleDateString()}
            </span>
          </div>
          <div className="inline-flex items-start">
            <span className="text-sm font-semibold text-gray-500">
              Last Update:
            </span>
            <span className="text-green-700 font-normal text-sm">
              {new Date(updateDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h5 className="mb-2 text-slate-800 text-xl font-semibold w-[362px] flex flex-col justify-center">
            {newsTitle}
          </h5>
          <div className="text-slate-600 leading-normal font-light">
            {isExtractValue === true ? extractContent : newsContent}

            {isBtn === true && (
              <button
                className="text-blue-600 font-semibold text-sm cursor-pointer ml-2"
                onClick={handlerShowHide}
              >
                {showOrHide === true ? (
                  <span>Showless...</span>
                ) : (
                  <span>Showmore...</span>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="mx-3 border-t border-slate-300 pb-3 pt-3 px-1 flex justify-around">
          <Link
            to={updateUrl}
            className="inline-flex items-center text-green-500 transform translate-1 hover:scale-110 cursor-pointer"
          >
            <span className="font-semibold mr-1">Update</span>

            <MdOutlineUpdate className="text-xl" />
          </Link>
          <div className="border-l border-gray-400"></div>

          <Link
            to={deleteUrl}
            className="inline-flex items-center text-red-500 transform translate-1 hover:scale-110 cursor-pointer"
          >
            <span className="font-semibold mr-1">Delete</span>
            <BsTrash className="text-lg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

GroupNewsCard.propTypes = {
  newsTitle: PropTypes.string,
  newsContent: PropTypes.string,
  createDate: PropTypes.string,
  updateDate: PropTypes.string,
  updateUrl: PropTypes.string,
  deleteUrl: PropTypes.string,
};

export default GroupNewsCard;
