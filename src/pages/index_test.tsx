import { useEffect, useState } from "react"

export default function Test() {
  const [txt, setTxt] = useState(null)
  const [location, setLocation] = useState(null)
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setTxt("位置情報機能が利用可能")
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
      })
    } else {
      setTxt("位置情報機能が利用不可")
    }
  }, [])
  return (
    <>
      <h1>テストページ</h1>
      <p>Latitude:{location}</p>
      <p>{txt}</p>
    </>
  )
}
