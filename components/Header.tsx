import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded"
import CommentRoundedIcon from "@mui/icons-material/CommentRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <nav>
      <div className="left">
        <Link href="/" passHref>
          <a data-active={isActive("/")}>
            <HomeRoundedIcon fontSize="large" />
          </a>
        </Link>
      </div>
      <div className="right">
        <Link href="/notes" passHref>
          <a data-active={isActive("/notes")}>
            <CommentRoundedIcon fontSize="large" />
          </a>
        </Link>
        <Link href="/graph" passHref>
          <a data-active={isActive("/graph")}>
            <TimelineRoundedIcon fontSize="large" />
          </a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
        .bold {
          font-weight: bold;
        }
        a + a {
          margin-left: 0.25rem;
        }
        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }
        nav div > *[data-active="true"] {
          color: gray;
        }
        .right {
          margin-left: auto;
        }
        nav div > *:hover {
          background-color: rgba(200, 70, 200, 0.7);
          border-radius: 0.5rem;
        }
      `}</style>
    </nav>
  )
}

export default Header
