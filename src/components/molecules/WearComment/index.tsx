import { css } from "@emotion/react"

export const WearComment = ({ wearJudgeTxt }) => {
  const Comment = css`
    font-size: var(--font-size-medium);
    margin: 0 0.8rem 1.2rem;
    line-height: 1.6;
  `
  return (
    <>
      <p css={Comment}>
        {wearJudgeTxt}
        <br />
        今日も一日がんばりましょう！
      </p>
    </>
  )
}
