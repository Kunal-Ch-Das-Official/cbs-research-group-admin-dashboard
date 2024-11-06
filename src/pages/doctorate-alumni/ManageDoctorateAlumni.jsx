import { useEffect, useState } from "react";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import StudentCard from "../../components/reuseable/students-card/StudentCard";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

const ManageDoctorateAlumni = () => {
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.doctorateAlumniUrl);
      output && setAlumniInfo(output);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50">
        <Helmet>
                <title>
                    Manage Doctorate Alumni Profile | CBS Research Group
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
        heading={"CBS Research Group PHd Alumni (Management Console)"}
        subHeading={`Explore and manage the complete list of PHd alumni from the CBS Research Group, highlighting their details, research contributions, and career paths since graduation`}
      />
      {alumniInfo && alumniInfo.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently alumni details are not available!
        </h2>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 w-full mx-auto py-20">
        {loading === true && <LoadingSpinner />}
        <>
          {alumniInfo &&
            alumniInfo.map((data, index) => (
              <StudentCard
                key={index}
                requiredName={data.alumniName}
                googleSchollarUrl={data.googleScholarId}
                researchGateUrl={data.researchGateId}
                ImageUrl={data.profilePicture}
                EmailId={data.emailId}
                contactNumber={data.phoneNumber}
                PreviousCollege={data.bscDoneFrom}
                PreviousMastersCollege={data.mscDoneFrom}
                passwoutYear={data.yearOfPassout}
                currentYear={null}
                uploadDate={new Date(data.createdAt).toLocaleDateString()}
                updateDate={new Date(data.updatedAt).toLocaleDateString()}
                previewRouteLink={`/admin-panel/preview-doctorate-alumni/${data._id}`}
                updateRouteLink={`/admin-panel/update-doctorate-alumni/${data._id}`}
                deleteRouteLink={`/admin-panel/delete-doctorate-alumni/${data._id}`}
              />
            ))}
        </>
      </div>
    </main>
  );
};

export default ManageDoctorateAlumni;
