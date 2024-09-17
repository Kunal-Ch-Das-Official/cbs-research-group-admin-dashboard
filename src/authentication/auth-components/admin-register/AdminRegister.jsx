// Project: CBS Research Group Admin Dashboard
// Content: Create new admin user
// Date: 30/08/2024
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import showPasswordHandler from "../../../../operations/functional/ShowPasswordHandler";

const AdminRegister = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    // Email validator //
    const validateEmail = adminEmail.split("@")[1];
    if (validateEmail === "gmail.com" || validateEmail === "outlook.com") {
      setShowEmailError(false);
    } else {
      setShowEmailError(true);
    }
    // Password validator //
    if (password !== confirmPassword) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register as an admin
              </h1>
              <form
                onSubmit={handleRegister}
                className="space-y-4 md:space-y-6"
              >
                {/* COLLECT ADMIN USER NAME  */}
                <div>
                  <label
                    htmlFor="adminUserName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="adminUserName"
                    id="adminUserName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* COLLECT ADMIN USER EMAIL ID  */}
                <div>
                  <label
                    htmlFor="adminUserEmail"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="adminUserEmail"
                    id="adminUserEmail"
                    className="bg-gray-50 lowercase border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                  {/* Email validation message mounting  */}
                  {showEmailError === true ? (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      only gmail and outlook acceptable
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                {/* COLLECT ADMIN USER PASSWORD  */}
                <div>
                  <label
                    htmlFor="adminUserPassword"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      name="adminUserPassword"
                      id="adminUserPassword"
                      placeholder="••••••••••••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <IoEyeSharp
                      className="text-xl text-gray-600 absolute right-2 cursor-pointer"
                      onClick={() => showPasswordHandler("adminUserPassword")}
                    />
                  </div>
                  {/* Password validator message  */}
                  {showPasswordError === true ? (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      Password and confirm password must be same
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                {/* COLLECT ADMIN USER PASSWORD CONFIRMATION  */}
                <div>
                  <label
                    htmlFor="adminUserPassword_confirmation"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      name="adminUserPassword_confirmation"
                      id="adminUserPassword_confirmation"
                      placeholder="••••••••••••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <IoEyeSharp
                      className="text-xl text-gray-600 absolute right-2 cursor-pointer"
                      onClick={() =>
                        showPasswordHandler("adminUserPassword_confirmation")
                      }
                    />
                  </div>
                  {/* Password validator message  */}
                  {showPasswordError === true ? (
                    <p className="ml-2 text-red-500 font-sm text-xs my-0 py-0">
                      Password and confirm password must be same
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                {/* SIGNOUT TERMS AND CONDITIONS  */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAndConditions"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="termsAndConditions"
                      className="font-md text-gray-800"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-blue-600 hover:underline hover:text-blue-800"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                {/* SUBMIT BUTTON  */}
                <button
                  type="submit"
                  className="w-full text-white
                   bg-blue-400 hover:bg-blue-700
                    focus:ring-4 focus:outline-none 
                    focus:ring-primary-300 font-medium 
                    rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>

                {/* HAVE ACCOUNT PLEASE LOGIN LINK  */}
                <p className="text-sm font-md text-blue-800">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminRegister;
