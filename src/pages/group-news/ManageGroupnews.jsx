import { useEffect, useState } from "react";
import GroupNewsCard from "../../components/single-use/group-news-card/GroupNewsCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";

const ManageGroupnews = () => {
  const [allGroupNews, setAllGroupNews] = useState(null);
  const [loadIng, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.groupNewsUrl);
      output && setAllGroupNews(output);
    };
    fetchData();
  }, []);
  return (
    <main className="bg-gray-50">
      {loadIng === true && <LoadingSpinner />}
      {allGroupNews ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto content-center gap-1 pt-20">
          {allGroupNews &&
            allGroupNews.map((data, index) => (
              <GroupNewsCard
                key={index}
                newsTitle={data.newsTitle}
                newsContent={data.content}
                createDate={data.createdAt}
                updateDate={data.updatedAt}
                updateUrl={`/admin-panel/update-group-news/${data._id}`}
                deleteUrl={`/admin-panel/delete-group-news/${data._id}`}
              />
            ))}
        </div>
      ) : (
        <h1>No group news are available.</h1>
      )}
    </main>
  );
};

export default ManageGroupnews;
