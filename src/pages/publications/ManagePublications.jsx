import { useEffect, useState } from "react";
import PublicationCard from "../../components/single-use/publication-card/PublicationCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";

const ManagePublications = () => {
  const [allPublication, setAllPublication] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.publicationsUrl);
      output && setAllPublication(output);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">
      <SectionHeading
        heading={"Manage All Details"}
        subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
      />
      {allPublication && allPublication.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently publication contents are not available!
        </h2>
      ) : (
        ""
      )}
      {loading === true && <LoadingSpinner />}

      <div className="py-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
        {allPublication &&
          allPublication.map((data, index) => (
            <PublicationCard
              key={index}
              titile={data.title}
              uplodDate={data.createdAt}
              contributer={data.contributer}
              thumbnailUrl={data.publicationThumbnail}
              previewUrl={`/admin-panel/preview-publication/${data._id}`}
              updateUrl={`/admin-panel/update-publication/${data._id}`}
              deleteUrl={`/admin-panel/delete-publication/${data._id}`}
            />
          ))}
      </div>
    </main>
  );
};

export default ManagePublications;
