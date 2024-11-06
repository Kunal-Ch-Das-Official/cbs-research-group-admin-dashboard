import { useEffect, useState } from "react";
import GroupNewsCard from "../../components/single-use/group-news-card/GroupNewsCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

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
      <Helmet>
                <title>
                    Manage All Group News | CBS Research Group
                </title>
                <meta name="keywords" content="Researcher" />
                <meta name="keywords" content="Dr. Chinmoy Bhattacharya" />
                <meta
                    name="keywords"
                    content="Indian Institute of Engineering Science and Technology"
                />
                <meta name="keywords" content="IIEST" />
                <meta name="keywords" content="Shibpur" />
                <meta name="keywords" content="Electrochemistry" />
                <meta name="keywords" content="Materials Chemistry" />
                <meta name="keywords" content="Photoelectrochemical" />
                <meta name="keywords" content="Solar Cells" />

                <meta
                    name="description"
                    content="Joined the Institute as Assistant Professor , Department of Chemistry, Indian Institute of Engineering Science & Technology, Shibpur (formerly, BESUS) Howrah – 711 103, West Bengal on 23rd June 2006. Promoted to Associate Professor, Department of Chemistry, IIESTS on 22nd Feb. 2019."
                />
                <meta
                    name="location"
                    content="IIEST, Shibpur is located in Howrah— just across the River Hoogly from the city of Kolkata. It is well connected to other parts of the country by road, rail and air. The campus is situated adjacent to the A.J.C. Bose Indian Botanic Garden which boasts of the 250-year-old Great Banyan Tree.
It takes around 20 minutes to reach IIEST, Shibpur from the heart of the city and approximately 90 minutes from the airport. The Howrah Railway Station is about 5 kms away from the institute."
                />
            </Helmet>
      <SectionHeading
        heading={"Manage Current News of CBS Research Group"}
        subHeading={`
        View, update, or delete all current news articles for the CBS Research Group, ensuring relevant information is accurately presented and easily accessible.`}
      />
      {loadIng === true && <LoadingSpinner />}
      {allGroupNews && allGroupNews.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently group news are not available!
        </h2>
      ) : (
        ""
      )}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
         mx-auto content-center gap-1 py-16"
      >
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
      )
    </main>
  );
};

export default ManageGroupnews;
