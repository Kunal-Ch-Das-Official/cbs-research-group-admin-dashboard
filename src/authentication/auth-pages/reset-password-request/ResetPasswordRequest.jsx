// Project: CBS Research Group Admin Dashboard
// Content: Send email for password reset
// Date: 30/08/2024

import { useState } from "react";
const ResetPasswordRequest = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(false);
  // Password show and hide handler

  const sendRequest = async (e) => {
    e.preventDefault();
    const emailValidate = adminEmail.split("@")[1];
    if (emailValidate === "gmail.com" || emailValidate === "outlook.com") {
      setEmailValidationError(false);
    } else {
      setEmailValidationError(true);
    }
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Send reset password request
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={sendRequest}>
              {/* EMAIL FIELDS  */}
              <div id="email">
                <label
                  htmlFor="adminUserEmail"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Authorized email
                </label>
                <input
                  type="email"
                  name="adminUserEmail"
                  id="adminUserEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
                {emailValidationError === true ? (
                  <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                    Please provide a valid email
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              {/* SUBMIT BUTTON  */}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordRequest;
