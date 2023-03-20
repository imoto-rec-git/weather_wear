import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { css } from "@emotion/react"
import { ReturnButton } from "@/components/molecules/ReturnButton"
import { TempChart } from "@/components/molecules/TempChart"
import { TempHighLow } from "@/components/molecules/TempHighLow"
import { TodayWeather } from "@/components/molecules/TodayWeather"
import { UserArea } from "@/components/molecules/UserArea"
import { WearComment } from "@/components/molecules/WearComment"
import { WearImg } from "@/components/molecules/WearImg"
import { Loading } from "@/components/molecules/Loading"

export const ProductResult = () => {
  const [posts, setPosts] = useState(null)
  const [area, setArea] = useState("")
  const [tempList3h, setTempList3h] = useState<number[]>([])
  const [maxVal, setMaxVal] = useState(0)
  const [minVal, setMinVal] = useState(0)
  const [wcArr, setWcArr] = useState<number[]>([])
  const [wc, setWc] = useState(0)
  const [wt, setWt] = useState("")
  const [wearJudgeImg, setWearJudgeImg] = useState("")
  const [wearJudgeTxt, setWearJudgeTxt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { pref, lat, lng } = router.query

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode`
      )
      .then((res) => {
        setPosts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log("Error occurred while fetching data: ", err)
        setIsLoading(false)
      })
  }, [pref, lat, lng])

  const mostValue = (arr: number[]) => {
    let freq = []
    for (let i = 0; i < arr.length; i++) {
      let el: number = arr[i]
      if (freq[el]) {
        freq[el]++
      } else {
        freq[el] = 1
      }
    }

    let maxFreq = 0
    let mode: number = 0
    for (let el of freq) {
      if (freq[el] > maxFreq) {
        maxFreq = freq[el]
        mode = el
      }
    }
    return mode
  }

  const weatherText = (code: number) => {
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

  const wearImgJudge = (maxTemp: number) => {
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

  const wearTxtJudge = (maxTemp: number) => {
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
  const tempListFilter = (arr: number[]) => {
    const every3hours_arr: number[] = arr.filter((_, i) => i % 3 === 0)
    setTempList3h(every3hours_arr)
  }

  useEffect(() => {
    if (posts) {
      setArea(pref)
      const temp_arr: number[] = [...posts.hourly.temperature_2m.slice(0, 24)]

      tempListFilter(temp_arr)
      const max_val = Math.max(...tempList3h)
      setMaxVal(max_val)
      const min_val = Math.min(...tempList3h)
      setMinVal(min_val)
      const wc_arr: number[] = [...posts.hourly.weathercode.slice(0, 24)]
      setWcArr(wc_arr)
      setWc(mostValue(wc_arr))
      weatherText(mostValue(wc_arr))
      wearImgJudge(max_val)
      wearTxtJudge(max_val)
    }
  }, [posts, maxVal, minVal])

  const Section = css`
    position: relative;
    z-index: 2;
    background-color: rgba(245, 245, 245, 0.2);
    max-width: 640px;
    width: calc(100% - 20px);
    height: auto;
    margin: 10px auto;
    border-radius: 12px;
    box-shadow: 10px 5px 60px rgba(0, 0, 0, 0.25);
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.5);
  `
  const ResultWrapper = css`
    width: 100%;
    margin: auto;
  `
  const WeatherDetail = css`
    margin: 0 0 2rem;
  `

  return (
    <>
      <section css={Section}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div css={ResultWrapper}>
              <WearImg wearJudgeImg={wearJudgeImg} />
              <WearComment wearJudgeTxt={wearJudgeTxt} />
              <div css={WeatherDetail}>
                <UserArea userArea={area} />
                <TodayWeather weatherData={wt} />
                <TempHighLow datas={{ maxVal, minVal }} />
              </div>
              <TempChart dataList={tempList3h} />
            </div>
            <ReturnButton />
          </>
        )}
      </section>
    </>
  )
}
