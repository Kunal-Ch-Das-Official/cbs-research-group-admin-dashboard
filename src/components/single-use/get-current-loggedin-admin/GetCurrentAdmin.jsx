import { useEffect, useState } from "react";
import axios from "../../../../axios/axios";
import envConfig from "../../../../envConfig";
import ComponentLoading from "../../../utils/component-loading/ComponentLoading";
import { useAuth } from "../../../authentication/auth-context/useAuth";
import conditionalUserIconColor from "../../../../operations/functional/conditionalUserIconColor";

const GetCurrentAdmin = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sectionColor, setSectionColor] = useState(false);
  const { logout } = useAuth();
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
        if (error.status === 401) {
          const authToken = localStorage.getItem("auth-token") || null;
          if (authToken) {
            localStorage.removeItem("auth-token");
            logout();
            window.location.href = "/sign-in";
          }
        }
        setApiResponse("Something went wrong!");
        setLoading(false);
      }
    };
    getLoggedinAdmin();
  }, [logout]);

  useEffect(() => {
    const conditionalElement =
      apiResponse && apiResponse.adminUserName[0].toUpperCase();
    conditionalUserIconColor(conditionalElement, setSectionColor);
  }, [apiResponse]);

  if (loading) {
    return <ComponentLoading />;
  }

  if (!apiResponse) {
    return (
      <div className="text-center text-gray-500 text-2xl font-bold pt-20">
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="border border-gray-200 py-4 mt-2 rounded-xl bg-gray-50">
      <div className="flex flex-wrap flex-col justify-center items-center cursor-pointer">
        <div
          className={`${sectionColor} w-12 h-12 rounded-full flex items-center justify-center font-bold text-gray-900 text-xl`}
        >
          <span>{apiResponse.adminUserName[0]}</span>
        </div>
        <div className="text-center mt-4">
          <p className="text-base font-semibold text-black">
            {apiResponse.adminUserName}
          </p>
          <p className="text-xs text-gray-900 mt-0.5 font-semibold">
            {apiResponse.adminUserEmail}
          </p>
          <p className="text-[12px] text-gray-900 mt-0.5">
            <span className="font-bold mr-1 text-green-600">Registerd In:</span>
            {new Date(apiResponse.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetCurrentAdmin;
