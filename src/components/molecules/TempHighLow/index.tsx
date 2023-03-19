import { css } from "@emotion/react"

export const TempHighLow = ({ datas }) => {
  const Temp = css`
    font-size: var(--font-size-medium);
    list-style: none;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      &:first-of-type {
        margin: 0 22px 0 0;
        color: var(--color-orange);
      }
      &:last-of-type {
        color: var(--color-blue);
      }
      span {
        font-size: 2.4rem;
        margin: 0 0 0 0.8rem;
      }
    }
  `
  return (
    <>
      <ul css={Temp}>
        <li>
          最高気温
          <span>{datas.maxVal}°</span>
        </li>
        <li>
          最低気温
          <span>{datas.minVal}°</span>
        </li>
      </ul>
    </>
  )
}
