import { useEffect, useState } from "react";
import envConfig from "../../../../envConfig";
import { getAllData } from "../../../../operations/apis/getAllData";
import GetCurrentAdmin from "../get-current-loggedin-admin/GetCurrentAdmin";
import ContactInfoCard from "../contact-info-card/ContactInfoCard";
import ComponentLoading from "../../../utils/component-loading/ComponentLoading";

const DashBoardBody = () => {
  const [allContactData, setAllContactData] = useState(null);
  const [getRecivedTimes, setRecivedTimes] = useState([]); // Changed to plural to hold multiple times
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.contactFormDataUrl);
      output && setAllContactData(output);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allContactData) {
      const formattedTimes = allContactData.map((data) => {
        const isoDate = data.createdAt;
        const date = new Date(isoDate);

        // Convert to Indian Standard Time (IST) by adding 5 hours and 30 minutes
        const istOffset = 5.5 * 60; // IST is UTC+5:30 in minutes
        const istDate = new Date(date.getTime() + istOffset * 60 * 1000);

        // Get hours and convert to 12-hour format
        let hours = istDate.getUTCHours();
        const minutes = istDate.getUTCMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert '0' hour to '12' in 12-hour format

        // Format time string
        return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
      });

      // Set all formatted times in state at once
      setRecivedTimes(formattedTimes);
    }
  }, [allContactData]); // Remove getRecivedTime from dependencies

  return (
    <div>
      {loading === true && <ComponentLoading />}
      <main className="container mx-auto py-4">
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="py-12">
              <GetCurrentAdmin />
            </div>
            <div className="lg:col-span-2 border border-gray-300 px-6 h-[200px] overflow-y-scroll overflow-x-hidden mt-0 lg:mt-12 rounded-lg bg-white">
              {allContactData &&
                allContactData.map((data, index) => (
                  <ContactInfoCard
                    key={index}
                    id={data._id}
                    customerName={data.userName}
                    providedEmail={data.emailId}
                    providedNumber={data.phoneNumber}
                    submitionTime={getRecivedTimes[index]} // Use index to get the correct time
                    submitionDate={data.createdAt}
                    preViewUrl={`/admin-panel/preview-contacts/${data._id}`}
                    deleteUrl={`/admin-panel/delete-contacts/${data._id}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoardBody;
