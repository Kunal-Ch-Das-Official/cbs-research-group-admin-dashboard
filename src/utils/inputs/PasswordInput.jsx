import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import showPasswordHandler from "../../../operations/functional/showPasswordHandler";
import PropTypes from "prop-types";
import { useState } from "react";
const PasswordInput = ({
  inputId,
  passwordLabel,
  inputValue,
  validationError,
}) => {

  const [eyeButton, setEyeButton] = useState(false)
  const handlePasswordOpenColse = () => {
    showPasswordHandler(inputId)
    setEyeButton(prev => !prev)
    
   }
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {passwordLabel}
      </label>

      <div className="relative flex items-center">
        <input
          type="password"
          name={inputId}
          id={inputId}
          placeholder="••••••••••••••"
          className={`bg-white border text-gray-900
           rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
           ${validationError === true ? "border-red-600" : "border-gray-300"}`}
          required
          onChange={(e) => inputValue(e.target.value)}
        />
        {eyeButton === true ?
          <IoEyeOffSharp className="text-xl text-gray-600 absolute right-2 cursor-pointer" onClick={handlePasswordOpenColse}/> :
          <IoEyeSharp
            className="text-xl text-gray-600 absolute right-2 cursor-pointer"
            onClick={handlePasswordOpenColse}
          />}
      </div>
    </div>
  );
};
PasswordInput.propTypes = {
  inputId: PropTypes.string,
  passwordLabel: PropTypes.string,
  inputValue: PropTypes.any,
  validationError: PropTypes.bool || null,
};

export default PasswordInput;
