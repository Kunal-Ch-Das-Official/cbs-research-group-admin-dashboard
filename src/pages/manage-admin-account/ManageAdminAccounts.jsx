import { useEffect, useState } from "react";
import AccountHolderCard from "../../components/reuseable/account-holder-card/AccountHolderCard";
import { getAllData } from "../../../operations/apis/getAllData";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";

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
    <>
      {loading === true && <LoadingSpinner />}

      <div className="text-center min-h-screen">
        <SectionHeading
          heading={"Manage All Registered Account"}
          subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
        />
        <div className="flex justify-center items-center min-h-screen">
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
    </>
  );
};

export default ManageAdminAccounts;
