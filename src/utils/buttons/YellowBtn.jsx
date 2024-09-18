import PropTypes from "prop-types";

const YellowBtn = ({ btnType, eventHandler, btnText, icon }) => {
  return (
    <button
      onClick={eventHandler}
      type={btnType}
      className="w-full my-3 text-black bg-[#f7ca00] hover:bg-[#c1a630] shadow-md hover:shadow-xl
      focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold
      rounded-lg text-md px-5 py-2.5 text-center inline-flex 
      justify-center  items-center transform translate-1 hover:scale-95"
    >
      <span>{btnText}</span>
      <span className="text-2xl ml-2">{icon}</span>
    </button>
  );
};
YellowBtn.propTypes = {
  btnType: PropTypes.string,
  eventHandler: PropTypes.func || null,
  btnText: PropTypes.string,
  icon: PropTypes.element,
};
export default YellowBtn;
