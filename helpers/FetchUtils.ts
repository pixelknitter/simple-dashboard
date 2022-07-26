import { formatDate } from "./DateUtils"

type SupportedHTTPMethods = "POST" | "PUT"

export type JSONResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
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

export async function updater<K, T>(
  url: string,
  method: SupportedHTTPMethods = "POST",
  body: T
): Promise<K> {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  })

  const { data, errors }: JSONResponse<K> = await response.json()

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
