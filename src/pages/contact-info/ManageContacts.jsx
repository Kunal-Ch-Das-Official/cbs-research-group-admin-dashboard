import { useEffect, useState } from "react";
import ContactInfoCard from "../../components/single-use/contact-info-card/ContactInfoCard";
import axios from "../../../axios/axios";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";

const ManageContacts = () => {
  const [allContactData, setAllContactData] = useState(null);
  const [getRecivedTimes, setRecivedTimes] = useState([]); // Changed to plural to hold multiple times
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("auth-token") || null;
        const adminToken = localStorage.getItem("admin-token") || null;
        const token = authToken || adminToken;
        const res = await axios.get(envConfig.contactFormDataUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllContactData(res.data);
      } catch (error) {
        setAllContactData(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
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
    <>
      {loading && <LoadingSpinner />}
      {allContactData ? (
        <div className="bg-gray-50 pt-20">
          {allContactData.map((data, index) => (
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
      ) : (
        <h2 className="text-center pt-20 text-gray-500 text-2xl font-bold">
          Contact details are not available.
        </h2>
      )}
    </>
  );
};

export default ManageContacts;
