import { useEffect, useState } from "react";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import envConfig from "../../../envConfig";
import StudentPreview from "../../components/reuseable/student-preview/StudentPreview";
import { useParams } from "react-router-dom";
import { getSingleData } from "../../../operations/apis/getSingleData";
import { Helmet } from "react-helmet";
const PreviewPhdMember = () => {
  const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchReqData = async () => {
      const response = await getSingleData(
        setLoading,
        envConfig.phdMembersUrl,
        id
      );
      response && setMemberInfo(response);
    };
    fetchReqData();
  }, [id]);

  return (
    <>
      
      <Helmet>
                <title>
                Overview PHd Member&apos;s Profile | CBS Research Group
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


      {loading === true && <LoadingSpinner />}
      {memberInfo ? (
        <StudentPreview
          studentName={memberInfo.memberName}
          profileImageUrl={memberInfo.profilePicture}
          previewHeading={"PHD Member"}
          googleScholarId={memberInfo.googleScholarId}
          researchGateId={memberInfo.researchGateId}
          emailId={memberInfo.emailId}
          phoneNumber={memberInfo.phoneNumber}
          bscCollege={memberInfo.bscDoneFrom}
          mscCollege={memberInfo.mscDoneFrom}
          yearOfPassout={null}
          currentYear={memberInfo.currentYear}
          aboutInfo={memberInfo.details}
          goBackLink={"/admin-panel/manage-phd-members"}
        />
      ) : (
        <h1 className="text-gray-500 text-center text-2xl font-bold mt-24">
          Alumni details are not available!
        </h1>
      )}
    </>
  );
};

export default PreviewPhdMember;
