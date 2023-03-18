import Head from "next/head"
import Image from "next/image"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"

export default function Home() {
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

  const Main = css`
    background-color: #a1c6ea;
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    &::before,
    &::after {
      content: "";
      z-index: 1;
      filter: blur(100px);
      position: absolute;
    }
    &::before {
      width: 592px;
      height: 472px;
      left: 165px;
      top: -215px;
      border-radius: 50%;
      background: #629cd5;
      box-shadow: -153px 690px 0 #507dbc;
    }
    &::after {
      content: "";
      width: 517px;
      height: 311px;
      left: -378px;
      top: 139px;
      background: #e7f1fb;
    }
  `
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
  const logoWrap = css`
    position: absolute;
    top: -120px;
    bottom: 0;
    margin: auto;
    text-align: center;
    width: 197px;
    height: 87px;
  `
  const Paragraph = css`
    font-size: 12px;
    color: #287ccd;
  `
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
    button {
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
      }
    }
  `

  return (
    <>
      <Head>
        <title>Weather Wear | 今日のファッションは天気次第</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={Main}>
        <section css={Section}>
          <div css={logoWrap}>
            <h1>
              <Image
                src="/images/logo.png"
                alt="Weather Wear"
                priority={true}
                width={197}
                height={56}
              />
            </h1>
            <p css={Paragraph}>今日のファッションは天気次第</p>
          </div>
          <div css={BtnWrap}>
            <button onClick={handleGetLocation}>
              {locateLoad ? (
                <span className="locate">位置情報取得中...</span>
              ) : (
                <span className="locate">位置情報を取得</span>
              )}
            </button>
            <button onClick={() => router.push("/pref")}>
              <span className="search">都道府県を選択</span>
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
