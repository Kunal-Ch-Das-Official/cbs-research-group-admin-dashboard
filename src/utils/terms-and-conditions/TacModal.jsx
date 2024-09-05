import PropTypes from "prop-types";
import { MdCancelPresentation } from "react-icons/md";
import tacModalStyle from "./TacModal.module.css";
const TacModal = ({ closeTerms }) => {
  return (
    <div
      className={`${tacModalStyle.overlay} fixed inset-0 p-4 flex flex-wrap z-[1000] justify-center items-center w-full h-full`}
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3 border-b border-gray-300">
          <h3 className="text-gray-800 text-xl font-bold flex-1">
            Terms and conditions
          </h3>
          <MdCancelPresentation
            className="text-4xl hover:text-red-500 cursor-pointer"
            onClick={closeTerms}
          />
        </div>

        <div className="my-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum
            dui. Maecenas.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum
            dui. Maecenas.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum
            dui. Maecenas.
          </p>
        </div>
      </div>
    </div>
  );
};
TacModal.propTypes = {
  closeTerms: PropTypes.func,
};

export default TacModal;
