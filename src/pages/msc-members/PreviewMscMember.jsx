import { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
import { useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
const PreviewMscMember = () => {
  const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.mscMembersUrl,
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
          previewHeading={"MSC Member"}
          googleScholarId={memberInfo.googleScholarId}
          researchGateId={memberInfo.researchGateId}
          emailId={memberInfo.emailId}
          phoneNumber={memberInfo.phoneNumber}
          bscCollege={memberInfo.bscDoneFrom}
          mscCollege={null}
          yearOfPassout={null}
          currentYear={memberInfo.currentYear}
          aboutInfo={memberInfo.details}
          goBackLink={"/admin-panel/manage-msc-members"}
        />
      ) : (
        <h1 className="text-gray-500 text-center text-2xl font-bold mt-24">
          Alumni details are not available!
        </h1>
      )}
    </>
  );
};

export default PreviewMscMember;
