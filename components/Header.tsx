import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded"
import CommentRoundedIcon from "@mui/icons-material/CommentRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { Button, IconButton } from "@mui/material"

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <nav>
      <div className="left">
        <Link href="/" passHref>
          <IconButton
            disabled={isActive("/")}
            color="primary"
            aria-label="go home"
          >
            <HomeRoundedIcon fontSize="large" />
          </IconButton>
        </Link>
      </div>
      <div className="right">
        <Link href="/notes" passHref>
          <IconButton
            disabled={isActive("/notes")}
            color="primary"
            aria-label="share some notes with the team"
          >
            <CommentRoundedIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link href="/graph" passHref>
          <IconButton
            disabled={isActive("/graph")}
            color="primary"
            aria-label="share some notes with the team"
          >
            <TimelineRoundedIcon fontSize="large" />
          </IconButton>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
        .right {
          margin-left: auto;
        }
      `}</style>
    </nav>
  )
}

export default Header
