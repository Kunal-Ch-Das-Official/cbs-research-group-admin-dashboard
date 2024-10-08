import { MdOutlineUpdate } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const PublicationCard = ({
  titile,
  uplodDate,
  contributer,
  thumbnailUrl,
  previewUrl,
  updateUrl,
  deleteUrl,
}) => {
  return (
    <div>
      <div
        className="max-w-sm mx-auto bg-white rounded-xl lg:rounded-none shadow-md border border-gray-200
       overflow-x-hidden md:max-w-2xl my-6 lg:my-0 h-[230px] overflow-y-scroll no-scrollbar"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={thumbnailUrl}
              alt={titile}
            />
            <div className="inline-flex item-center font-medium ml-2">
              <span>Upload At:</span>
              <span className="ml-2 text-green-500">
                {new Date(uplodDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Publication title:
            </div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {titile}
            </p>
            <div className="uppercase mt-2  tracking-wide text-sm text-indigo-500 font-semibold">
              Contributer:
            </div>
            <p className=" text-gray-500">{contributer}</p>
            <div className="mt-4">
              <Link
                to={previewUrl}
                className=" shadow-xl mx-2 font-semibold px-4 py-2 rounded focus:outline-none 
                bg-gray-100 transform translate-1 hover:scale-110 text-yellow-500 inline-flex item-center "
              >
                <span>Previe</span>
                <GrOverview className="text-xl ml-2 my-auto" />
              </Link>

              <Link
                to={updateUrl}
                className=" shadow-xl mx-2 font-semibold px-4 py-2 rounded focus:outline-none bg-gray-100
                 transform translate-1 hover:scale-110 text-green-500 inline-flex item-center "
              >
                <span>Update</span>
                <MdOutlineUpdate className="text-xl ml-2 my-auto" />
              </Link>

              <Link
                to={deleteUrl}
                className=" shadow-xl mx-2 font-semibold px-4 py-2 rounded focus:outline-none
                 bg-gray-100 transform translate-1 hover:scale-110 text-red-500  inline-flex item-center 
                 mt-4 lg:mt-0"
              >
                <span>Delete</span>
                <AiFillDelete className="text-xl ml-2 my-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PublicationCard.propTypes = {
  titile: PropTypes.string,
  uplodDate: PropTypes.string,
  contributer: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  previewUrl: PropTypes.string,
  updateUrl: PropTypes.string,
  deleteUrl: PropTypes.string,
};

export default PublicationCard;
