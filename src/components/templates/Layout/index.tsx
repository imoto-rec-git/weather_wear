import { css } from "@emotion/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Layout = ({ children, ...props }: Props) => {
  const Main = css`
    background-color: #a1c6ea;
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    &::before,
    &::after {
      content: "";
      z-index: 1;
      filter: blur(100px);
      position: absolute;
    }
    &::before {
      width: 592px;
      height: 472px;
      left: 165px;
      top: -215px;
      border-radius: 50%;
      background: #629cd5;
      box-shadow: -153px 690px 0 #507dbc;
    }
    &::after {
      content: "";
      width: 517px;
      height: 311px;
      left: -378px;
      top: 139px;
      background: #e7f1fb;
    }
  `
  return (
    <>
      <main css={Main} {...props}>
        {children}
      </main>
    </>
  )
}
