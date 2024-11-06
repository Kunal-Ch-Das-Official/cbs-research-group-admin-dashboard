import { useEffect, useState } from "react";
import AccountHolderCard from "../../components/reuseable/account-holder-card/AccountHolderCard";
import { getAllData } from "../../../operations/apis/getAllData";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
import { Helmet } from "react-helmet";

const ManageAdminAccounts = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.allAdminUsers);
      output && setApiResponse(output);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-24 lg:py-auto">
        <Helmet>
                <title>
                    Manage All Registered Account | CBS Research Group
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

      <div className="text-center">
        <SectionHeading
          heading={"Manage All Registered Admin User Accounts"}
          subHeading={`
         Explore the complete list of all registered admin accounts, including their roles and registration dates, for effective management.`}
        />
        <div className="flex justify-center items-center mt-12 ">
          <div className="min-w-[80%] mx-auto">
            <div className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="p-6">
                <div className="divide-y divide-gray-200">
                  {apiResponse &&
                    apiResponse.map((data, index) => (
                      <AccountHolderCard
                        key={index}
                        iconCharacter={data.adminUserName[0]}
                        accountHolderName={data.adminUserName}
                        corespondingEmailId={data.adminUserEmail}
                        registerDate={data.createdAt}
                        updateDate={data.updatedAt}
                        deActivateLink={`/admin-panel/deactivate-admin-account/${data._id}`}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageAdminAccounts;
