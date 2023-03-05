import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import * as dotenv from "dotenv";
import Layout from '@/components/layout'

export default function Home() {
  const [title, setTitle] = useState("Weather App")
  const [place, setPlace] = useState("")

  function showWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${process.env.API_KEY}`)
      .then(function (response) {
        console.log(response);
        let box = document.getElementById('box')
        box!.style.width = "90%"
        box!.style.height = "700px"
        let subbox = document.getElementById('subbox')
        subbox!.style.border = "solid 1px black"
        subbox!.style.borderRadius = "50px"
        if (response.status == 200) {
          // Weather information of the location
        } else {
          document.getElementById('info')!.innerHTML = "Invalid location!"
        }
      });
  }

  return (
    <Layout title={title}>
      <div id="box" className={styles['box']}>
        <div id="subbox" className={styles['subbox']}>
          <input type="text" onChange={event => setPlace(event.target.value)}></input>
          <button onClick={() => showWeather()}><i className="fa fa-search"></i></button>
        </div>
        <div id="info" className={styles['info']}>
          {/* Weather info of the location */}
        </div>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </Layout>
  )
}
