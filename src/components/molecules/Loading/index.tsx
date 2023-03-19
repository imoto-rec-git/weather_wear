import { css } from "@emotion/react"

export const Loading = () => {
  const Load = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    > p {
      font-size: var(--font-size-medium);
      position: relative;
      padding: 0 0 0 32px;
      line-height: 1;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid rgba(40, 124, 205, 0.3);
        border-top: 3px solid var(--color-blue);
        animation: loading__anime 1s infinite linear;
      }
      @keyframes loading__anime {
        100% {
          transform: rotate(360deg);
        }
      }
    }
  `
  return (
    <>
      <div css={Load}>
        <p>読み込み中</p>
      </div>
    </>
  )
}
