import { useEffect, useState } from "react";
import LabInstrumentCard from "../../components/single-use/lab-instrument-card/LabInstrumentCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";

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
      <SectionHeading
        heading={"Manage All Details"}
        subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
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
