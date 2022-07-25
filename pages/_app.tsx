import "./globals.css"
import type { AppProps } from "next/app"
import { SWRConfig, SWRConfiguration } from "swr"

const options: Partial<SWRConfiguration> = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404.
    if (error.status === 404) return

    // Only retry up to 10 times.
    if (retryCount >= 10) return

    // Retry after 5 seconds.
    setTimeout(() => revalidate({ retryCount }), 5000)
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={options}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
