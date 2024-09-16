import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
import { getSingleData } from "../../../operations/apis/getSingleData";
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
