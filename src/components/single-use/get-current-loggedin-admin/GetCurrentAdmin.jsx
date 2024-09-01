import React, { useEffect, useState } from "react";
import axios from "../../../../axios/axios";
import envConfig from "../../../../envConfig";
import ComponentLoading from "../../../utils/component-loading/ComponentLoading";

const GetCurrentAdmin = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLoggedinAdmin = async () => {
      const getAuthToken = localStorage.getItem("auth-token");
      const getAdminToken = localStorage.getItem("admin-token");
      try {
        const token = getAuthToken ? getAuthToken : getAdminToken;
        setLoading(true);
        const res = await axios.get(envConfig.getCurrentLoggedInAdmin, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApiResponse(res.data.logged_in_user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setApiResponse("Something went wrong!");
        setLoading(false);
      }
    };
    getLoggedinAdmin();
  }, []);

  if (loading) {
    return <ComponentLoading />;
  }

  if (!apiResponse) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap flex-col justify-center items-center cursor-pointer">
        <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-gray-900 text-xl">
          <span>{apiResponse.adminUserName[0]}</span>
        </div>
        <div className="text-center mt-4">
          <p className="text-base text-black">{apiResponse.adminUserName}</p>
          <p className="text-xs text-gray-900 mt-0.5">
            {apiResponse.adminUserEmail}
          </p>
          <p className="text-[10px] text-gray-900 mt-0.5">
            <span className="font-bold mr-1">Registerd In:</span>
            {new Date(apiResponse.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetCurrentAdmin;
