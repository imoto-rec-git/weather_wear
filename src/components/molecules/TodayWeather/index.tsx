import { css } from "@emotion/react"

export const TodayWeather = ({ weatherData }) => {
  const Climate = css`
    font-size: var(--font-size-small);
    text-align: center;
    margin: 0 0 14px;
    line-height: 1;
    span {
      position: relative;
      font-size: 2.4rem;
      margin: 0 0 0 8px;
      &::before {
        position: absolute;
        display: inline-block;
        content: "";
        margin: auto;
        z-index: -1;
        opacity: 0.3;
      }
      &.whether__sun {
        &::before {
          background: url("/images/icon_sun.svg") no-repeat;
          width: 50px;
          height: 50px;
          right: -23px;
          top: 0;
          bottom: 13px;
        }
      }
      &.weather__sunCloud {
        &::before {
          background: url("/images/icon_suncloud.svg") no-repeat;
          width: 50px;
          height: 40px;
          right: -25px;
          top: 0;
          bottom: 12px;
        }
      }
      &.whether__cloud {
        &::before {
          background: url("/images/icon_cloud.svg") no-repeat;
          width: 51px;
          height: 34px;
          right: -20px;
          top: 0;
          bottom: 5px;
        }
      }
      &.whether__rain {
        &::before {
          background: url("/images/icon_rain.svg") no-repeat;
          width: 50px;
          height: 45px;
          right: -20px;
          top: 0;
          bottom: 5px;
        }
      }
    }
  `
  return (
    <>
      <p css={Climate}>
        今日の天気は
        <span
          className={
            weatherData === "晴れ"
              ? "whether__sun"
              : weatherData === "晴れのち曇り"
              ? "weather__sunCloud"
              : weatherData === "雨"
              ? "whether__rain"
              : ""
          }
        >
          {weatherData}
        </span>
      </p>
    </>
  )
}
