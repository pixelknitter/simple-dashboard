import { Card, CardContent, Typography } from "@mui/material"
import { Post } from "../models/Post"

interface Props {
  post: Post
}

const CommentCard: React.FC<Props> = ({ post }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {post.author}
        </Typography>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
    </Card>
  )
}

export default CommentCard
