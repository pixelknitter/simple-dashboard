import { ChartDataSet } from "../models/ChartData"
import { titleCase } from "./StringUtils"

export const generateRandomColorSet = () => {
  const scalar = 230 // we don't want anything too bright
  const r = Math.round(Math.random() * scalar),
    g = Math.round(Math.random() * scalar),
    b = Math.round(Math.random() * scalar)

  return {
    border: `rgb(${r}, ${g}, ${b})`,
    background: `rgba(${r}, ${g}, ${b}, 0.5)`,
  }
}

export function generateChartDataSetByUser<T extends { user: string }>(
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
