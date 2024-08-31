import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import { MdRememberMe } from "react-icons/md";

import { IoIosArrowForward } from "react-icons/io";
const RegisterAdmin = () => {
  return (
    <section className="bg-gray-50 min-h-screen mt-12">
      <div className="flex justify-center min-h-screen">
        {/* <div className="hidden bg-cover lg:block lg:w-2/5 justify-center"></div> */}

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 ">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <div className="mt-6">
              <h1 className="text-gray-500">Select type of account</h1>

              <div className="mt-3 md:flex md:items-center md:-mx-2">
                <button className="flex justify-center w-full px-6 py-1 text-black bg-[#f7ca00] hover:bg-[#c1a630] rounded-lg md:w-auto md:mx-2 focus:outline-none">
                  <GrUserAdmin className="text-xl items-center" />

                  <span className="mx-2">Admin</span>
                </button>

                <button className="flex justify-center w-full px-6 py-1 mt-4 text-gray-500 border border-gray-500 hover:bg-gray-100 rounded-lg md:mt-0 md:w-auto md:mx-2">
                  <MdRememberMe className="text-xl items-center" />

                  <span className="mx-2">Member</span>
                </button>

                <div className="flex  text-center items-start cursor-pointer ml-4 border border-gray-300 py-1 px-2 bg-gray-300 mt-3 md:mt-0 lg:mt-0">
                  <div className="flex items-center h-5 text-center">
                    <div className="mr-3 text-lg">
                      <label
                        htmlFor="termsAndConditions"
                        className="text-gray-900 cursor-pointer text-center "
                      >
                        <button
                          type="button"
                          className="hover:underline text-blue-900 font-semibold text-center"
                          // onClick={handlerTermsAndConditonShow}
                        >
                          Terms and conditions
                        </button>
                      </label>
                    </div>
                    <input
                      id="termsAndConditions"
                      aria-describedby="termsAndConditions"
                      type="checkbox"
                      className="w-4 h-4 border 
                        cursor-pointer border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required
                      // onChange={(e) => setTermsAndConditions(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-md text-black font-semibold ">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2  text-md text-black font-semibold  ">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Snow"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2  text-md text-black font-semibold  ">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2  text-md text-black font-semibold ">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2  text-md text-black font-semibold ">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <button
                className="flex items-center justify-between mt-8
               w-full px-6  text-lg tracking-wide text-black capitalize h-12
                transition-colors duration-300 transform bg-[#f7ca00] rounded-lg hover:bg-[#c1a630]"
              >
                <span>Register User</span>
                <IoIosArrowForward className="text-xl items-center" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterAdmin;
