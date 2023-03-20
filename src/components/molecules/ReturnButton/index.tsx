import { useRouter } from "next/router"
import { css } from "@emotion/react"

export const ReturnButton = () => {
  const router = useRouter()

  const BtnWrap = css`
    margin: 0 auto;
    width: 100%;
    backdrop-filter: unset;
    @media (min-width: 418px) {
      max-width: 360px;
      width: 100%;
    }
    button {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-bold);
      position: relative;
      color: #e7f1fb;
      display: block;
      margin: 0 0 18px;
      width: 100%;
      padding: 20px 0;
      background: linear-gradient(
        135deg,
        rgba(231, 241, 251, 0.6),
        rgba(194, 204, 215, 0.6)
      );
      border: none;
      border-radius: 24px;
      cursor: pointer;
      line-height: 1;
      z-index: 1;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        box-sizing: border-box;
        padding: 1px;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          45deg,
          rgba(42, 130, 215, 1) 0%,
          rgba(38, 118, 195, 1) 100%
        );
        background-clip: content-box;
        border-radius: inherit;
      }
    }
  `
  return (
    <>
      <div css={BtnWrap}>
        <button onClick={() => router.push("/")}>TOPへ</button>
      </div>
    </>
  )
}
