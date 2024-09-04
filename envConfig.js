/* 
Project: CBS Research Group Admin Dashboard
Content: Application environment parser
Date: 29/08/2024 
*/

const environment = {
  loginUrl: import.meta.env.VITE_APP_ADMIN_LOGIN_URL,
  passwordResetLinkSend: import.meta.env.VITE_APP_PASSWORD_RESET_LINK_SEND_URL,
  resetPassword: import.meta.env.VITE_APP_PASSWORD_RESET_URL,
  becomeAdminRequestUrl: import.meta.env.VITE_APP_BECOME_ADMIN_REQUEST_URL,
  getCurrentLoggedInAdmin: import.meta.env.VITE_APP_GET_CURRENT_LOGGED_IN_ADMIN,
  registerAdminUrl: import.meta.env.VITE_APP_ADMIN_REGISTRATION_URL,
  changePasswordUrl: import.meta.env.VITE_APP_CHANGE_PASSWORD_URL,
  becomeAdminRequestUrl: import.meta.env
    .VITE_APP_BECOME_ADMIN_REQUEST_USERS_URL,
  becomeAdminReqApprovedUrl: import.meta.env
    .VITE_APP_BECOME_ADMIN_REQUEST_APPROVED_URL,
  becomeAdminRequestRejectedUrl: import.meta.env
    .VITE_APP_BECOME_ADMIN_REQUEST_REJECTED_URL,
  mastersAlumniUrl: import.meta.env.VITE_APP_MASTERS_ALUMNI_URL,
};

const envConfig = Object.freeze(environment);
export default envConfig;
