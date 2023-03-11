import Head from "next/head"
import { css } from "@emotion/react"
import { withRouter } from "next/router"
import { useState } from "react"

const Pref = ({ router }) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState("")

  const hendlePrefectureSelect = (event) => {
    const selectedPrefecture = event.target.value
    const selectedPrefectureInfo = prefList
      .flatMap((pref) => pref.list)
      .find((item) => item.name === selectedPrefecture)
    const { lat, lng } = selectedPrefectureInfo
    setSelectedPrefecture(selectedPrefecture)
    router.push(`/result?pref=${selectedPrefecture}&lat=${lat}&lng=${lng}`)
  }

  const prefList = [
    {
      area: "北海道・東北",
      list: [
        { name: "北海道", lat: 43.063, lng: 141.347 },
        { name: "青森県", lat: 40.822, lng: 140.747 },
        { name: "岩手県", lat: 39.703, lng: 141.152 },
        { name: "宮城県", lat: 38.268, lng: 140.871 },
        { name: "秋田県", lat: 39.718, lng: 140.102 },
        { name: "山形県", lat: 38.24, lng: 140.363 },
        { name: "福島県", lat: 37.75, lng: 140.467 },
      ],
    },
    {
      area: "関東",
      list: [
        { name: "茨城県", lat: 36.341, lng: 140.446 },
        { name: "栃木県", lat: 36.565, lng: 139.883 },
        { name: "群馬県", lat: 36.39, lng: 139.06 },
        { name: "埼玉県", lat: 35.857, lng: 139.648 },
        { name: "千葉県", lat: 35.605, lng: 140.123 },
        { name: "東京都", lat: 35.689, lng: 139.691 },
        { name: "神奈川県", lat: 35.447, lng: 139.642 },
      ],
    },
    {
      area: "中部",
      list: [
        { name: "新潟県", lat: 37.902, lng: 139.023 },
        { name: "富山県", lat: 36.695, lng: 137.211 },
        { name: "石川県", lat: 36.594, lng: 136.625 },
        { name: "福井県", lat: 36.065, lng: 136.221 },
        { name: "山梨県", lat: 35.663, lng: 138.568 },
        { name: "長野県", lat: 36.651, lng: 138.181 },
        { name: "岐阜県", lat: 35.391, lng: 136.722 },
        { name: "静岡県", lat: 34.976, lng: 138.383 },
        { name: "愛知県", lat: 35.18, lng: 136.906 },
      ],
    },
    {
      area: "近畿",
      list: [
        { name: "三重県", lat: 34.73, lng: 136.508 },
        { name: "滋賀県", lat: 35.004, lng: 135.868 },
        { name: "京都府", lat: 35.011, lng: 135.768 },
        { name: "大阪府", lat: 34.693, lng: 135.502 },
        { name: "兵庫県", lat: 34.691, lng: 135.18 },
        { name: "奈良県", lat: 34.685, lng: 135.804 },
        { name: "和歌山県", lat: 34.226, lng: 135.167 },
      ],
    },
    {
      area: "中国",
      list: [
        { name: "鳥取県", lat: 35.503, lng: 134.238 },
        { name: "島根県", lat: 35.472, lng: 133.05 },
        { name: "岡山県", lat: 34.892, lng: 133.82 },
        { name: "広島県", lat: 34.385, lng: 132.455 },
        { name: "山口県", lat: 34.178, lng: 131.473 },
      ],
    },
    {
      area: "四国",
      list: [
        { name: "徳島県", lat: 34.065, lng: 134.559 },
        { name: "香川県", lat: 34.34, lng: 134.043 },
        { name: "愛媛県", lat: 33.841, lng: 132.765 },
        { name: "高知県", lat: 33.559, lng: 133.531 },
      ],
    },
    {
      area: "九州",
      list: [
        { name: "福岡県", lat: 33.606, lng: 130.418 },
        { name: "佐賀県", lat: 33.249, lng: 130.299 },
        { name: "長崎県", lat: 32.744, lng: 129.873 },
        { name: "熊本県", lat: 32.789, lng: 130.741 },
        { name: "大分県", lat: 33.238, lng: 131.612 },
        { name: "宮崎県", lat: 31.911, lng: 131.423 },
        { name: "鹿児島県", lat: 31.56, lng: 130.558 },
        { name: "沖縄県", lat: 26.212, lng: 127.68 },
      ],
    },
  ]

  const Main = css`
    background-color: var(--color-light-blue);
    position: relative;
  `
  const Section = css`
    background-color: rgba(245, 245, 245, 0.4);
    width: calc(100% - 20px);
    height: auto;
    margin: 10px auto;
    border-radius: 12px;
    box-shadow: 10px 5px 60px rgba(0, 0, 0, 0.25);
    padding: 26px 10px 24px;
  `
  const Note = css`
    font-size: var(--font-size-medium);
    font-weight: bold;
    text-align: center;
    margin: 0 0 26px;
  `
  const PrefWrapper = css`
    margin: 0 0 24px;
    p {
      color: var(--color-blue);
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-bold);
      margin: 0 0 18px;
    }
  `
  const PrefDivision = css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    input[type="radio"] {
      display: none;
    }
    label {
      width: 74px;
      text-align: center;
      background: var(--color-white);
      border-radius: 8px;
      padding: 12px;
      line-height: 1;
      font-size: var(--font-size-small);
      border: 1px solid var(--color-gray);
      &:active {
        color: var(--color-white);
        background: var(--color-blue);
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

  return (
    <>
      <Head>
        <title>都道府県を選択 | Weather Wear</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={Main}>
        <section css={Section}>
          <p css={Note}>都道府県を１つ選択してください</p>
          {prefList.map((pref, index) => (
            <div key={`pref-${index}`} css={PrefWrapper}>
              <p>{pref.area}</p>
              <div css={PrefDivision}>
                {pref.list.map((item, index) => (
                  <label key={`pref-${index}-item`} htmlFor={item.name}>
                    <input
                      type="radio"
                      name="pref"
                      value={item.name}
                      id={item.name}
                      onChange={hendlePrefectureSelect}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div css={BtnWrap}>
            <button onClick={() => router.push("/")}>TOPへ</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default withRouter(Pref)
