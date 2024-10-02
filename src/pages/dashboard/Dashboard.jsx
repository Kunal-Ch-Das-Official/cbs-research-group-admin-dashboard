import { useEffect, useState } from "react";
import DashBoardBody from "../../components/single-use/dashboard-body/DashBoardBody";

import envConfig from "../../../envConfig";
import { getAllData } from "../../../operations/apis/getAllData";

const Dashboard = () => {
  const [allawards, setAllawards] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.dashboardInfoUrl);
      output && setAllawards(output);
    };
    fetchData();
  }, []);

  console.log(allawards);
  console.log(loading);
  return (
    <div className="text-center pt-28">
      <DashBoardBody />
    </div>
  );
};

export default Dashboard;
