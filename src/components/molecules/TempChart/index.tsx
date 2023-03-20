import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { css } from "@emotion/react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const TempChart = ({ dataList }: { dataList: number[] }) => {
  // @ts-ignore
  const chartData = {
    labels: ["0h", "3h", "6h", "9h", "12h", "15h", "18h", "21h"],
    datasets: [
      {
        label: "",
        data: dataList,
        borderColor: "rgb(40, 124, 205)",
        backgroundColor: "rgb(255, 255, 255)",
      },
    ],
  }
  const Graph = css`
    max-width: 100%;
    width: 100%;
    height: 132px;
    background: rgba(245, 245, 245, 0.2);
    margin: 0 auto 4.8rem;
    padding: 1.2rem;
    border-radius: 0.8rem;
  `
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  }
  return (
    <>
      <div css={Graph}>
        <Line
          options={chartOptions}
          data={chartData}
          width={500}
          height={400}
        />
      </div>
    </>
  )
}
