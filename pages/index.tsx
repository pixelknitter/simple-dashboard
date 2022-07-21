import type { NextPage } from "next"
import Link from "next/link"
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded"
import CommentRoundedIcon from "@mui/icons-material/CommentRounded"

const Home: NextPage = () => {
  return (
    <div className="pageContainer">
      <div className="pageLinkContainer">
        <Link href="/notes" passHref>
          <CommentRoundedIcon fontSize="large" />
        </Link>
        <Link href="/graph" passHref>
          <TimelineRoundedIcon fontSize="large" />
        </Link>
      </div>
      <div className="homePageContentContainer">
        <h1>Welcome</h1>
        <p>Find some answers to your pressing questions.</p>
      </div>
    </div>
  )
}

export default Home
