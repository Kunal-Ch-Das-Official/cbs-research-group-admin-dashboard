import { useEffect, useState } from "react";
import LabInstrumentCard from "../../components/single-use/lab-instrument-card/LabInstrumentCard";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";

const ManageLabInstruments = () => {
  const [allInstruments, setAllInstruments] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllInstruments = async () => {
      setLoading(true);
      try {
        await axios.get(envConfig.labInstrumntsUrl).then((res) => {
          setAllInstruments(res.data);
        });
      } catch (error) {
        setAllInstruments(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllInstruments();
  }, []);
  return (
    <main className="bg-gray-100 pt-20">
      {loading === true && <LoadingSpinner />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto">
        {allInstruments ? (
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
          ))
        ) : (
          <h2 className="text-2xl mt-28 text-gray-500 font-bold text-center">
            Lab Instruments are not available
          </h2>
        )}
      </div>
    </main>
  );
};

export default ManageLabInstruments;
