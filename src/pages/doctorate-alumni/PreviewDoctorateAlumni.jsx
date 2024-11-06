import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
import { getSingleData } from "../../../operations/apis/getSingleData";
import { Helmet } from "react-helmet";
const PreviewDoctorateAlumni = () => {
  const { id } = useParams();
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.doctorateAlumniUrl,
        id
      );
      response && setAlumniInfo(response);
    };
    fetchReqData();
  }, [id]);

  return (
    <>
        <Helmet>
                <title>
                    Overview Doctorate Alumnus Profile | CBS Research Group
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
      {loading === true && <LoadingSpinner />}
      {alumniInfo ? (
        <StudentPreview
          studentName={alumniInfo.alumniName}
          profileImageUrl={alumniInfo.profilePicture}
          previewHeading={"Doctorate Alumnus"}
          googleScholarId={alumniInfo.googleScholarId}
          researchGateId={alumniInfo.researchGateId}
          emailId={alumniInfo.emailId}
          phoneNumber={alumniInfo.phoneNumber}
          bscCollege={alumniInfo.bscDoneFrom}
          mscCollege={alumniInfo.mscDoneFrom}
          yearOfPassout={alumniInfo.yearOfPassout}
          currentYear={null}
          aboutInfo={alumniInfo.details}
          goBackLink={"/admin-panel/manage-doctorate-alumni"}
        />
      ) : (
        <h1 className="text-gray-500 text-center text-2xl font-bold pt-24">
          Alumnus details are not available!
        </h1>
      )}
    </>
  );
};

export default PreviewDoctorateAlumni;
