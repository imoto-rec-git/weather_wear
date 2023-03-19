import { CatchCopy } from "@/components/atoms/CatchCopy"
import { Logo } from "@/components/atoms/Logo"
import { css } from "@emotion/react"

export const LogoAndCatchCopy = () => {
  const logoWrap = css`
    position: absolute;
    top: -120px;
    bottom: 0;
    margin: auto;
    text-align: center;
    width: 197px;
    height: 87px;
  `
  return (
    <>
      <div css={logoWrap}>
        <Logo />
        <CatchCopy />
      </div>
    </>
  )
}
