import PropTypes from "prop-types";

const SectionHeading = ({ heading, subHeading }) => {
  return (
    <div className="text-center pt-24">
      <h1 className="text-2xl text-gray-500 font-bold">{heading}</h1>
      <p className="flex flex-wrap flex-col mx-10 lg:mx-40 mt-2">{subHeading}</p>
    </div>
  );
};
SectionHeading.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
export default SectionHeading;
