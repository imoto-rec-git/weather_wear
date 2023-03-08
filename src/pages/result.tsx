import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import axios from "axios"

const result = () => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios
      .get("https://www.jma.go.jp/bosai/forecast/data/forecast/270000.json")
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (!posts) {
    return null
  }

  const router = useRouter()

  const Main = css`
    background-color: #a1c6ea;
  `
  const Section = css`
    background-color: rgba(245, 245, 245, 0.4);
    width: 96%;
    height: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 12px auto;
    border-radius: 10px;
    box-shadow: 10px 5px 60px rgba(0, 0, 0, 0.25);
    padding: 20px;
  `
  const ImageWrap = css`
    width: 100%;
    height: auto;
    background: #e7f1fb;
    border-radius: 50px 133px 128px 151px / 214px 72px 72px 51px;
    margin: 0 0 12px;
  `
  const WearComment = css`
    font-size: var(--font-size-medium);
    margin: 0 0 20px;
  `
  const WeatherDetail = css`
    margin: 0 0 20px;
  `
  const Area = css`
    text-align: center;
    font-size: var(--font-size-small);
    margin: 0 0 4px;
  `
  const Climate = css`
    font-size: var(--font-size-small);
    text-align: center;
    margin: 0 0 14px;
    line-height: 1;
    span {
      font-size: 2.4rem;
      margin: 0 0 0 8px;
    }
  `
  const Temp = css`
    font-size: var(--font-size-medium);
    list-style: none;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      &:first-child {
        margin: 0 22px 0 0;
        color: var(--color-orange);
      }
      &:last-child {
        color: var(--color-blue);
      }
      span {
        font-size: 2.4rem;
        margin: 0 0 0 0.8rem;
      }
    }
  `
  const BtnWrap = css`
    min-width: 320px;
    margin: 0 auto;
    bottom: 20px;
    button {
      width: 100%;
      color: var(--color-white);
      display: block;
      padding: 19px 0;
      background: linear-gradient(
        45deg,
        rgba(42, 130, 215, 1) 0%,
        rgba(38, 118, 195, 1) 100%
      );
      border: 1px solid #fff;
      border-radius: 24px;
      cursor: pointer;
    }
  `
  const Graph = css`
    width: 100%;
    height: 132px;
    background: rgba(245, 245, 245, 0.2);
    margin: 0 0 2.6rem;
    border-radius: 0.8rem;
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
          <div>
            <div css={ImageWrap}>
              <Image
                src="/images/result_wear.svg"
                alt="Weather Wear"
                width={320}
                height={325}
              />
            </div>
            <p css={WearComment}>
              朝・夜は　ジャケットなど羽織るものが必要で昼は薄手の長袖シャツなどで十分でしょう。
              <br />
              今日も一日がんばりましょう！
            </p>
            <div css={WeatherDetail}>
              <p css={Area}>{posts[0].timeSeries[0].areas[0].area.name}</p>
              <p css={Climate}>
                今日の天気は
                <span>{posts[0].timeSeries[0].areas[0].weathers[0]}</span>
              </p>
              <ul css={Temp}>
                <li>
                  最高気温
                  <span>{posts[0].timeSeries[2].areas[0].temps[1]}°</span>
                </li>
                <li>
                  最低気温
                  <span>{posts[0].timeSeries[2].areas[0].temps[0]}°</span>
                </li>
              </ul>
            </div>
            <div css={Graph}></div>
          </div>
          <div css={BtnWrap}>
            <button onClick={() => router.push("/")}>TOP</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default result
