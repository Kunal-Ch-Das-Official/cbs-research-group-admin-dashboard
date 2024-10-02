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

  becomeAdminUsersRequestUrl: import.meta.env
    .VITE_APP_BECOME_ADMIN_REQUEST_USERS_URL,

  becomeAdminReqApprovedUrl: import.meta.env
    .VITE_APP_BECOME_ADMIN_REQUEST_APPROVED_URL,

  becomeAdminRequestRejectedUrl: import.meta.env
    .VITE_APP_BECOME_ADMIN_REQUEST_REJECTED_URL,

  mastersAlumniUrl: import.meta.env.VITE_APP_MASTERS_ALUMNI_URL,

  doctorateAlumniUrl: import.meta.env.VITE_APP_DOCTORATE_ALUMNI_URL,

  mscMembersUrl: import.meta.env.VITE_APP_MSC_MEMBERS_URL,

  phdMembersUrl: import.meta.env.VITE_APP_PHD_MEMBERS_URL,

  personalAwardsUrl: import.meta.env.VITE_APP_PERSONAL_AWARDS_URL,

  teamAwardsUrl: import.meta.env.VITE_APP_TEAM_AWARDS_URL,

  labInstrumntsUrl: import.meta.env.VITE_APP_LAB_INSTRUMENTS_URL,

  groupNewsUrl: import.meta.env.VITE_APP_GROUP_NEWS_URL,

  contactFormDataUrl: import.meta.env.VITE_APP_CONTACT_PERSONS_INFO_URL,

  contactApplicationResUrl: import.meta.env
    .VITE_APP_SEND_CONTACT_APPLICATION_RESPONSE_MAIL_URL,

  projectsUrl: import.meta.env.VITE_APP_PROJECTS_URL,

  publicationsUrl: import.meta.env.VITE_APP_PUBLICATION_URL,
  dashboardInfoUrl: import.meta.env.VITE_APP_DASHBOARD_URL,
  allAdminUsers: import.meta.env.VITE_APP_ALL_LOGGED_IN_USER_INFO_URL,
};

const envConfig = Object.freeze(environment);
export default envConfig;
