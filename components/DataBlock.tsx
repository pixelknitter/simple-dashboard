import { Box } from "@mui/material"
import React from "react"

interface DataBlockProps {
  loading: boolean
  error?: Error
  children: React.ReactNode
}

const DataBlock: React.FC<DataBlockProps> = ({
  loading = false,
  error,
  children,
}) => {
  if (loading) {
    return (
      <Box>
        <span>Loading....</span>
      </Box>
    )
  }
  if (error) {
    return (
      <Box>
        <span>An error has occured. Try refreshing.</span>
        <p>{error.message}</p>
      </Box>
    )
  }
  return <>{children}</>
}

export default DataBlock
