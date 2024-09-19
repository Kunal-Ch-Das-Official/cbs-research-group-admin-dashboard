import PropTypes from "prop-types";

const TextInput = ({
  inputLabel,
  defaultText,
  textValue,
  placeHolderText,
  isRequired,
}) => {
  return (
    <div className="my-2">
      <label
        htmlFor="textInput"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {inputLabel}
      </label>
      <input
        type="text"
        defaultValue={defaultText}
        name="textInput"
        id="textInput"
        className="bg-white border
       border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 
       block w-full p-2.5"
        placeholder={placeHolderText}
        required={isRequired}
        onChange={(e) => textValue(e.target.value)}
      />
    </div>
  );
};
TextInput.propTypes = {
  isRequired: PropTypes.bool,
  inputLabel: PropTypes.string,
  defaultText: PropTypes.string || null,
  textValue: PropTypes.any,
  emailValidationError: PropTypes.bool,
  placeHolderText: PropTypes.string || null,
};

export default TextInput;
