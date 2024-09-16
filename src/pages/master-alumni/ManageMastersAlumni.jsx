import { useEffect, useState } from "react";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import StudentCard from "../../components/reuseable/students-card/StudentCard";
import { getAllData } from "../../../operations/apis/getAllData";

const ManageMastersAlumni = () => {
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.mastersAlumniUrl);
      output && setAlumniInfo(output);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 w-full mx-auto bg-gray-100 pt-28">
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
              PreviousMastersCollege={null}
              passwoutYear={data.yearOfPassout}
              currentYear={null}
              uploadDate={new Date(data.createdAt).toLocaleDateString()}
              updateDate={new Date(data.updatedAt).toLocaleDateString()}
              previewRouteLink={`/admin-panel/preview-masters-alumni/${data._id}`}
              updateRouteLink={`/admin-panel/update-masters-alumni/${data._id}`}
              deleteRouteLink={`/admin-panel/delete-masters-alumni/${data._id}`}
            />
          ))}
      </>
    </div>
  );
};

export default ManageMastersAlumni;
