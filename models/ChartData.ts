export type ChartDataSet<T> = {
  label: string
  data: Array<T>
  borderColor: string
  backgroundColor: string
}

export type ChartData<T> = {
  labels: (string | number)[]
  datasets: ChartDataSet<T>[]
}
