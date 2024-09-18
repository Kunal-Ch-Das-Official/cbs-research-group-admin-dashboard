import { IoEyeSharp } from "react-icons/io5";
import showPasswordHandler from "../../../operations/functional/ShowPasswordHandler";
import PropTypes from "prop-types";
const PasswordInput = ({ inputId, passwordLabel, inputValue }) => {
  return (
    <div id="password">
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {passwordLabel}
      </label>

      <div className="relative flex items-center">
        <input
          type="password"
          name="commonPasswordField"
          id={inputId}
          placeholder="••••••••••••••"
          className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
          onChange={(e) => inputValue(e.target.value)}
        />
        <IoEyeSharp
          className="text-xl text-gray-600 absolute right-2 cursor-pointer"
          onClick={() => showPasswordHandler(inputId)}
        />
      </div>
    </div>
  );
};
PasswordInput.propTypes = {
  inputId: PropTypes.string,
  passwordLabel: PropTypes.string,
  inputValue: PropTypes.any,
};

export default PasswordInput;
