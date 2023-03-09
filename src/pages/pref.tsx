import Head from "next/head"
import { css } from "@emotion/react"
import { useRouter } from "next/router"

const Pref = () => {
  const router = useRouter()
  const prefList = [
    {
      area: "北海道・東北",
      list: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
      ],
    },
    {
      area: "関東",
      list: [
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
      ],
    },
    {
      area: "中部",
      list: [
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
      ],
    },
    {
      area: "近畿",
      list: [
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
      ],
    },
    {
      area: "中国",
      list: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
    },
    {
      area: "四国",
      list: ["徳島県", "香川県", "愛媛県", "高知県"],
    },
    {
      area: "九州",
      list: [
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県",
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
          <form>
            {prefList.map((region) => {
              return (
                <>
                  <div css={PrefWrapper}>
                    <p key={region.area}>{region.area}</p>
                    <div css={PrefDivision}>
                      {region.list.map((name, index) => {
                        return (
                          <>
                            <input key={index} type="radio" id={name} />
                            <label
                              htmlFor={name}
                              key={name}
                              onClick={() => router.push("/result")}
                            >
                              {name}
                            </label>
                          </>
                        )
                      })}
                    </div>
                  </div>
                </>
              )
            })}
          </form>
          <div css={BtnWrap}>
            <button onClick={() => router.push("/")}>TOPへ</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Pref