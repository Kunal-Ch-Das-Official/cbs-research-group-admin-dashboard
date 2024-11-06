// Project: CBS Research Group Admin Dashboard
// Content: Login setup
// Date: 30/08/2024
import { Helmet } from 'react-helmet';
import { useRef, useState } from 'react';
import envConfig from '../../../../envConfig';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../../axios/axios';
import CustomModel from '../../../utils/custom-models/CustomModel';
import LoadingSpinner from '../../../utils/common-loading-spinner/LoadingSpinner';
import { useAuth } from '../../auth-context/useAuth';
import PasswordInput from '../../../utils/inputs/PasswordInput';
import EmailInput from '../../../utils/inputs/EmailInput';
import YellowBtn from '../../../utils/buttons/YellowBtn';
import { BiSolidLogInCircle } from 'react-icons/bi';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { PiShieldCheckFill } from 'react-icons/pi';
const AdminLogin = () => {
    const loginFormRef = useRef();
    const navigate = useNavigate();
    const { login, modelOpen, setModelOpen } = useAuth();
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [emailValidationError, setEmailValidationError] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRememberMeChecked, setRememberMeChecked] = useState(null);
    const [loginResponse, setLoginResponse] = useState({
        message: null,
        details: null,
        statusIcon: null,
        buttonColor: null,
    });

    // Submit handler
    const handleLogin = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const emailValidate = adminEmail.split('@')[1];
        if (emailValidate === 'gmail.com' || emailValidate === 'outlook.com') {
            setEmailValidationError(false);
            const loginCredentials = {
                adminUserEmail: adminEmail,
                adminUserPassword: adminPassword,
            };
            try {
                await axios
                    .post(envConfig.loginUrl, loginCredentials)
                    .then((res) => {
                        setLoginResponse({
                            message: res.data.message,
                            details: res.data.details,
                            statusIcon: (
                                <PiShieldCheckFill className="text-7xl font-bold text-green-600" />
                            ),
                            buttonColor: 'bg-green-600',
                        });

                        if (isRememberMeChecked === true) {
                            localStorage.setItem(
                                'auth-token',
                                res.data.authentication_sign
                            );
                        } else {
                            localStorage.setItem(
                                'admin-token',
                                res.data.authentication_sign
                            );
                        }
                        setIsLoading(false);
                        setModelOpen(true);
                        login();
                        setToken(res.data.authentication_sign);
                    });
            } catch (error) {
                setLoginResponse({
                    message: error.response.data.issue,
                    details: error.response.data.details,
                    statusIcon: (
                        <BsShieldFillExclamation className="text-7xl font-bold text-red-600" />
                    ),
                    buttonColor: 'bg-red-600',
                });
                setToken(null);
                setModelOpen(true);
                setIsLoading(false);
            }
        } else {
            setEmailValidationError(true);
            setIsLoading(false);
        }
        loginFormRef.current.reset();
    };

    const closeModelHandler = () => {
        setModelOpen(false);
        if (token) {
            navigate('/admin-panel');
        }
    };
    return (
      <main className="min-h-screen py-16 lg:py-0 md:py-0 bg-gray-50">
        {/* SEO  */}
            <Helmet>
                <title>Sign In | CBS Research Group</title>
                <meta name="keywords" content="Researcher" />
                <meta name="keywords" content="Dr. Chinmoy Bhattacharya" />
                <meta
                    name="keywords"
                    content="Indian Institute of Engineering Science and Technology"
                />
                <meta name="keywords" content="IIEST" />
                <meta name="keywords" content="Shibpur" />
                <meta name="keywords" content="Electrochemistry" />
                <meta name="keywords" content="Materials Chemistry" />
                <meta name="keywords" content="Photoelectrochemical" />
                <meta name="keywords" content="Solar Cells" />

                <meta
                    name="description"
                    content="Joined the Institute as Assistant Professor , Department of Chemistry, Indian Institute of Engineering Science & Technology, Shibpur (formerly, BESUS) Howrah – 711 103, West Bengal on 23rd June 2006. Promoted to Associate Professor, Department of Chemistry, IIESTS on 22nd Feb. 2019."
                />
                                <meta
                    name="location"
                    content="IIEST, Shibpur is located in Howrah— just across the River Hoogly from the city of Kolkata. It is well connected to other parts of the country by road, rail and air. The campus is situated adjacent to the A.J.C. Bose Indian Botanic Garden which boasts of the 250-year-old Great Banyan Tree.
It takes around 20 minutes to reach IIEST, Shibpur from the heart of the city and approximately 90 minutes from the airport. The Howrah Railway Station is about 5 kms away from the institute."
                />
            </Helmet>
            {isLoading === true && <LoadingSpinner />}
            {
                <CustomModel
                    buttonText={'Got it'}
                    showOrHide={modelOpen === true ? 'flex' : 'hidden'}
                    closeButton={closeModelHandler}
                    statusIcon={loginResponse.statusIcon}
                    alertHead={loginResponse.message}
                    message1={loginResponse.details}
                    buttonColor={loginResponse.buttonColor}
                />
            }
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-500 md:text-2xl">
                                Sign In As An Admin
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleLogin}
                                ref={loginFormRef}
                            >
                                {/* EMAIL FIELDS  */}
                                <EmailInput
                                    inputLabel={'Admin email id'}
                                    defaultEmail={null}
                                    emailValue={setAdminEmail}
                                    emailValidationError={emailValidationError}
                                    placeHolderText={'your_name@email.com'}
                                    isRequired={true}
                                    fieldId={'signIn'}
                                />
                                {/* PASSWORD FIELDS  */}

                                <PasswordInput
                                    inputId={'authAdminPassword'}
                                    passwordLabel={'Admin password'}
                                    inputValue={setAdminPassword}
                                    validationError={null}
                                />

                                {/* REMEMBER ME AND FORGOT PASSWORD BUTTON  */}
                                <div className="flex items-center justify-between ">
                                    <button
                                        className="flex items-start cursor-pointer"
                                        // onClick={memorizedAdminHandler}
                                    >
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border 
                        cursor-pointer border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                                onChange={(e) =>
                                                    setRememberMeChecked(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-900 cursor-pointer ml-3 text-sm"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </button>
                                    <Link
                                        to={'/forgot-password'}
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-blue-700"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* SUBMIT BUTTON  */}

                                <YellowBtn
                                    btnType={'submit'}
                                    eventHandler={null}
                                    btnText={'Sign In'}
                                    icon={<BiSolidLogInCircle />}
                                />

                                {/* SEND REQUEST FOR BECOME ADMIN  */}
                                <p className="text-sm font-base text-gray-900">
                                    Don’t have admin access?{' '}
                                    <Link
                                        to={'/become-admin-request'}
                                        className="font-medium text-blue-700 hover:underline"
                                    >
                                        Send registration request
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminLogin;
