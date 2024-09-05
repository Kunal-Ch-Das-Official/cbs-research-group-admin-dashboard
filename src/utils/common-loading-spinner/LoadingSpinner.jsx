// Project: CBS Research Group Admin Dashboard
// Content: Common Loading ui
// Date: 29/08/2024

import spinnerStyle from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div
      className={`min-h-screen ${spinnerStyle.overlay} fixed inset-0 px-4 flex-wrap justify-center items-center w-full h-full z-[9999] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto`}
    >
      <div className={`${spinnerStyle.loader} relative top-72 mx-auto`}></div>
    </div>
  );
};

export default LoadingSpinner;
