import { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
import { useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
const PreviewMastersAlumni = () => {
  const { id } = useParams();
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.mastersAlumniUrl,
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
          previewHeading={"Masters Alumni"}
          googleScholarId={alumniInfo.googleScholarId}
          researchGateId={alumniInfo.researchGateId}
          emailId={alumniInfo.emailId}
          phoneNumber={alumniInfo.phoneNumber}
          bscCollege={alumniInfo.bscDoneFrom}
          mscCollege={null}
          yearOfPassout={alumniInfo.yearOfPassout}
          currentYear={null}
          aboutInfo={alumniInfo.details}
          goBackLink={"/admin-panel/manage-masters-alumni"}
        />
      ) : (
        <h1 className="text-gray-500 text-center text-2xl font-bold mt-24">
          Alumni details are not available!
        </h1>
      )}
    </>
  );
};

export default PreviewMastersAlumni;
