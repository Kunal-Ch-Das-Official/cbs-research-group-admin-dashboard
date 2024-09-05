import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import MscMembersCard from "../../components/single-use/msc-members-card/MscMembersCard";

const ManageMscMembers = () => {
  const [membersInfo, setMembersInfo] = useState(null);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    const getMscMembersData = async () => {
      try {
        await axios.get(envConfig.mscMembersUrl).then((res) => {
          setMembersInfo(res.data);
        });
      } catch (error) {
        setMembersInfo(error.response.data);
      } finally {
        setLoding(false);
      }
    };
    getMscMembersData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 w-full mx-auto bg-gray-100 pt-28">
      {loading === true && <LoadingSpinner />}
      <>
        {membersInfo &&
          membersInfo.map((data, index) => (
            <MscMembersCard
              key={index}
              id={data._id}
              membersName={data.memberName}
              googleSchollarUrl={data.googleScholarId}
              researchGateUrl={data.researchGateId}
              membersImageUrl={data.profilePicture}
              membersEmail={data.emailId}
              contactNumberOfMember={data.phoneNumber}
              PreviousCollege={data.bscDoneFrom}
              currentYear={data.currentYear}
              uploadDate={new Date(data.createdAt).toLocaleDateString()}
              updateDate={new Date(data.updatedAt).toLocaleDateString()}
            />
          ))}
      </>
    </div>
  );
};

export default ManageMscMembers;
