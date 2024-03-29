import type { AppProps } from "next/app"
import { Global, css } from "@emotion/react"

export default function App({ Component, pageProps }: AppProps) {
  const globalStyle = css`
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap");

    :root {
      --font-size-small: 1.2rem;
      --font-size-medium: 1.4rem;
      --font-size-large: 1.6rem;
      --font-weight-regular: 400;
      --font-weight-medium: 500;
      --font-weight-bold: 700;
      --color-black: #333333;
      --color-gray: #d8d8d8;
      --color-white: #ffffff;
      --color-blue: #287ccd;
      --color-light-blue: #a1c6ea;
      --color-orange: #ff6921;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    html,
    body {
      max-width: 100vw;
      overflow-x: hidden;
    }

    html {
      box-sizing: initial;
      font-size: 62.5%;
    }

    body {
      font-family: "Noto Sans JP", sans-serif;
      color: var(--color-black);
      background-color: var(--color-light-blue);
      font-display: swap;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      width: 100%;
      height: auto;
    }

    button {
      font-family: "Noto Sans JP", sans-serif;
    }
  `
  return (
    <>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </>
  )
}
