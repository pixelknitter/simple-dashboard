import { useEffect, useState } from "react"
import { Alert, Box, Collapse, TextField, Typography } from "@mui/material"
import { NextPage } from "next"
import useSWR from "swr"
import { fetcher, updater } from "../helpers/FetchUtils"
import type { Post } from "../models/schemas"
import { PostModel } from "../models/post"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Layout from "../components/Layout"
import DataBlock from "../components/DataBlock"
import CommentCard from "../components/CommentCard"
import { LoadingButton } from "@mui/lab"
import SendIcon from "@mui/icons-material/Send"

const POST_API = "/api/post"

type LocalPost = Omit<Post, "id">

const Notes: NextPage = () => {
  const {
    data: posts,
    isValidating,
    error: allPostsError,
    mutate,
  } = useSWR<Post[], Error>(POST_API, fetcher)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocalPost>({
    reValidateMode: "onSubmit",
    mode: "all",
    resolver: zodResolver(PostModel.omit({ id: true })),
  })
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.debug("update on submission")
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const createPost = async (newPost: LocalPost) => {
    console.debug("On Submit:", newPost)
    try {
      setLoading(true)
      await mutate(async (oldPosts) => {
        console.debug("On mutate - before:", oldPosts)
        const posts = await updater<Post[], LocalPost>(
          POST_API,
          "POST",
          newPost
        )
        setSubmitSuccessful(true)
        setShowAlert(false)
        console.debug("On mutate - after:", posts)
        return posts
      })
      setLoading(false)
    } catch (error: any) {
      console.error("Oops, an error occured", error)
    } finally {
      setSubmitSuccessful(false)
    }
  }

  const onError = (errors: any) => {
    setShowAlert(true)
    console.log(errors)
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
        onSubmit={handleSubmit(createPost, onError)}
      >
        <Typography variant="h4">Add a comment</Typography>
        <Collapse in={showAlert}>
          <Alert
            severity="error"
            sx={{ marginTop: 1, marginBottom: 1 }}
            onClose={() => {
              setShowAlert(false)
            }}
          >
            Oops, an error has occured submitting your comment. Try again in a
            moment.
          </Alert>
        </Collapse>
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
        <LoadingButton
          type="submit"
          value="submit"
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton>
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
