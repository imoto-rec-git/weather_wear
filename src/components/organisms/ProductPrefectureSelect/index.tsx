import { css } from "@emotion/react"
import { ReturnButton } from "@/components/molecules/ReturnButton"
import { PrefectureSelect } from "@/components/molecules/PrefectureSelect"

export const ProductPrefectureSelect = () => {
  const Section = css`
    position: relative;
    z-index: 2;
    background-color: rgba(245, 245, 245, 0.2);
    width: calc(100% - 20px);
    max-width: 640px;
    height: auto;
    margin: 10px auto;
    border-radius: 12px;
    box-shadow: 10px 5px 60px rgba(0, 0, 0, 0.25);
    padding: 26px 10px 24px;
    border: 1px solid rgba(255, 255, 255, 0.5);
  `
  const Note = css`
    font-size: var(--font-size-medium);
    font-weight: bold;
    text-align: center;
    margin: 0 0 24px;
  `
  return (
    <>
      <section css={Section}>
        <p css={Note}>都道府県を１つ選択してください</p>
        <PrefectureSelect />
        <ReturnButton />
      </section>
    </>
  )
}
