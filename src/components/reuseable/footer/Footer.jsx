import footerLogo from "../../../assets/CBS Research Group Logo.png";
const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600"></div>
        <div className="flex justify-center">
          <img src={footerLogo} alt="footerLogo" width={100} height={100} />
        </div>
        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              About{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Careers{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              History{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Services{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Projects{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Blog{" "}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
