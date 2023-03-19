import { css } from "@emotion/react"

export const CatchCopy = () => {
  const Paragraph = css`
    font-size: 12px;
    color: #287ccd;
  `
  return (
    <>
      <p css={Paragraph}>今日のファッションは天気次第</p>
    </>
  )
}
