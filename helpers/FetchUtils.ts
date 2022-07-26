import { formatDate } from "./DateUtils"

type SupportedHTTPMethods = "GET" | "POST" | "PUT"

export type JSONResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export async function fetcher<T>(
  url: string,
  method: SupportedHTTPMethods = "GET"
): Promise<T> {
  const response = await fetch(url, {
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  })

  const { data, errors }: JSONResponse<T> = await response.json()

  if (response.ok) {
    if (data) {
      // add fetchedAt helper (used in the UI to help differentiate requests)
      return Object.assign(data, { fetchedAt: formatDate(new Date()) })
    } else {
      return Promise.reject(new Error(`No data found at ${url}`))
    }
  } else {
    // handle the errors
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    )
    return Promise.reject(error)
  }
}
