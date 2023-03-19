import { useState } from "react"
import axios from "axios"
import { css } from "@emotion/react"
import { useRouter } from "next/router"

export const UserPositionButton = () => {
  const router = useRouter()
  const [locateLoad, setLocateLoad] = useState(false)
  const handleGetLocation = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setLocateLoad(true)
      navigator.geolocation.getCurrentPosition((position) => {
        const latVal = position.coords.latitude
        const lngVal = position.coords.longitude
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latVal}&lon=${lngVal}&zoom=18&addressdetails=1`
          )
          .then((res) => {
            const pref = `${res.data.address.state}${res.data.address.city}`
            router.push(`/result?pref=${pref}&lat=${latVal}&lng=${lngVal}`)
          })
          .catch((err) => {
            setLocateLoad(false)
            console.log("Error occurred while fetching data: ", err)
          })
      })
    } else {
      setLocateLoad(false)
      alert(
        "この端末では位置情報機能が利用できません。「都道府県を選択」から遷移いただくか、位置情報機能をオンにしてください。"
      )
    }
  }
  const Button = css`
    position: relative;
    color: #e7f1fb;
    display: block;
    margin: 0 0 18px;
    width: 100%;
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
    > span {
      color: #e7f1fb;
      position: relative;
      padding: 20px 0 20px 28px;
      display: inline-block;
      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0;
        margin: auto;
      }
      &.locate {
        &::before {
          width: 22px;
          height: 22px;
          top: -3px;
          left: 0;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="%23e7f1fb" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>')
            no-repeat;
        }
      }
      &.search {
        &::before {
          width: 18px;
          height: 18px;
          top: -1px;
          left: 2px;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="%23e7f1fb" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>')
            no-repeat;
        }
      }
      &.loading {
        &::before {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(231, 241, 251, 0.3);
          border-top: 2px solid rgba(231, 241, 251, 1);
          left: 0;
          top: -2px;
          animation: loading__anime 1s infinite linear;
        }
        @keyframes loading__anime {
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  `

  return (
    <>
      <button css={Button} onClick={handleGetLocation}>
        {locateLoad ? (
          <span className="loading">位置情報取得中...</span>
        ) : (
          <span className="locate">位置情報を取得</span>
        )}
      </button>
    </>
  )
}
