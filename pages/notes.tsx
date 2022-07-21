import { NextPage } from "next"
import Link from "next/link"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"

const Notes: NextPage = () => {
  return (
    <div className="pageContainer">
      <div className="pageLinkContainer">
        <Link href="/" passHref>
          <HomeRoundedIcon />
        </Link>
      </div>
      <p>Render Notes Here!</p>
    </div>
  )
}

export default Notes
