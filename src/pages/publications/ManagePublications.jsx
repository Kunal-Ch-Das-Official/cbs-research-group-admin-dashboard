import { useEffect, useState } from "react";
import PublicationCard from "../../components/single-use/publication-card/PublicationCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

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
 <Helmet>
                <title>
                Manage All Publications | CBS Research Group
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
        heading={"Manage Publication Details of CBS Research Group"}
        subHeading={`
     View, update, or delete all publication details for the CBS Research Group, ensuring accurate and comprehensive records of research contributions and findings.`}
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
