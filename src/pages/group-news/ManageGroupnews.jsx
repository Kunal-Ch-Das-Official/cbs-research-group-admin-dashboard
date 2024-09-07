import { useEffect, useState } from "react";
import GroupNewsCard from "../../components/single-use/group-news-card/GroupNewsCard";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";

const ManageGroupnews = () => {
  const [allGroupNews, setAllGroupNews] = useState(null);
  const [loadIng, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getAllGroupNews = async () => {
      try {
        await axios.get(envConfig.groupNewsUrl).then((res) => {
          setAllGroupNews(res.data);
        });
      } catch (error) {
        console.log(error);
        setAllGroupNews(null);
      } finally {
        setLoading(false);
      }
    };
    getAllGroupNews();
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
