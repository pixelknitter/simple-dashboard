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
import { formatDate } from "../helpers/DateUtils"
import { ChartData } from "../models/ChartData"
import { generateChartDataSetByUser } from "../helpers/ChartUtils"

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

function generateChartLabels<T, K extends keyof T>(
  data: Array<T>,
  property: K
): Array<number | string> {
  return Array.from(
    data
      .reduce((set, element) => {
        set.add(element[property])
        return set
        // FIXME: this should be any types of the propery set
      }, new Set<any>())
      .values()
  )
}

const fetcher = async (url: string): Promise<FeedEvent[]> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  })

  type JSONResponse = {
    data?: Omit<FeedEvent[], "fetchedAt">
    errors?: Array<{ message: string }>
  }

  const { data, errors }: JSONResponse = await response.json()
  console.debug("data", data, response)
  if (response.ok) {
    const events = data
    if (events) {
      // add fetchedAt helper (used in the UI to help differentiate requests)
      return Object.assign(events, { fetchedAt: formatDate(new Date()) })
    } else {
      return Promise.reject(new Error(`No users with event data found`))
    }
  } else {
    // handle the errors
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    )
    return Promise.reject(error)
  }
}

const Graph: NextPage = () => {
  const { data, error } = useSWR<FeedEvent[], Error>(
    "/api/user/metrics",
    fetcher
  )
  const [chartData, setChartData] = useState<ChartData<FeedEvent> | undefined>()

  useEffect(() => {
    if (!data) {
      return console.debug("no way to present the charts without data")
    }
    const sets = generateChartDataSetByUser(data)
    const labels = generateChartLabels(data, "timestamp")

    setChartData({
      labels,
      datasets: sets,
    })
  }, [data])

  return (
    <Layout>
      {error && (
        <>
          <span>An error has occured. Try refreshing.</span>
          <p>{error.message}</p>
        </>
      )}
      {chartData && !error && <Line options={options} data={chartData} />}
    </Layout>
  )
}

export default Graph
