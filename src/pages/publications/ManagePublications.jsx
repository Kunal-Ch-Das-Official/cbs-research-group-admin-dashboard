import { useEffect, useState } from "react";
import PublicationCard from "../../components/single-use/publication-card/PublicationCard";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";

const ManagePublications = () => {
  const [allPublication, setAllPublication] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getAllPublication = async () => {
      try {
        await axios.get(envConfig.publicationsUrl).then((res) => {
          setAllPublication(res.data);
        });
      } catch (error) {
        setAllPublication(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllPublication();
  }, []);
  return (
    <main className="bg-gray-50 min-h-screen">
      {loading === true && <LoadingSpinner />}
      {allPublication ? (
        <div className="pt-28 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
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
      ) : (
        <h2 className="text-center text-gray-500 pt-28 font-bold">
          Publications are not available.
        </h2>
      )}
    </main>
  );
};

export default ManagePublications;