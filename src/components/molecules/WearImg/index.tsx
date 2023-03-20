import { css } from "@emotion/react"

export const WearImg = ({ wearJudgeImg }: { wearJudgeImg: string }) => {
  const Img = css`
    width: 100%;
    height: auto;
    margin: 0 0 1.2rem;
  `
  return (
    <>
      <img
        src={wearJudgeImg}
        alt="Weather Wear"
        width={322}
        height={322}
        css={Img}
      />
    </>
  )
}
