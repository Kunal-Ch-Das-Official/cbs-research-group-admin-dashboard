import { useEffect, useState } from "react";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import StudentCard from "../../components/reuseable/students-card/StudentCard";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";

const ManageDoctorateAlumni = () => {
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.doctorateAlumniUrl);
      output && setAlumniInfo(output);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50">
      <SectionHeading
        heading={"Manage All Details"}
        subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
      />
      {alumniInfo && alumniInfo.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently alumni details are not available!
        </h2>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 w-full mx-auto py-20">
        {loading === true && <LoadingSpinner />}
        <>
          {alumniInfo &&
            alumniInfo.map((data, index) => (
              <StudentCard
                key={index}
                requiredName={data.alumniName}
                googleSchollarUrl={data.googleScholarId}
                researchGateUrl={data.researchGateId}
                ImageUrl={data.profilePicture}
                EmailId={data.emailId}
                contactNumber={data.phoneNumber}
                PreviousCollege={data.bscDoneFrom}
                PreviousMastersCollege={data.mscDoneFrom}
                passwoutYear={data.yearOfPassout}
                currentYear={null}
                uploadDate={new Date(data.createdAt).toLocaleDateString()}
                updateDate={new Date(data.updatedAt).toLocaleDateString()}
                previewRouteLink={`/admin-panel/preview-doctorate-alumni/${data._id}`}
                updateRouteLink={`/admin-panel/update-doctorate-alumni/${data._id}`}
                deleteRouteLink={`/admin-panel/delete-doctorate-alumni/${data._id}`}
              />
            ))}
        </>
      </div>
    </main>
  );
};

export default ManageDoctorateAlumni;
