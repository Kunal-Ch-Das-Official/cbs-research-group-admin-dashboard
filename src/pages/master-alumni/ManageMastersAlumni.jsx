import React, { useEffect, useState } from "react";
import MastersAlumniCard from "../../components/reuseable/masters-alumni-card/MastersAlumniCard";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";

const ManageMastersAlumni = () => {
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    const getMastersAlumniData = async () => {
      try {
        await axios.get(envConfig.mastersAlumniUrl).then((res) => {
          setAlumniInfo(res.data);
        });
      } catch (error) {
        setApiResponse(error.response.data);
      } finally {
        setLoding(false);
      }
    };
    getMastersAlumniData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 w-full mx-auto bg-gray-100 pt-28">
      {loading === true && <LoadingSpinner />}
      <>
        {alumniInfo &&
          alumniInfo.map((data, index) => (
            <MastersAlumniCard
              key={index}
              id={data._id}
              alumniName={data.alumniName}
              googleSchollarUrl={data.googleScholarId}
              researchGateUrl={data.researchGateId}
              alumniImageUrl={data.profilePicture}
              alumniEmail={data.emailId}
              contactNumberOfAlumni={data.phoneNumber}
              PreviousCollege={data.bscDoneFrom}
              passoutYear={data.yearOfPassout}
              uploadDate={new Date(data.createdAt).toLocaleDateString()}
              updateDate={new Date(data.updatedAt).toLocaleDateString()}
            />
          ))}
      </>
    </div>
  );
};

export default ManageMastersAlumni;
