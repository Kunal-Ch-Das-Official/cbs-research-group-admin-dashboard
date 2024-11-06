import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import CustomModel from "../../utils/custom-models/CustomModel";
import { getSingleData } from "../../../operations/apis/getSingleData";
import TextInput from "../../utils/inputs/TextInput";
import FileInput from "../../utils/inputs/FileInput";
import TransparentLink from "../../utils/custom-link/TransparentLink";
import YellowBtn from "../../utils/buttons/YellowBtn";
import { TbNotes, TbNotesOff } from "react-icons/tb";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

const UpdateLabInstrument = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [getPrevData, setPrevData] = useState(null);
  const [instrumentName, setInstrumentName] = useState("");
  const [aboutInstrument, setAboutInstrument] = useState("");
  const [instrumentImage, setInstrumentImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    message: null,
    details: null,
    statusIcon: null,
    buttonColor: null,
  });

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.labInstrumntsUrl,
        id
      );
      response && setPrevData(response);
    };
    fetchReqData();
  }, [id]);

  const updateLabInstrumentHandler = async (e) => {
    e.preventDefault();
    const updatedInstrumentForm = new FormData();

    updatedInstrumentForm.append("instrumentName", instrumentName);
    updatedInstrumentForm.append("instrumentImage", instrumentImage);
    updatedInstrumentForm.append("description", aboutInstrument);

    try {
      setLoading(true);
      const authToken = localStorage.getItem("auth-token");
      const adminToken = localStorage.getItem("admin-token");
      const token = authToken || adminToken;
      await axios
        .patch(`${envConfig.labInstrumntsUrl}/${id}`, updatedInstrumentForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCustomAlert({
            message: res.data.message,
            details: res.data.details,
            statusIcon: (
              <MdDownloadDone className="text-4xl font-bold text-green-600" />
            ),
            buttonColor: "bg-green-600",
          });
        });
    } catch (error) {
      setCustomAlert({
        message: error.response.data.details,
        details: error.response.data.issue,
        statusIcon: <FcCancel className="text-4xl font-bold text-red-600" />,
        buttonColor: "bg-red-600",
      });
    } finally {
      setLoading(false);
      setShowAlert(true);
    }
  };
  const closeModelHandler = () => {
    setShowAlert(false);
    navigate("/admin-panel/manage-lab-instruments");
  };
  return (
    <main className="bg-gray-50">
        <Helmet>
                <title>
                    Edit Instrument | CBS Research Group
                </title>
                <meta name="keywords" content="Researcher" />
                <meta name="keywords" content="Dr. Chinmoy Bhattacharya" />
                <meta
                    name="keywords"
                    content="Indian Institute of Engineering Science and Technology"
                />
                <meta name="keywords" content="IIEST" />
                <meta name="keywords" content="Shibpur" />
                <meta name="keywords" content="Electrochemistry" />
                <meta name="keywords" content="Materials Chemistry" />
                <meta name="keywords" content="Photoelectrochemical" />
                <meta name="keywords" content="Solar Cells" />

                <meta
                    name="description"
                    content="Joined the Institute as Assistant Professor , Department of Chemistry, Indian Institute of Engineering Science & Technology, Shibpur (formerly, BESUS) Howrah – 711 103, West Bengal on 23rd June 2006. Promoted to Associate Professor, Department of Chemistry, IIESTS on 22nd Feb. 2019."
                />
                <meta
                    name="location"
                    content="IIEST, Shibpur is located in Howrah— just across the River Hoogly from the city of Kolkata. It is well connected to other parts of the country by road, rail and air. The campus is situated adjacent to the A.J.C. Bose Indian Botanic Garden which boasts of the 250-year-old Great Banyan Tree.
It takes around 20 minutes to reach IIEST, Shibpur from the heart of the city and approximately 90 minutes from the airport. The Howrah Railway Station is about 5 kms away from the institute."
                />
            </Helmet>
      <SectionHeading
        heading={"Update This Lab Equipment of CBS Research Group"}
        subHeading={`
         Update details of "${getPrevData && getPrevData.instrumentName}" used by CBS Research Group team.`}
      />
      {loading === true && <LoadingSpinner />}
      {showAlert === true && (
        <CustomModel
          buttonText={"Got it"}
          showOrHide={showAlert === true ? "flex" : "hidden"}
          closeButton={closeModelHandler}
          statusIcon={customAlert.statusIcon}
          alertHead={customAlert.message}
          message1={customAlert.details}
          buttonColor={customAlert.buttonColor}
        />
      )}
      <div className="flex justify-center item-center py-10">
        <div className="w-full md:w-1/2 lg:w-1/2 m-1 mx-auto">
          <form
            className="w-full bg-white shadow-md p-6"
            onSubmit={updateLabInstrumentHandler}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6">
                <TextInput
                  inputLabel={"Instruement name"}
                  defaultText={getPrevData && getPrevData.instrumentName}
                  textValue={setInstrumentName}
                  placeHolderText={null}
                  isRequired={false}
                  fieldId={"labInstrumentUpdate"}
                />
              </div>
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase text-gray-500 text-sm font-bold mb-2"
                  htmlFor="instrumentDetails"
                >
                  Instruement details
                </label>
                <textarea
                  id="instrumentDetails"
                  defaultValue={getPrevData && getPrevData.description}
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border pl-2 pt-2 border-gray-400 rounded-lg"
                  onChange={(e) => setAboutInstrument(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col w-full">
                <YellowBtn
                  btnType={"submit"}
                  eventHandler={null}
                  btnText={"Update Instrument"}
                  icon={<TbNotes />}
                />

                <TransparentLink
                  path={"/admin-panel/manage-lab-instruments"}
                  linkText={"Cancel"}
                  icon={<TbNotesOff />}
                />
              </div>

              <div className="flex items-center justify-center w-full mb-4">
                <FileInput
                  givenFile={instrumentImage}
                  fileName={instrumentImage && instrumentImage.name}
                  fileSize={instrumentImage && instrumentImage.size}
                  setFile={setInstrumentImage}
                  isRequired={false}
                  previousImage={getPrevData && getPrevData.instrumentImage}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateLabInstrument;
