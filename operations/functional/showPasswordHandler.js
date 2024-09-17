const showPasswordHandler = (target) => {
  const getPassword = document.getElementById(target);
  getPassword.type = getPassword.type === "password" ? "text" : "password";
};

export default showPasswordHandler;
