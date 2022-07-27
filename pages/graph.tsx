import { GetServerSideProps, NextPage } from "next"
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
import { useEffect, useState } from "react"
import useSWR from "swr"
import Layout from "../components/Layout"
import { FeedEvent } from "../models/FeedEvents"
import { ChartData } from "../models/ChartData"
import {
  generateChartDataSetByUser,
  generateChartLabels,
} from "../helpers/ChartUtils"
import { fetcher } from "../helpers/FetchUtils"
import DataBlock from "../components/DataBlock"
import { Box } from "@mui/material"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User FPS Over Time",
    },
  },
  parsing: {
    xAxisKey: "timestamp",
    yAxisKey: "fps",
  },
}

const Graph: NextPage = () => {
  const { data, error, isValidating } = useSWR<FeedEvent[], Error>(
    "/api/user/metrics",
    fetcher
  )
  const [chartData, setChartData] = useState<ChartData<FeedEvent>>()

  useEffect(() => {
    if (data) {
      const sets = generateChartDataSetByUser(data)
      const labels = generateChartLabels(data, "timestamp")

      setChartData({
        labels,
        datasets: sets,
      })
    }
  }, [data])

  return (
    <Layout>
      <Box mb={2}>
        <DataBlock loading={isValidating} error={error}>
          {chartData && <Line options={options} data={chartData} />}
        </DataBlock>
      </Box>
    </Layout>
  )
}

export default Graph
