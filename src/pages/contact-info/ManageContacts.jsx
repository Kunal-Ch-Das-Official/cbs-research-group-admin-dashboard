import { useEffect, useState } from "react";
import ContactInfoCard from "../../components/single-use/contact-info-card/ContactInfoCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

const ManageContacts = () => {
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
    <main className="bg-gray-50 ">

<Helmet>
                <title>Manage All Contact Inquiries | CBS Research Group</title>
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


      {loading && <LoadingSpinner />}
      <SectionHeading
        heading={"Contact Us: Manage Inquiries"}
        subHeading={`View and manage all contact applications submitted to the CBS Research Group. You can respond and connect with applicants via email for seamless communication.`}
      />
      {allContactData && allContactData.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently contact applications box is empty!
        </h2>
      ) : (
        ""
      )}

      <div className="py-20">
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
    </main>
  );
};

export default ManageContacts;
