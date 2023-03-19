import { css } from "@emotion/react"
import { UserPositionButton } from "@/components/atoms/UserPositionButton"
import { PrefectureSelectButton } from "@/components/atoms/PrefectureSelectButton"

export const SelectButton = () => {
  const BtnWrap = css`
    margin: 0 auto;
    bottom: 20px;
    position: absolute;
    width: calc(100% - 30px);
    backdrop-filter: unset;
    @media (min-width: 418px) {
      max-width: 360px;
      width: 100%;
    }
  `
  return (
    <>
      <div css={BtnWrap}>
        <UserPositionButton />
        <PrefectureSelectButton />
      </div>
    </>
  )
}
