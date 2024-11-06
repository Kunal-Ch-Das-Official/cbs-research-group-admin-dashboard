import { useEffect, useState } from "react";
import { IoIosCopy } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import AdminReqStatus from "../../../utils/admin-request-status/AdminReqStatus";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbMessageCancel } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";
import { MdSpeakerNotesOff } from "react-icons/md";
import PropTypes from "prop-types";
import { useApp } from "../../../app-context/useApp";
import { Helmet } from "react-helmet";
import { getSingleData } from "../../../../operations/apis/getSingleData";
import envConfig from "../../../../envConfig";
import generateRandomText from "../../../../operations/functional/generateRandomText";
import axios from "../../../../axios/axios";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import CustomModel from "../../../utils/custom-models/CustomModel";
import LoadingSpinner from "../../../utils/common-loading-spinner/LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";
const GetAllDesireAdminReq = ({
    userName,
    userEmail,
    recivedAt,
    id,
    message,
}) => {
    const [emailSendSuccess, setEmailSendSuccess] = useState(false);
    const [emailSendFail, setEmailSendFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [regUserName, setRegUserName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [registrationsuccess, setRegistrationsuccess] = useState(false);
    const { setisIdAccepted } = useApp();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        message: null,
        details: null,
        statusIcon: null,
        buttonColor: null,
    });

    const { isIdAccepted, isIdRejected } = useApp();
    const [copySuccess, setCopySuccess] = useState(false);

    const [isAccepted, setIsAccepted] = useState(() => {
        return localStorage.getItem(`isAccepted-${id}`) || false;
    });
    const [isRejected, setIsRejected] = useState(() => {
        return localStorage.getItem(`isRejected-${id}`) || false;
    });

    const copyEmailHandler = () => {
        const userEmail = document.getElementById("reqUserEmail").innerText;
        navigator.clipboard.writeText(userEmail);
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, "1000");
    };

    useEffect(() => {
        if (
            isIdRejected !== null &&
            isIdRejected !== undefined &&
            isIdRejected.includes(id)
        ) {
            setIsRejected(() => localStorage.setItem(`isRejected-${id}`, true));
        }
        if (
            isIdAccepted !== null &&
            isIdAccepted !== undefined &&
            isIdAccepted.includes(id)
        ) {
            setIsAccepted(() => localStorage.setItem(`isAccepted-${id}`, true));
        }
    }, [id, isIdAccepted, isIdRejected]);
    useEffect(() => {
        if (id.includes(isIdRejected)) {
            setIsRejected(true);
        }
        if (id.includes(isIdAccepted)) {
            setIsAccepted(true);
        }
    }, [id, isIdAccepted, isIdRejected]);

    // 1. Fetch the required data
    useEffect(() => {
        const fetchData = async () => {
            const output = await getSingleData(
                setLoading,
                envConfig.becomeAdminUsersRequestUrl,
                id
            );
            output && setRegUserName(output.reqUserName);
            output && setRegEmail(output.reqUserEmail);
        };
        fetchData();
        const uniqePassword = generateRandomText(10);
        uniqePassword && setRegPassword(uniqePassword);
        AOS.init();
    }, [id]);

    // 2. Register the user as an admin
    const handleRegistration = async () => {
        setLoading(true);
        let newUserName = regUserName;
        let newUserLoginId = regEmail;
        let newUserLoginPassword = regPassword;
        try {
            const userInfo = {
                adminUserName: newUserName,
                adminUserEmail: newUserLoginId,
                adminUserPassword: newUserLoginPassword,
                adminUserPassword_confirmation: newUserLoginPassword,
                termsAndConditions: true,
            };

            await axios
                .post(envConfig.registerAdminUrl, userInfo)
                .then((res) => {
                    if (res) {
                        setRegistrationsuccess(true);
                        setAlertMessage({
                            message: res.data.message,
                            details: res.data.details,
                            statusIcon: (
                                <MdDownloadDone className="text-4xl font-bold text-green-600" />
                            ),
                            buttonColor: "bg-green-600",
                        });
                    }
                });
        } catch (error) {
            setRegistrationsuccess(false);
            setAlertMessage({
                message: error.response.data.issue,
                details: error.response.data.details,
                statusIcon: (
                    <FcCancel className="text-4xl font-bold text-red-600" />
                ),
                buttonColor: "bg-red-600",
            });
        } finally {
            setLoading(false);
            setShowAlert(true);
        }
    };

    // 3. Send Approve Success Email
    async function mailSendHandler() {
        setLoading(true);
        if (registrationsuccess === true) {
            const validateId = regEmail.split("@")[1];
            if (validateId === "gmail.com" || validateId === "outlook.com") {
                try {
                    const authToken = localStorage.getItem("auth-token");
                    const adminToken = localStorage.getItem("admin-token");
                    const token = authToken || adminToken;
                    const loginCredentials = {
                        loginId: regEmail,
                        loginPassword: regPassword,
                    };
                    await axios
                        .post(
                            `${envConfig.becomeAdminReqApprovedUrl}/${id}`,
                            loginCredentials,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )
                        .then(() => {
                            setisIdAccepted(id);
                            setEmailSendSuccess(true);
                            setTimeout(() => {
                                setEmailSendSuccess(false);
                            }, "3000");
                        });
                } catch (error) {
                    console.log(error);
                    setEmailSendFail(true);
                    setTimeout(() => {
                        setEmailSendFail(false);
                    }, "3000");
                } finally {
                    setLoading(false);
                    setShowAlert(false);
                }
            }
        } else {
            setLoading(false)
            showAlert === true && setShowAlert(false)
            setEmailSendFail(true);
            setTimeout(() => {
                setEmailSendFail(false);
            }, "3000");
        }
    }
    
    return (
        <>
            {showAlert === true && (
                <CustomModel
                    buttonText={"Got it"}
                    showOrHide="flex"
                    closeButton={mailSendHandler}
                    statusIcon={alertMessage.statusIcon}
                    alertHead={alertMessage.message}
                    message1={alertMessage.details}
                    buttonColor={alertMessage.buttonColor}
                />
            )}

            {emailSendFail === true && (
                <div
                    className="min-h-screen fixed inset-0 top-4 left-[30%] md:left-[40%] lg:left-[40%] px-4
     flex-wrap justify-center items-center w-full h-full z-[9999]"
                >
                    <div
                        className="bg-red-100 text-red-800 p-4 rounded-lg"
                        role="alert"
                    >
                        <strong className="font-bold text-sm mr-4">
                            Error!
                        </strong>
                        <span className="block text-sm sm:inline max-sm:mt-2">
                            Something wend wrong. unable to send notification
                        </span>
                    </div>
                </div>
            )}

            {emailSendSuccess === true && (
                <div
                    className="min-h-screen fixed inset-0 top-4 left-[30%] md:left-[40%] lg:left-[40%] px-4
     flex-wrap justify-center items-center w-full h-full z-[9999]"
                >
                    <div
                        className="bg-green-100 text-green-800 p-4 rounded-lg"
                        role="alert"
                        data-aos="fade-left"
                    >
                        <strong className="font-bold text-sm mr-4">
                            Success!
                        </strong>
                        <span className="block text-sm sm:inline max-sm:mt-2">
                         The notification has been send successfully.
                        </span>
                    </div>
                </div>
            )}

            {loading === true && <LoadingSpinner />}
            <Helmet>
                <title>Manage Admin Proposal | CBS Research Group</title>
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

            {copySuccess === true && (
                <div
                    className="min-h-screen fixed inset-0 top-4 left-[30%] md:left-[40%] lg:left-[40%] px-4
         flex-wrap justify-center items-center w-full h-full z-[9999]"
                >
                    <p className="inline-flex items-center shadow-xl px-4 bg-green-400 text-sm rounded-full">
                        <span>Copied to clipboard</span>
                        <MdOutlineDone className="bg-white text-black rounded-full ml-4 font-bold" />
                    </p>
                </div>
            )}
            <div className="w-full min-w-[350px] h-[270px] px-4 py-3 bg-white border border-gray-300 rounded-md">
                <div className="flex items-center justify-end">
                    {isAccepted && (
                        <AdminReqStatus
                            textColor={"text-green-500"}
                            statusIcon={<FcApproval className="text-lg" />}
                            statusText={"Approved"}
                        />
                    )}
                    {isRejected && (
                        <AdminReqStatus
                            textColor={"text-red-500"}
                            statusIcon={
                                <MdSpeakerNotesOff className="text-red-600 text-[15px]" />
                            }
                            statusText={"rejected"}
                        />
                    )}
                </div>

                <div>
                    <div className="mt-2 text-lg font-bold text-gray-500">
                        {userName}
                    </div>
                    <div
                        className="mt-2 mb-2 text-md font-semibold text-gray-500 shadow-md
           inline-flex items-center justify-between w-full rounded-md bg-gray-50 py-1 hover:bg-gray-200"
                    >
                        <span id="reqUserEmail" className="ml-2 overflow-auto">
                            {userEmail}
                        </span>
                        <IoIosCopy
                            className="text-gray-400 hover:text-gray-600 text-lg mr-2 cursor-pointer"
                            onClick={copyEmailHandler}
                        />
                    </div>
                    <div className="text-sm font-semibold text-gray-800 flex justify-end">
                        Recived at: <span className="ml-1">{recivedAt}</span>
                    </div>

                    <div className="py-2 text-center text-gray-500">
                        <p className="text-xs my-1">{message}</p>
                    </div>
                </div>

                <div className="-mt-px flex divide-x border-t border-gray-200 border-b  divide-gray-200">
                    <div className="flex w-0 flex-1">
                        <div className="flex w-0 flex-1">
                            <button
                                onClick={handleRegistration}
                                className={`relative  inline-flex w-0 flex-1 items-center justify-center 
            gap-x-3 rounded-bl-lg pt-2 pb-4 text-sm font-semibold
             text-gray-900 transform translate-y-1 hover:scale-110 border-r border-gray-200
             ${
                 localStorage.getItem(`isRejected-${id}`) ||
                 localStorage.getItem(`isAccepted-${id}`)
                     ? "hidden"
                     : "flex"
             }`}
                            >
                                <FcApproval className="text-2xl" />
                                Approve
                            </button>
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                            <Link
                                to={`/admin-panel/reject-request/${id}`}
                                className={`relative inline-flex w-0 flex-1 items-center justify-center 
              gap-x-3 rounded-bl-lg pt-2 pb-4 text-sm font-semibold
               text-gray-900 transform translate-y-1 hover:scale-110 border-r border-gray-200
               ${
                   localStorage.getItem(`isRejected-${id}`) ||
                   localStorage.getItem(`isAccepted-${id}`)
                       ? "hidden"
                       : "flex"
               }`}
                            >
                                <TbMessageCancel className="text-2xl text-yellow-500" />
                                Reject
                            </Link>
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                            <Link
                                to={`/admin-panel/delete-request/${id}`}
                                className="relative pt-2 pb-4 inline-flex w-0 flex-1 items-center justify-center 
              gap-x-3 rounded-bl-lg border border-transparent text-sm font-semibold
               text-gray-900 transform translate-y-1 hover:scale-110"
                            >
                                <MdDeleteForever className="text-2xl text-red-500" />
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

GetAllDesireAdminReq.propTypes = {
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    recivedAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};
export default GetAllDesireAdminReq;
