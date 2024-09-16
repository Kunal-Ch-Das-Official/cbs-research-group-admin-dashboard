import { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
import { useParams } from "react-router-dom";
const PreviewMscMember = () => {
  const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchSingleMember = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${envConfig.mscMembersUrl}/${id}`);
        setMemberInfo(res.data);
      } catch (error) {
        console.error(error);
        setMemberInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleMember();
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
