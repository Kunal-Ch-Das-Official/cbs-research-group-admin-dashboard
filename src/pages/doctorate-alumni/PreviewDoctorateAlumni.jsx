import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
const PreviewDoctorateAlumni = () => {
  const { id } = useParams();
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchSingleAlumni = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${envConfig.doctorateAlumniUrl}/${id}`);
        setAlumniInfo(res.data);
      } catch (error) {
        console.error(error);
        setAlumniInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleAlumni();
  }, [id]);

  return (
    <>
      {loading === true && <LoadingSpinner />}
      {alumniInfo ? (
        <StudentPreview
          studentName={alumniInfo.alumniName}
          profileImageUrl={alumniInfo.profilePicture}
          previewHeading={"Doctorate Alumni"}
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
          Alumni details are not available!
        </h1>
      )}
    </>
  );
};

export default PreviewDoctorateAlumni;
