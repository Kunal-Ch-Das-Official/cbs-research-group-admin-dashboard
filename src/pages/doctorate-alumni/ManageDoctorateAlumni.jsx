import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import DoctorateAlumnicard from "../../components/reuseable/doctorate-alumni-card/DoctorateAlumnicard";

const ManageDoctorateAlumni = () => {
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    const getDoctorateAlumniData = async () => {
      try {
        await axios.get(envConfig.doctorateAlumniUrl).then((res) => {
          setAlumniInfo(res.data);
        });
      } catch (error) {
        setAlumniInfo(null);
        console.log(error);
      } finally {
        setLoding(false);
      }
    };
    getDoctorateAlumniData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 w-full mx-auto bg-gray-100 pt-28">
      {loading === true && <LoadingSpinner />}
      <>
        {alumniInfo &&
          alumniInfo.map((data, index) => (
            <DoctorateAlumnicard
              key={index}
              id={data._id}
              alumniName={data.alumniName}
              googleSchollarUrl={data.googleScholarId}
              researchGateUrl={data.researchGateId}
              alumniImageUrl={data.profilePicture}
              alumniEmail={data.emailId}
              contactNumberOfAlumni={data.phoneNumber}
              PreviousCollege={data.bscDoneFrom}
              PreviousMastersCollege={data.mscDoneFrom}
              passoutYear={data.yearOfPassout}
              uploadDate={new Date(data.createdAt).toLocaleDateString()}
              updateDate={new Date(data.updatedAt).toLocaleDateString()}
            />
          ))}
      </>
    </div>
  );
};

export default ManageDoctorateAlumni;
