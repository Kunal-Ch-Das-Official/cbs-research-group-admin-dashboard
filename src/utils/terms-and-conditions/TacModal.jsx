import PropTypes from 'prop-types';
import { MdCancelPresentation } from 'react-icons/md';
import tacModalStyle from './TacModal.module.css';
const TacModal = ({ closeTerms }) => {
    return (
        <div
            className={`${tacModalStyle.overlay} fixed inset-0 p-4 flex flex-wrap z-[1000] justify-center items-center w-full h-full `}
        >
            <div className="w-full h-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative overflow-y-scroll">
                <div className="flex items-center pb-3 border-b border-gray-300">
                    <h3 className="text-gray-800 text-xl font-bold flex-1">
                        Terms and Conditions for CBS Research Group Admin Panel
                    </h3>
                    <MdCancelPresentation
                        className="text-4xl hover:text-red-500 cursor-pointer"
                        onClick={closeTerms}
                    />
                </div>

                <div className="my-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Welcome to the CBS Research Group Admin Panel. These
                        Terms and Conditions outline the rules and regulations
                        for your use of our admin panel. By accessing or using
                        this platform, you agree to comply with these terms.
                    </p>
                    <ul>
                        {/* 1. Acceptance of Terms */}
                        <li>
                            <div>1. Acceptance of Terms</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                By using the CBS Research Group Admin Panel, you
                                confirm that you have read, understood, and
                                agree to be bound by these Terms and Conditions.
                                If you do not agree, please do not use the
                                panel.
                            </p>
                        </li>
                        {/* 2. User Responsibilities */}
                        <li>
                            <div>2. User Responsibilities</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                Account Security: Users must maintain the
                                confidentiality of their login credentials and
                                are responsible for all activities that occur
                                under their account.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                Data Accuracy: Users are required to provide
                                accurate and complete information and must
                                update any changes promptly.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                Reporting Issues: Any unauthorized access or
                                security breaches must be reported to the CBS
                                Research Group immediately.
                            </p>
                        </li>

                        {/* 3. Access to the Admin Panel */}
                        <li>
                            <div>3. Access to the Admin Panel</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                Access to the admin panel is limited to
                                authorized personnel only. The CBS Research
                                Group reserves the right to revoke access at any
                                time for violations of these terms or any
                                conduct deemed inappropriate.
                            </p>
                        </li>
                        {/* 4. Data Use and Protection */}
                        <li>
                            <div>4. Data Use and Protection</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                The CBS Research Group is committed to
                                protecting your personal information. Data
                                collected through the admin panel will be used
                                solely for administrative purposes and will be
                                handled in compliance with applicable data
                                protection laws.
                            </p>
                        </li>

                        {/* 5. Intellectual Property Rights */}
                        <li>
                            <div>5. Intellectual Property Rights</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                All content, features, and functionalities of
                                the CBS Research Group Admin Panel, including
                                but not limited to text, graphics, logos, and
                                software, are the exclusive property of CBS
                                Research Group and are protected by intellectual
                                property laws. Unauthorized use of any material
                                is strictly prohibited.
                            </p>
                        </li>

                        {/* 6. Limitation of Liability */}
                        <li>
                            <div>6. Limitation of Liability</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                The CBS Research Group shall not be liable for
                                any direct, indirect, incidental, or
                                consequential damages arising from your use of
                                the admin panel or your inability to access the
                                panel. Users assume all risks associated with
                                the use of the platform.
                            </p>
                        </li>

                        {/* 7. Modifications to Terms */}
                        <li>
                            <div>7. Modifications to Terms</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                The CBS Research Group reserves the right to
                                modify these Terms and Conditions at any time.
                                Users will be notified of significant changes
                                through the admin panel or via email. Continued
                                use of the panel after modifications constitutes
                                acceptance of the new terms.
                            </p>
                        </li>

                        {/* 9. Contact Information */}
                        <li>
                            <div>9. Contact Information</div>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                For any questions or concerns regarding these
                                Terms and Conditions, please contact us at:
                                <a href='mailto:chinmoyslab@gmail.com' className='text-blue-800 ml-2'>Email: chinmoyslab@gmail.com</a>
                  <li>Address: 
                  Indian Institute of Engineering Science and Technology. Shibpur P.O. - Botanic Garden, Howrah - 711 103 West Bengal, India.
                                </li>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
TacModal.propTypes = {
    closeTerms: PropTypes.func,
};

export default TacModal;
