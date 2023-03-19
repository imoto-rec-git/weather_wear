import React from "react"
import { css } from "@emotion/react"

export const UserArea = ({ userArea }) => {
  const Area = css`
    text-align: center;
    font-size: var(--font-size-small);
    margin: 0 0 0.4rem;
  `
  return (
    <>
      {userArea && (
        <div css={Area}>
          <p>{userArea}</p>
        </div>
      )}
    </>
  )
}
