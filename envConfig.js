/* 
Project: CBS Research Group Admin Dashboard
Content: Application environment parser
Date: 29/08/2024 
*/

const environment = {
  loginUrl: import.meta.env.VITE_APP_ADMIN_LOGIN_URL,
  passwordResetLinkSend: import.meta.env.VITE_APP_PASSWORD_RESET_LINK_SEND_URL,
};

const envConfig = Object.freeze(environment);
export default envConfig;
