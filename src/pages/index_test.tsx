import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Test() {
  const [txt, setTxt] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [reverseGeo, setReverseGeo] = useState(null);
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      setTxt('位置情報機能が利用可能');
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude);
        const latVal = position.coords.latitude;
        setLat(latVal);
        // console.log(position.coords.longitude);
        const lngVal = position.coords.longitude;
        setLng(lngVal);
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latVal}&lon=${lngVal}&zoom=18&addressdetails=1`
          )
          .then((res) => {
            setReverseGeo(res.data.address);
            console.log(res.data.address.state);
          })
          .catch((err) => {
            console.log('Error occurred while fetching data: ', err);
          });
      });
    } else {
      setTxt('位置情報機能が利用不可');
    }
  }, []);

  return (
    <>
      <h1>テストページ</h1>
      <p>
        緯度：{lat}、経度：{lng}
        <br />
        URL:https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude=
        {lng}&hourly=temperature_2m,weathercode
      </p>
      {/* <p>{txt}</p> */}
      <br />
      <p>
        {reverseGeo.state}
        {reverseGeo.city}
      </p>
    </>
  );
}
