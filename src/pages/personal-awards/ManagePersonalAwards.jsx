import AwardCard from "../../components/reuseable/awards-card/AwardCard";

import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";

const ManagePersonalAwards = () => {
  const [allAwards, setAllawards] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getAllPersonalAwards = async () => {
      try {
        await axios.get(envConfig.personalAwardsUrl).then((res) => {
          setAllawards(res.data);
        });
      } catch (error) {
        setAllawards(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllPersonalAwards();
  }, []);

  return (
    <main className="bg-gray-100">
      {loading === true && <LoadingSpinner />}

      {allAwards ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto gap-1 pt-28">
          {allAwards &&
            allAwards.map((data, index) => (
              <AwardCard
                key={index}
                id={data._id}
                awardTitle={data.awardTitle}
                recivedDate={data.recivedDate}
                overView={data.recivedFor}
                uploadDate={new Date(data.createdAt).toLocaleDateString()}
                updateDate={new Date(data.updatedAt).toLocaleDateString()}
              />
            ))}
        </div>
      ) : (
        <h1 className="text-gray-500 text-2xl text-center mt-28">
          Awards data is not available.
        </h1>
      )}
    </main>
  );
};

export default ManagePersonalAwards;
