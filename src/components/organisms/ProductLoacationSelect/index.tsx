import { LogoAndCatchCopy } from "@/components/molecules/LogoAndCatchCopy"
import { SelectButton } from "@/components/molecules/SelectButton"
import { css } from "@emotion/react"

export const ProductLoacationSelect = () => {
  const Section = css`
    width: calc(100% - 20px);
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      width: 903px;
      height: 903px;
      margin: auto;
      top: 24px;
      background: rgba(245, 245, 245, 0.2);
      box-shadow: 10px 5px 60px rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.5);
      @media (min-width: 418px) {
        width: calc(903 / 375 * 100vw);
        height: calc(903 / 375 * 100vw);
      }
    }
  `

  return (
    <>
      <section css={Section}>
        <LogoAndCatchCopy />
        <SelectButton />
      </section>
    </>
  )
}
