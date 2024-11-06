import { useRef, useState } from 'react';
import { GrUserAdmin } from 'react-icons/gr';
import { MdRememberMe } from 'react-icons/md';
import TacModal from '../../../utils/terms-and-conditions/TacModal';
import axios from '../../../../axios/axios';
import envConfig from '../../../../envConfig';
import LoadingSpinner from '../../../utils/common-loading-spinner/LoadingSpinner';
import { FcCancel } from 'react-icons/fc';
import { MdDownloadDone } from 'react-icons/md';
import CustomModel from '../../../utils/custom-models/CustomModel';
import EmailInput from '../../../utils/inputs/EmailInput';
import TextInput from '../../../utils/inputs/TextInput';
import YellowBtn from '../../../utils/buttons/YellowBtn';
import { MdCreateNewFolder } from 'react-icons/md';
import PasswordInput from '../../../utils/inputs/PasswordInput';
import { Helmet } from 'react-helmet';

const RegisterAdmin = () => {
    const registerFormref = useRef();
    const [showTerms, setShowTerms] = useState(false);
    const [emailValidationErr, setEmailValidationErr] = useState(false);
    const [passwordValidateErr, setPasswordValidateErr] = useState(false);
    const [accountTypeAdmin, setAccountTypeAdmin] = useState(false);
    const [accountTypeMember, setAccountTypeMember] = useState(false);
    const [termsNotFollow, setTermsNotFollow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAndCond, setTermsAndCond] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [registerResponse, setRegisterResponse] = useState({
        message: null,
        details: null,
        statusIcon: null,
        buttonColor: null,
    });

    const handlerTermsAndConditonShow = () => {
        setShowTerms(true);
    };

    const handleColorSwitch = (id) => {
        if (id === 1) {
            setAccountTypeAdmin(true);
            setAccountTypeMember(false);
        }
        if (id === 2) {
            setAccountTypeMember(true);
            setAccountTypeAdmin(false);
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);

        let isValid = true;

        const validateEmail = userEmail.split('@')[1];
        if (validateEmail === 'gmail.com' || validateEmail === 'outlook.com') {
            setEmailValidationErr(false);
        } else {
            setEmailValidationErr(true);
            isValid = false;
        }

        if (password !== confirmPassword) {
            setPasswordValidateErr(true);
            isValid = false;
        } else {
            setPasswordValidateErr(false);
        }

        if (!termsAndCond) {
            setTermsNotFollow(true);
            isValid = false;
        } else {
            setTermsNotFollow(false);
        }

        if (isValid) {
            try {
                const fullName = firstName + ' ' + lastName;
                const userInfo = {
                    adminUserName: fullName,
                    adminUserEmail: userEmail,
                    adminUserPassword: password,
                    adminUserPassword_confirmation: confirmPassword,
                    termsAndConditions: termsAndCond,
                };

                const res = await axios.post(
                    envConfig.registerAdminUrl,
                    userInfo
                );
                setRegisterResponse({
                    message: res.data.message,
                    details: res.data.details,
                    statusIcon: (
                        <MdDownloadDone className="text-4xl font-bold text-green-600" />
                    ),
                    buttonColor: 'bg-green-600',
                });
            } catch (error) {
                setRegisterResponse({
                    message: error.response.data.issue,
                    details: error.response.data.details,
                    statusIcon: (
                        <FcCancel className="text-4xl font-bold text-red-600" />
                    ),
                    buttonColor: 'bg-red-600',
                });
            } finally {
                setLoading(false);
                setOpenModal(true);
                setTermsAndCond(false);
                registerFormref.current.reset();
            }
        } else {
            setLoading(false);
        }
    };

    const closeModelHandler = () => {
        setOpenModal(false);
    };

    return (
        <>
            
            <Helmet>
                <title>Register New Admin | CBS Research Group</title>
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



            {loading && <LoadingSpinner />}
            {showTerms && <TacModal closeTerms={() => setShowTerms(false)} />}
            {openModal && (
                <CustomModel
                    buttonText={'Got it'}
                    showOrHide="flex"
                    closeButton={closeModelHandler}
                    statusIcon={registerResponse.statusIcon}
                    alertHead={registerResponse.message}
                    message1={registerResponse.details}
                    buttonColor={registerResponse.buttonColor}
                />
            )}
            <section className="bg-gray-50 min-h-screen pt-12">
                <div className="flex justify-center min-h-screen">
                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                                Register user as a new admin.
                            </h1>
                            <p className="mt-4 text-gray-500">
                                Empowering New Leadership: Admin Registration
                                Process
                            </p>
                            <div className="mt-6">
                                <h1 className="text-gray-500">
                                    Select type of account
                                </h1>
                                <div className="mt-3 md:flex md:items-center md:-mx-2">
                                    <button
                                        onClick={() => handleColorSwitch(1)}
                                        className={`flex justify-center w-full px-6 py-1 rounded-lg md:w-auto md:mx-2 focus:outline-none
                   ${
                       accountTypeAdmin
                           ? 'text-black bg-[#f7ca00] hover:bg-[#c1a630]'
                           : ' text-gray-500 border border-gray-500 hover:bg-gray-100'
                   }`}
                                    >
                                        <GrUserAdmin className="text-xl items-center" />
                                        <span className="mx-2">Admin</span>
                                    </button>
                                    <button
                                        onClick={() => handleColorSwitch(2)}
                                        className={`flex justify-center w-full px-6 py-1 mt-4 rounded-lg md:mt-0 md:w-auto md:mx-2 
                    ${
                        accountTypeMember
                            ? 'text-black bg-[#f7ca00] hover:bg-[#c1a630]'
                            : ' text-gray-500 border border-gray-500 hover:bg-gray-100 '
                    }`}
                                    >
                                        <MdRememberMe className="text-xl items-center" />
                                        <span className="mx-2">Member</span>
                                    </button>
                                    <div className="flex text-center items-start cursor-pointer ml-4 border border-gray-300 py-1 px-2 bg-gray-300 mt-3 md:mt-0 lg:mt-0 rounded-xl">
                                        <div className="flex items-center h-5 text-center">
                                            <div className="mr-3 text-lg">
                                                <label
                                                    htmlFor="termsAndConditions"
                                                    className="text-gray-900 cursor-pointer text-center "
                                                >
                                                    <button
                                                        type="button"
                                                        className="hover:underline text-blue-900 font-semibold text-center"
                                                        onClick={
                                                            handlerTermsAndConditonShow
                                                        }
                                                    >
                                                        Terms and conditions
                                                    </button>
                                                </label>
                                            </div>
                                            <input
                                                id="termsAndConditions"
                                                checked={termsAndCond}
                                                aria-describedby="termsAndConditions"
                                                type="checkbox"
                                                className="w-4 h-4 border 
                        cursor-pointer border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                                onChange={() =>
                                                    setTermsAndCond(
                                                        !termsAndCond
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form
                                onSubmit={handleRegistration}
                                ref={registerFormref}
                            >
                                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                    <TextInput
                                        inputLabel={'First Name'}
                                        defaultText={null}
                                        textValue={setFirstName}
                                        placeHolderText={'John'}
                                        isRequired={true}
                                        fieldId={'regAdminFirstName'}
                                    />
                                    <TextInput
                                        inputLabel={'Last Name'}
                                        defaultText={null}
                                        textValue={setLastName}
                                        placeHolderText={'Doe'}
                                        isRequired={true}
                                        fieldId={'regAdminLastName'}
                                    />

                                    <EmailInput
                                        inputLabel={'Email address'}
                                        defaultEmail={null}
                                        emailValue={setUserEmail}
                                        emailValidationError={
                                            emailValidationErr
                                        }
                                        placeHolderText={'your_emailid@gmail.com'}
                                        isRequired={true}
                                        fieldId={'newAdminEmailId'}
                                    />

                                    <PasswordInput
                                        inputId={'regAdminPassword'}
                                        passwordLabel={'Password'}
                                        inputValue={setPassword}
                                        validationError={passwordValidateErr}
                                    />
                                    <PasswordInput
                                        inputId={'regAdminConfirmPassword'}
                                        passwordLabel={'Confirm password'}
                                        inputValue={setConfirmPassword}
                                        validationError={passwordValidateErr}
                                    />
                                </div>
                                <div className="mt-6">
                                    <YellowBtn
                                        btnType={'submit'}
                                        eventHandler={null}
                                        btnText={'Create Account'}
                                        icon={<MdCreateNewFolder />}
                                    />
                                </div>
                            </form>
                            {termsNotFollow && (
                                <span className="text-red-600">
                                    Please agree to the terms and conditions
                                </span>
                            )}
                            <div>
                                {passwordValidateErr && (
                                    <span className="text-red-600">
                                        Password and Confirm password do not
                                        match
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterAdmin;
