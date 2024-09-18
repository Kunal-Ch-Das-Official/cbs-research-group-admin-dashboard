import { useEffect, useState } from "react";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import StudentCard from "../../components/reuseable/students-card/StudentCard";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";

const ManageMscMembers = () => {
  const [membersInfo, setMembersInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.mscMembersUrl);
      output && setMembersInfo(output);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <SectionHeading
        heading={"Manage All Details"}
        subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
      />
      {membersInfo && membersInfo.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently member details are not available!
        </h2>
      ) : (
        ""
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
     gap-1 w-full mx-auto py-20"
      >
        {loading === true && <LoadingSpinner />}
        <>
          {membersInfo &&
            membersInfo.map((data, index) => (
              <StudentCard
                key={index}
                requiredName={data.memberName}
                googleSchollarUrl={data.googleScholarId}
                researchGateUrl={data.researchGateId}
                ImageUrl={data.profilePicture}
                EmailId={data.emailId}
                contactNumber={data.phoneNumber}
                PreviousCollege={data.bscDoneFrom}
                PreviousMastersCollege={null}
                passwoutYear={null}
                currentYear={data.currentYear}
                uploadDate={new Date(data.createdAt).toLocaleDateString()}
                updateDate={new Date(data.updatedAt).toLocaleDateString()}
                previewRouteLink={`/admin-panel/preview-msc-member/${data._id}`}
                updateRouteLink={`/admin-panel/update-msc-member/${data._id}`}
                deleteRouteLink={`/admin-panel/delete-msc-member/${data._id}`}
              />
            ))}
        </>
      </div>
    </main>
  );
};

export default ManageMscMembers;
