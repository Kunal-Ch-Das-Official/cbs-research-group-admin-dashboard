import { useEffect, useState } from "react";
import GetAllDesireAdminReq from "../../authentication/auth-components/get-all-be-admin-request/GetAllDesireAdminReq";
import envConfig from "../../../envConfig";
// import { FcCancel } from "react-icons/fc";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
// import CustomModel from "../../utils/custom-models/CustomModel";
import { getAllData } from "../../../operations/apis/getAllData";
const ManageAdminRequests = () => {
  const [getBecomeAdminReq, setBecomeAdminReq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(
        setLoading,
        envConfig.becomeAdminUsersRequestUrl
      );
      output ? setBecomeAdminReq(output) : setNoData(true);
    };
    fetchData();
  }, []);
  return (
    <>
      {loading === true && <LoadingSpinner />}

      {noData === true ? (
        <h2 className="text-2xl text-gray-500 text-center font-bold pt-28">
          {" "}
          Currently requests are not available!
        </h2>
      ) : (
        <main className="pt-24 pb-12 flex justify-center bg-gray-100">
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
      )}
    </>
  );
};

export default ManageAdminRequests;
