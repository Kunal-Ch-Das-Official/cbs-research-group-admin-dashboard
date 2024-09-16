import { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
import { useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
const PreviewPhdMember = () => {
  const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.phdMembersUrl,
        id
      );
      response && setMemberInfo(response);
    };
    fetchReqData();
  }, [id]);

  return (
    <>
      {loading === true && <LoadingSpinner />}
      {memberInfo ? (
        <StudentPreview
          studentName={memberInfo.memberName}
          profileImageUrl={memberInfo.profilePicture}
          previewHeading={"PHD Member"}
          googleScholarId={memberInfo.googleScholarId}
          researchGateId={memberInfo.researchGateId}
          emailId={memberInfo.emailId}
          phoneNumber={memberInfo.phoneNumber}
          bscCollege={memberInfo.bscDoneFrom}
          mscCollege={memberInfo.mscDoneFrom}
          yearOfPassout={null}
          currentYear={memberInfo.currentYear}
          aboutInfo={memberInfo.details}
          goBackLink={"/admin-panel/manage-phd-members"}
        />
      ) : (
        <h1 className="text-gray-500 text-center text-2xl font-bold mt-24">
          Alumni details are not available!
        </h1>
      )}
    </>
  );
};

export default PreviewPhdMember;
