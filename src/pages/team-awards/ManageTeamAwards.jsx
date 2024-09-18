import AwardCard from "../../components/reuseable/awards-card/AwardCard";
import { useEffect, useState } from "react";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";

const ManageTeamAwards = () => {
  const [allAwards, setAllawards] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.teamAwardsUrl);
      output && setAllawards(output);
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
      {loading === true && <LoadingSpinner />}

      {allAwards ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto gap-1 py-20">
          {allAwards &&
            allAwards.map((data, index) => (
              <AwardCard
                key={index}
                updateUrl={`/admin-panel/update-team-award/${data._id}`}
                deleteUrl={`/admin-panel/delete-team-award/${data._id}`}
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

export default ManageTeamAwards;
