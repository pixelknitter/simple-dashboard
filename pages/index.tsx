import type { NextPage } from "next"
import Layout from "../components/Layout"

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="homePageContentContainer">
        <h1>Welcome</h1>
        <p>Find some answers to your pressing questions.</p>
      </div>
    </Layout>
  )
}

export default Home
