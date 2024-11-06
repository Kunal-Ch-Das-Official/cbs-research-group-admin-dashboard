import { useEffect, useState } from "react";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import StudentCard from "../../components/reuseable/students-card/StudentCard";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

const ManagePhdMembers = () => {
  const [membersInfo, setMembersInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.phdMembersUrl);
      output && setMembersInfo(output);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
 <Helmet>
                <title>
                Manage All PHd Member&apos;s Profile | CBS Research Group
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
        heading={"Manage PHd Members of CBS Research Group"}
        subHeading={`View, update, or delete profiles of all PHd students in the CBS Research Group, ensuring accurate records and efficient management of student information.`}
      />
      {membersInfo && membersInfo.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently member details are not available!
        </h2>
      ) : (
        ""
      )}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1
     w-full mx-auto py-20"
      >
        {loading === true && <LoadingSpinner />}
        <>
          {membersInfo &&
            membersInfo.map((data, index) => (
              <StudentCard
                key={index}
                requiredName={data.memberName}
                googleSchollarUrl={data.googleScholarId}
                researchGateUrl={data.researchGateId}
                ImageUrl={data.profilePicture}
                EmailId={data.emailId}
                contactNumber={data.phoneNumber}
                PreviousCollege={data.bscDoneFrom}
                PreviousMastersCollege={data.mscDoneFrom}
                passwoutYear={null}
                currentYear={data.currentYear}
                uploadDate={new Date(data.createdAt).toLocaleDateString()}
                updateDate={new Date(data.updatedAt).toLocaleDateString()}
                previewRouteLink={`/admin-panel/preview-phd-member/${data._id}`}
                updateRouteLink={`/admin-panel/update-phd-member/${data._id}`}
                deleteRouteLink={`/admin-panel/delete-phd-member/${data._id}`}
              />
            ))}
        </>
      </div>
    </main>
  );
};

export default ManagePhdMembers;
