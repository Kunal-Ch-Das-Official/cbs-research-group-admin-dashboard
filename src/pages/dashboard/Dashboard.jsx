import { useEffect } from "react";
import DashBoardBody from "../../components/single-use/dashboard-body/DashBoardBody";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="text-center pt-28">
      <DashBoardBody />
    </div>
  );
};

export default Dashboard;
