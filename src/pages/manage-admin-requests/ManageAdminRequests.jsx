import { useEffect, useState } from "react";
import GetAllDesireAdminReq from "../../authentication/auth-components/get-all-be-admin-request/GetAllDesireAdminReq";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";
const ManageAdminRequests = () => {
  const [getBecomeAdminReq, setBecomeAdminReq] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(
        setLoading,
        envConfig.becomeAdminUsersRequestUrl
      );
      output && setBecomeAdminReq(output);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-gray-50">
      <SectionHeading
        heading={"Manage All Details"}
        subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
      />
      {loading === true && <LoadingSpinner />}
      {getBecomeAdminReq && getBecomeAdminReq.length === 0 ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-20">
          {" "}
          Currently requests are not available!
        </h2>
      ) : (
        ""
      )}
      <main className="py-20 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1120px]:grid-cols-3 2xl:grid-cols-4 xl:grid-cols-3 gap-x-2 gap-y-2">
          {getBecomeAdminReq &&
            getBecomeAdminReq.map((item, index) => (
              <div key={index}>
                <GetAllDesireAdminReq
                  id={item._id}
                  userName={item.reqUserName}
                  userEmail={item.reqUserEmail}
                  message={item.message}
                  recivedAt={new Date(item.createdAt).toLocaleDateString()}
                />
              </div>
            ))}
        </div>
      </main>
    </main>
  );
};

export default ManageAdminRequests;
