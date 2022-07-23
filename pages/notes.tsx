import { Box, Button, TextField } from "@mui/material"
import { NextPage } from "next"
import useSWR from "swr"
import Layout from "../components/Layout"
import DataBlock from "../components/DataBlock"
import { fetcher } from "../helpers/FetchUtils"
import { Post } from "../models/Post"

const Notes: NextPage = () => {
  const { data: posts, error } = useSWR<Post[], Error>("/api/post", fetcher)
  // const { data, error } = useSWR<Post[], Error>(
  //   "/api/post",
  //   fetcher
  // )
  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Author"
          variant="standard"
          required
        />
        <div>
          <TextField
            required
            error={false}
            multiline
            rows={6}
            id="outlined-textarea"
            label="Comment"
            placeholder="Say something to add to the conversation"
            helperText="Kindness is free. <3"
            variant="standard"
          />
        </div>
        <Button variant="contained">Submit</Button>
      </Box>
      <Box>
        <DataBlock loading={false} error={error}>
          {posts &&
            posts.map((post, index) => (
              <div key={`${index}+${post.author}`}>
                <span>{post.author}</span>
                <p>{post.body}</p>
              </div>
            ))}
        </DataBlock>
      </Box>
    </Layout>
  )
}

export default Notes
