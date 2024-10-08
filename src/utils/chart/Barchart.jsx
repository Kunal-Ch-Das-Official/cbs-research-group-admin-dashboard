import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartsOverviewDemo = ({
  adminUserLength,
  BecomeAdminRequestLength,
  doctoratesAlumniLength,
  mastersAlumniLength,
  personalAwardsLength,
  groupAwardsLength,
  contactApplicationsLength,
  groupNewsLength,
  labInstrumentsLength,
  projectStudentsLength,
  phdStudentsLength,
  projectsLength,
  publicationsLength,
}) => {
  // Data for the chart
  const data = {
    labels: [
      "Admin Users",
      "Doctorates Alumni",
      "Masters Alumni",
      "Administrative Access Requests",
      "Personal Awards",
      "Team Awards",
      "Contact Applications",
      "Group News",
      "Lab Instruments",
      "Project Students",
      "PHD Students",
      "Projects",
      "Publications",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          adminUserLength,
          doctoratesAlumniLength,
          mastersAlumniLength,
          BecomeAdminRequestLength,
          personalAwardsLength,
          groupAwardsLength,
          contactApplicationsLength,
          groupNewsLength,
          labInstrumentsLength,
          projectStudentsLength,
          phdStudentsLength,
          projectsLength,
          publicationsLength,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for customizing the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Admin Dashboard Metrics",
      },
    },
  };

  return (
    <section className="hidden sm:block md:block lg:block">
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
        </Typography>
        <Bar data={data} options={options} />
      </Box>
    </section>
  );
};

ChartsOverviewDemo.propTypes = {
  adminUserLength: PropTypes.number,
  BecomeAdminRequestLength: PropTypes.number,
  doctoratesAlumniLength: PropTypes.number,
  mastersAlumniLength: PropTypes.number,
  personalAwardsLength: PropTypes.number,
  groupAwardsLength: PropTypes.number,
  contactApplicationsLength: PropTypes.number,
  groupNewsLength: PropTypes.number,
  labInstrumentsLength: PropTypes.number,
  projectStudentsLength: PropTypes.number,
  phdStudentsLength: PropTypes.number,
  projectsLength: PropTypes.number,
  publicationsLength: PropTypes.number,
};

export default ChartsOverviewDemo;
