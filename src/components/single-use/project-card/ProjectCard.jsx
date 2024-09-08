import PropTypes from "prop-types";
import { MdOutlineUpdate } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const ProjectCard = ({
  projectName,
  currentStatus,
  uploadDate,
  description,
  deleteUrl,
  updateUrl,
}) => {
  const [extractDescription, setExtractDescription] = useState("");
  const [isExtractDescription, setIsExtractDescription] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  useEffect(() => {
    if (description.length > 100) {
      const firstText = description.slice(0, 100);
      setExtractDescription(firstText);
      setIsExtractDescription(true);
    } else {
      setExtractDescription(description);
      setIsExtractDescription(false);
    }
  }, [description]);

  const handleReadmore = () => {
    setShowFullText((prev) => !prev);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[420px] mx-12 h-[250px] overflow-y-scroll overflow-x-hidden no-scrollbar">
        <h3 className="text-xl font-bold mb-1">{projectName}</h3>
        <p className="text-sm text-gray-500 mb-4 font-medium">
          <span> Uploaded At:</span> |{" "}
          <span className="text-green-600">
            {new Date(uploadDate).toLocaleDateString()}
          </span>
        </p>

        <div className="space-x-2 mb-2 inline-flex item-center font-medium text-gray-500">
          Status:{" "}
          <span className="ml-2 bg-green-100 text-green-500 text-xs font-semibold px-2 inline-flex items-center h-6 pb-1 rounded-full">
            {currentStatus}
          </span>
        </div>

        <div>
          {showFullText === true ? (
            <p className="mt-4 text-sm text-gray-600 ">{description}</p>
          ) : (
            <p className="mt-4 text-sm text-gray-600 ">
              {isExtractDescription === true
                ? `${extractDescription}....`
                : extractDescription}
            </p>
          )}
        </div>
        <div>
          <button
            onClick={handleReadmore}
            className="text-sm text-blue-600 font-bold cursor-pointer hover:underline"
          >
            {" "}
            {isExtractDescription === true ? (
              <>{showFullText === true ? "Showless..." : " Showmore..."}</>
            ) : (
              ""
            )}
          </button>
        </div>

        <div className="border-t border-gray-300 flex justify-around my-auto h-12">
          <Link
            to={updateUrl}
            className="inline-flex item-center my-auto font-semibold cursor-pointer text-green-500 transform translate-1 hover:scale-110"
          >
            <span>Update</span>
            <MdOutlineUpdate className="text-2xl ml-1 my-auto" />
          </Link>
          <div className="border-r border-gray-300"></div>
          <Link
            to={deleteUrl}
            className="inline-flex item-center my-auto font-semibold cursor-pointer text-red-500 transform translate-1 hover:scale-110"
          >
            <span>Delete</span>
            <AiFillDelete className="text-2xl ml-1 my-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  id: PropTypes.string,
  projectName: PropTypes.string,
  currentStatus: PropTypes.string,
  uploadDate: PropTypes.string,
  description: PropTypes.string,
  deleteUrl: PropTypes.string,
  updateUrl: PropTypes.string,
};

export default ProjectCard;
