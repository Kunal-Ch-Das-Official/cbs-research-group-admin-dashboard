import { Link } from "react-router-dom";
import footerLogo from "../../../assets/CBS Research Group Logo.png";
const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600"></div>
        <div className="flex justify-center">
          <Link to={"/admin-panel"}>
          <img src={footerLogo} alt="footerLogo" width={100} height={100} /></Link>
        </div>
        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Copyright © {new Date().getFullYear()} - All right reserved | Powered by CBS Research group.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="mailto:kunalchandradasofficial@gmail.com"
            >
              {" "}
              Help{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="tel:9874353723"
            >
              {" "}
              Contact{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="https://github.com/Kunal-Ch-Das-Official/cbs-research-group-admin-dashboard/issues"
              target="_blank"
            >
              {" "}
              Report Bug{" "}
            </a>
          </li>

          <li>
            <a 
               href={`https://www.kunalchandradas.tech`}
                  target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
              
            >
              {" "}
              Review{" "}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
