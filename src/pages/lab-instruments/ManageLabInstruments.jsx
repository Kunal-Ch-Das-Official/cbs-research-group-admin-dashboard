import { useEffect, useState } from "react";
import LabInstrumentCard from "../../components/single-use/lab-instrument-card/LabInstrumentCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

const ManageLabInstruments = () => {
  const [allInstruments, setAllInstruments] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.labInstrumntsUrl);
      output && setAllInstruments(output);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-100">
        <Helmet>
                <title>
                    Manage All Instruments | CBS Research Group
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
        heading={"Manage Lab Equipments of CBS Research Group"}
        subHeading={`
       View, update, or delete all lab equipment used by the CBS Research Group, ensuring accurate records and efficient management of resources for research activities.`}
      />
      {loading === true && <LoadingSpinner />}
      {allInstruments && allInstruments.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently lab-instrument details are not available!
        </h2>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-full h-full py-20">
        {allInstruments &&
          allInstruments.map((data, index) => (
            <LabInstrumentCard
              key={index}
              instrumentName={data.instrumentName}
              aboutInstrument={data.description}
              instrumentImage={data.instrumentImage}
              uploadAt={new Date(data.createdAt).toLocaleDateString()}
              updateAt={new Date(data.updatedAt).toLocaleDateString()}
              updateUrl={`/admin-panel/update-lab-instrument/${data._id}`}
              deleteUrl={`/admin-panel/delete-lab-instrument/${data._id}`}
            />
          ))}
      </div>
    </main>
  );
};

export default ManageLabInstruments;
