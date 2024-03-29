import Head from "next/head"
import { withRouter } from "next/router"
import { Layout } from "@/components/templates/Layout"
import { ProductPrefectureSelect } from "@/components/organisms/ProductPrefectureSelect"

const Pref = () => {
  return (
    <>
      <Head>
        <title>都道府県を選択 | Weather Wear</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ProductPrefectureSelect />
      </Layout>
    </>
  )
}

export default withRouter(Pref)
