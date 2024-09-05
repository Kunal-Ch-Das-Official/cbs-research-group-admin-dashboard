import spinnerStyle from "./ComponentLoading.module.css";
const ComponentLoading = () => {
  return (
    <div className="mx-auto">
      <div className={spinnerStyle.loader}></div>
    </div>
  );
};

export default ComponentLoading;
