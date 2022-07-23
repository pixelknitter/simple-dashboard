import { NextPage } from "next"
import Layout from "../components/Layout"
// import useSWR from "swr"

const Notes: NextPage = () => {
  // const { data, error } = useSWR<Post[], Error>(
  //   "/api/post",
  //   fetcher
  // )
  return (
    <Layout>
      <p>Render Notes Here!</p>
    </Layout>
  )
}

export default Notes
