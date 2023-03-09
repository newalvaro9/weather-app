import styles from '@/styles/Home.module.css'
import { useState, useRef } from 'react'
import * as dotenv from "dotenv";
import Layout from '@/components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import getClassName from '@/util/getclassname';
import toBeaufort from '@/util/tobeaufort'
import toDate from '@/util/todate'

export default function Home() {
  const [title, setTitle] = useState<string>("Weather App")
  const place = useRef<any>()
  const units = { "current": { "value": "metric" } }

  if (typeof window !== "undefined") {
    document.getElementById("textinput")?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        showWeather()
      }
    });
  }

  function showWeather() {
    if (!place.current?.value) return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place.current?.value}&units=${units.current?.value}&appid=${process.env.API_KEY}`)
      .then(res => res.json())
      .then(response => {

        if (response.cod == 200) {

          const box = document.getElementById('infobox')
          box!.style.display = "block"
          box!.style.width = "100%"
          box!.style.height = "700px"
          const info = document.getElementById('info')
          info!.style.display = "flex"
          info!.style.height = "100%"


          /* Img classname */
          const img = document.getElementById("image")
          img?.setAttribute('src', '/svg/' + getClassName(response) + '.svg')

          const windSBeau = document.getElementById("windbeaufort")
          windSBeau?.setAttribute('src', `/svg/wi-wind-beaufort-${toBeaufort(response.wind.speed)}.svg`)

          /* Information */
          const temp = document.getElementById('currentTemp')
          const maxtemp = document.getElementById('maxTemp')
          const mintemp = document.getElementById('minTemp')
          const humidityfeelslike = document.getElementById('humidityfeelslike')
          const desc = document.getElementById('desc')
          const tz = document.getElementById('tz')
          const svg = document.getElementById('windbeaufort')

          temp!.innerHTML = `${Math.round(response.main.temp)}°`
          maxtemp!.innerHTML = `${Math.round(response.main.temp_min)}°`
          mintemp!.innerHTML = `${Math.round(response.main.temp_max)}°`
          humidityfeelslike!.innerHTML = `Feels like: ${Math.round(response.main.feels_like)}° Humidity: ${response.main.humidity}%`
          desc!.innerHTML = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1)
          tz!.innerHTML = toDate(response.dt * 1000)
          svg!.style.display = 'block'
        } else {
          const box = document.getElementById('infobox')
          box!.style.display = "none"
        }
      });
  }

  return (
    <Layout title={title}>
      <div id="box" className={styles['box']}>


        <div id="subbox" className={styles['subbox']}>
          <FontAwesomeIcon className={styles['locdot']} icon={faLocationDot} />
          <input autoComplete='off' id="textinput" type="text" ref={place}></input>
          <button className={styles['magnify']} onClick={() => showWeather()}><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></button>
        </div>

        <div id="infobox" className={styles['info-box']}>

          <div className={styles['container-timezone']}>
            <span className={styles['timezone']} id="tz"></span>
          </div>

          <div id="info" className={styles['info']}>
            <div className={styles['img-div']}>
              <img className={styles['imagen']} id="image" alt="image" />
              <span className={styles['descripcion']} id="desc"></span>
            </div>

            <div className={styles['wrapinfo']}>

              <div className={styles['weather']}>
                <div className={styles['temperature']}>
                  <span className={styles['currentTemp']} id="currentTemp"></span>

                  <div className={styles['maxmin']}>
                    <span className={styles['maxTemp']} id="maxTemp"></span>
                    <span className={styles['minTemp']} id="minTemp"></span>
                  </div>

                </div>

                <div className={styles['hum-feel-container']}>
                  <span className={styles['hum-feel-text']} id="humidityfeelslike"></span>
                </div>
              </div>

              <div className={styles['extra-info']}>
                <a href='https://en.m.wikipedia.org/wiki/Beaufort_scale#Modern_scale:~:text=along%20the%20shore.-,Modern%20scale,-Edit' target='_blank'><img className={styles['wind-beaufort']} id="windbeaufort"></img></a>
                <span className={styles['wind']} id="wind"></span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </Layout>
  )
}
