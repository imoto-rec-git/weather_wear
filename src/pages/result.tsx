import { useState, useEffect } from "react"
import Head from "next/head"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const result = () => {
  const [posts, setPosts] = useState(null)
  const [area, setArea] = useState(null)
  const [tempList3h, setTempList3h] = useState([])
  const [maxVal, setMaxVal] = useState(null)
  const [minVal, setMinVal] = useState(null)
  const [wcArr, setWcArr] = useState([])
  const [wc, setWc] = useState(null)
  const [wt, setWt] = useState(null)
  const [wearJudgeImg, setWearJudgeImg] = useState(null)
  const [wearJudgeTxt, setWearJudgeTxt] = useState(null)

  const router = useRouter()
  const { pref, lat, lng } = router.query

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode`
      )
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log("Error occurred while fetching data: ", err)
      })
  }, [pref, lat, lng])

  const mostValue = (arr) => {
    let freq = {}
    for (let i = 0; i < arr.length; i++) {
      let el = arr[i]
      if (freq[el]) {
        freq[el]++
      } else {
        freq[el] = 1
      }
    }

    let maxFreq = 0
    let mode = null
    for (let el in freq) {
      if (freq[el] > maxFreq) {
        maxFreq = freq[el]
        mode = el
      }
    }
    return mode
  }

  const weatherText = (code) => {
    if (code == 0 || code == 1) {
      setWt("晴れ")
    } else if (code == 2 || code == 3) {
      setWt("晴れのち曇り")
    } else if (
      code == 61 ||
      code == 63 ||
      code == 65 ||
      code == 66 ||
      code == 67
    ) {
      setWt("雨")
    } else {
      setWt("-")
    }
  }

  const wearImgJudge = (maxTemp) => {
    if (maxTemp >= 25) {
      setWearJudgeImg("/images/result_1.png")
    } else if (maxTemp >= 16) {
      setWearJudgeImg("/images/result_2.png")
    } else if (maxTemp >= 8) {
      setWearJudgeImg("/images/result_3.png")
    } else {
      setWearJudgeImg("/images/result_4.png")
    }
  }

  const wearTxtJudge = (maxTemp) => {
    if (maxTemp >= 25) {
      setWearJudgeTxt(
        "日差しが暑く、歩くだけで汗ばみがちです。半袖など快適な服装がおすすめです。"
      )
    } else if (maxTemp >= 16) {
      setWearJudgeTxt(
        "風が吹くと少し涼しく感じるかもしれません。上着は要らず長袖シャツなどで十分です。"
      )
    } else if (maxTemp >= 8) {
      setWearJudgeTxt(
        "風が吹くと寒く感じます。トレンチコートや厚手のニットなどおすすめです。"
      )
    } else {
      setWearJudgeTxt(
        "冬を感じる冷たい空気です。場合によって肌が痛くなる寒さなので、冬物コートや厚手のダウンがおすすめです。"
      )
    }
  }
  const tempListFilter = (arr) => {
    const every3hours_arr = arr.filter((_, i) => i % 3 === 0)
    setTempList3h(every3hours_arr)
  }

  useEffect(() => {
    if (posts) {
      setArea(pref)
      const temp_arr = [...posts.hourly.temperature_2m.slice(0, 24)]
      tempListFilter(temp_arr)
      const max_val = Math.max(...tempList3h)
      setMaxVal(max_val)
      const min_val = Math.min(...tempList3h)
      setMinVal(min_val)
      const wc_arr = [...posts.hourly.weathercode.slice(0, 24)]
      setWcArr(wc_arr)
      setWc(mostValue(wc_arr))
      weatherText(mostValue(wc_arr))
      wearImgJudge(max_val)
      wearTxtJudge(max_val)
    }
  }, [posts, maxVal, minVal])

  // 折れ線グラフのロジック（react-chartjs-2ライブラリ使用）
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: false,
        text: false,
      },
      legend: {
        display: false,
      },
      scales: {
        display: false,
      },
    },
  }
  const chartData = {
    labels: ["0h", "3h", "6h", "9h", "12h", "15h", "18h", "21h"],
    datasets: [
      {
        label: "",
        data: tempList3h,
        borderColor: "rgb(40, 124, 205)",
        backgroundColor: "rgb(255, 255, 255)",
      },
    ],
  }

  const Main = css`
    background-color: #a1c6ea;
  `
  const Section = css`
    background-color: rgba(245, 245, 245, 0.4);
    width: 96%;
    min-height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 12px auto;
    border-radius: 10px;
    box-shadow: 10px 5px 60px rgba(0, 0, 0, 0.25);
    padding: 20px;
  `
  const WearImg = css`
    width: 100%;
    height: auto;
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
  const BtnWrap = css`
    min-width: 320px;
    margin: 0 auto;
    bottom: 20px;
    button {
      width: calc(100% - 2px);
      color: var(--color-white);
      display: block;
      padding: 19px 0;
      background: linear-gradient(
        45deg,
        rgba(42, 130, 215, 1) 0%,
        rgba(38, 118, 195, 1) 100%
      );
      border: none;
      border-radius: 24px;
      cursor: pointer;
      position: relative;
      z-index: 1;
      &::before {
        content: "";
        z-index: -1;
        position: absolute;
        top: -1px;
        right: 0px;
        bottom: 0px;
        left: -1px;
        background: linear-gradient(
          135deg,
          rgba(231, 241, 251, 1) 0%,
          rgba(194, 204, 215, 1) 100%
        );
        -webkit-transform: translate3d(0px, 0px, 0) scale(1.06);
        -moz-transform: translate3d(0px, 0px, 0) scale(1.06);
        -ms-transform: translate3d(0px, 0px, 0) scale(1.06);
        transform: translate3d(0, 0, 0) scale(1);
        -webkit-filter: blur(0px);
        filter: blur(0px);
        opacity: var(1);
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
        border-radius: inherit;
        width: 100%;
        height: 55px;
      }
      &::after {
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0px;
        left: 0;
        background: inherit;
        border-radius: inherit;
      }
    }
  `
  const Graph = css`
    max-width: min-content;
    width: 100%;
    height: 132px;
    background: rgba(245, 245, 245, 0.2);
    margin: 0 auto 2.6rem;
    padding: 1.2rem;
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
            <img
              src={wearJudgeImg}
              alt="Weather Wear"
              width={322}
              height={322}
              css={WearImg}
            />
            <p css={WearComment}>
              {wearJudgeTxt}
              <br />
              今日も一日がんばりましょう！
            </p>
            <div css={WeatherDetail}>
              {area && (
                <div css={Area}>
                  <p>{area}</p>
                </div>
              )}
              <p css={Climate}>
                今日の天気は
                <span>{wt}</span>
              </p>
              <ul css={Temp}>
                <li>
                  最高気温
                  <span>{maxVal}°</span>
                </li>
                <li>
                  最低気温
                  <span>{minVal}°</span>
                </li>
              </ul>
            </div>
            <div css={Graph}>
              <Line
                options={chartOptions}
                data={chartData}
                width={500}
                height={400}
              />
            </div>
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
