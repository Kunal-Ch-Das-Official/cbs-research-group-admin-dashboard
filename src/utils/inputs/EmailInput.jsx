import PropTypes from "prop-types";

const EmailInput = ({
  inputLabel,
  defaultEmail,
  emailValue,
  emailValidationError,
  placeHolderText,
}) => {
  return (
    <div id="email">
      <label
        htmlFor="emailInput"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {inputLabel}
      </label>
      <input
        type="email"
        defaultValue={defaultEmail}
        name="emailInput"
        id="emailInput"
        className={`bg-gray-50 border lowercase ${
          emailValidationError === true && "border-red-500"
        }
       border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 
       block w-full p-2.5`}
        placeholder={placeHolderText}
        required
        onChange={(e) => emailValue(e.target.value)}
      />
      {emailValidationError === true ? (
        <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
          Please provide a valid email
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
};
EmailInput.propTypes = {
  inputLabel: PropTypes.string,
  defaultEmail: PropTypes.string || null,
  emailValue: PropTypes.any,
  emailValidationError: PropTypes.bool,
  placeHolderText: PropTypes.string || null,
};

export default EmailInput;
