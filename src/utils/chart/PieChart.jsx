// src/PieChart.js
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const data = [
    { id: 0, value: 10, label: "Contact Activity" },
    { id: 1, value: 15, label: "Visitor Activity" },
  ];

  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "All Activities",
      },
    },
  };

  return (
    <section className="w-[400px] h-[300px] flex justify-center mx-auto my-12">
      <Pie data={chartData} options={options} />
    </section>
  );
};

export default PieChart;
