import { NextPage } from "next"
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
import { useMemo } from "react"

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

export type FeedEvent = {
  id: number
  user: string
  fps: number
  timestamp: number
  event: string
  description: string
}

export const testData: FeedEvent[] = [
  {
    id: 0,
    user: "david",
    fps: 25,
    timestamp: 1652827090,
    event: "item_purchase",
    description: "season_pass",
  },
  {
    id: 1,
    user: "david",
    fps: 25,
    timestamp: 1652827000,
    event: "item_purchase",
    description: "candle",
  },
  {
    id: 2,
    user: "david",
    fps: 30,
    timestamp: 1652827420,
    event: "add_friend",
    description: "James",
  },
  {
    id: 3,
    user: "david",
    fps: 29,
    timestamp: 1652827400,
    event: "enter_level",
    description: "Level_Archives",
  },
  {
    id: 4,
    user: "david",
    fps: 31,
    timestamp: 1652827060,
    event: "ping",
    description: "",
  },
  {
    id: 5,
    user: "david",
    fps: 29,
    timestamp: 1652827160,
    event: "enter_level",
    description: "Level_Rain",
  },
  {
    id: 6,
    user: "david",
    fps: 27,
    timestamp: 1652827480,
    event: "ping",
    description: "",
  },
  {
    id: 7,
    user: "david",
    fps: 30,
    timestamp: 1652827300,
    event: "ping",
    description: "",
  },
  {
    id: 8,
    user: "david",
    fps: 25,
    timestamp: 1652827320,
    event: "item_purchase",
    description: "candle",
  },
  {
    id: 9,
    user: "david",
    fps: 30,
    timestamp: 1652827425,
    event: "add_party",
    description: "James",
  },
  {
    id: 10,
    user: "James",
    fps: 60,
    timestamp: 1652827425,
    event: "add_party",
    description: "david",
  },
  {
    id: 11,
    user: "James",
    fps: 59,
    timestamp: 1652827500,
    event: "ping",
    description: "",
  },
]

// we only want the data points that aren't used in the chart to get displayed in the tooltip
type ChartDataSet<T> = {
  label: string
  data: Array<T>
  borderColor: string
  backgroundColor: string
}

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}

const generateRandomColorSet = () => {
  const scalar = 230 // we don't want anything too bright
  const r = Math.round(Math.random() * scalar),
    g = Math.round(Math.random() * scalar),
    b = Math.round(Math.random() * scalar)

  return {
    border: `rgb(${r}, ${g}, ${b})`,
    background: `rgba(${r}, ${g}, ${b}, 0.5)`,
  }
}

function generateChartDataSetByUser<T extends { user: string }>(
  data: Array<T>
): Array<ChartDataSet<T>> {
  return Array.from(
    data
      .reduce((dataSets, element) => {
        const currentUser = element.user.toLowerCase()
        if (!dataSets.has(currentUser)) {
          const randomColor = generateRandomColorSet()
          dataSets.set(currentUser, {
            label: `${titleCase(element.user)}`,
            data: [element],
            borderColor: randomColor.border,
            backgroundColor: randomColor.background,
          })
        } else {
          dataSets.get(currentUser)?.data.push(element)
        }
        return dataSets
      }, new Map<string, ChartDataSet<T>>())
      .values()
  )
}

const labels = Array.from(
  testData
    .reduce((set, feedEvent) => {
      set.add(feedEvent.timestamp)
      return set
    }, new Set<number>())
    .values()
)

const Graph: NextPage = () => {
  // map datasets by username creating the timestamp
  const data = useMemo(() => {
    const sets = generateChartDataSetByUser(testData)
    // console.debug("datasets", sets, JSON.stringify(sets.map((set) => set.data)))
    return {
      labels,
      datasets: sets,
    }
  }, [])

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default Graph
