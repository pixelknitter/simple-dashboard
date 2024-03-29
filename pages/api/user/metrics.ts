// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { FeedEvent } from "../../../models/FeedEvents"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: FeedEvent[] }>
) {
  if (req.method === "GET") {
    res.status(200).json({ data: testData })
  }
}

const testData: FeedEvent[] = [
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
  {
    id: 12,
    user: "Eddie",
    fps: 57,
    timestamp: 1652827500,
    event: "ping",
    description: "",
  },
  {
    id: 13,
    user: "Eddie",
    fps: 62,
    timestamp: 1652827540,
    event: "ping",
    description: "",
  },
]
