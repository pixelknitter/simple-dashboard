import { useEffect, useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { NextPage } from "next"
import useSWR from "swr"
import Layout from "../components/Layout"
import DataBlock from "../components/DataBlock"
import { fetcher } from "../helpers/FetchUtils"
import type { Post } from "../models/schemas"
import { PostModel } from "../models/Post"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CommentCard from "../components/CommentCard"

const Notes: NextPage = () => {
  const {
    data: posts,
    isValidating,
    error: allPostsError,
    mutate,
  } = useSWR<Post[], Error>("/api/post", fetcher)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Post>({
    reValidateMode: "onSubmit",
    mode: "all",
    resolver: zodResolver(PostModel),
  })
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false)

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const createPost = async (newPost: Post) => {
    console.debug("On Submit:", newPost)
    try {
      await mutate(async () => posts?.concat(newPost))
      setSubmitSuccessful(true)
    } catch (error) {
    } finally {
      setSubmitSuccessful(false)
    }
  }

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            marginTop: 1,
            marginBottom: 1,
            minWidth: "25ch",
          },
        }}
        autoComplete="off"
        onSubmit={handleSubmit(createPost)}
      >
        <Typography variant="h4">Add a comment</Typography>
        <TextField
          id="standard-basic"
          label="Author"
          variant="standard"
          required
          {...register("author")}
          helperText={errors.author?.message}
          error={!!errors.author?.message}
        />
        <div>
          <TextField
            required
            multiline
            rows={6}
            id="outlined-textarea"
            label="Comment"
            placeholder="Say something to add to the conversation"
            helperText={errors.body?.message ?? "Kindness is free. <3"}
            error={!!errors.body?.message}
            variant="standard"
            {...register("body")}
          />
        </div>
        <Button variant="contained" type="submit" value="submit">
          Submit
        </Button>
      </Box>
      <Box sx={{ marginTop: 1.25, marginBottom: 1.25 }}>
        <Typography variant="h4">Comments</Typography>
        <DataBlock loading={isValidating} error={allPostsError}>
          {posts?.map((post, index) => (
            <CommentCard key={`${index}+${post.author}`} post={post} />
          ))}
        </DataBlock>
      </Box>
    </Layout>
  )
}

export default Notes
