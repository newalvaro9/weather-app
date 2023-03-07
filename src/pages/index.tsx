import styles from '@/styles/Home.module.css'
import { useState, useRef } from 'react'
import * as dotenv from "dotenv";
import Layout from '@/components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [title, setTitle] = useState<string>("Weather App")
  const place = useRef<any>()

  if (typeof window !== "undefined") {
    document.getElementById("textinput")?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        showWeather()
      }
    });
  }
  function getClassName(response: any): string {
    const time = Date.now() > (response.sys.sunrise * 1000) && Date.now() < (response.sys.sunset * 1000)
    var className: string = "wi-dust";

    switch (response.weather[0].main) {
      case "Clear":
        className = time ? "wi-day-sunny" : "wi-night-clear";
        break

      case "Thunderstorm":
        className = "wi-storm-showers";
        break

      case "Snow":
        className = time ? "wi-day-snow-wind" : "wi-night-snow-wind";
        break

      case "Tornado":
        className = "wi-tornado";
        break

      case "Rain":
      case "Drizzle":
      case "Squall":
        className = time ? "wi-day-showers" : "wi-night-alt-showers";
        break

      case "Mist":
      case "Haze":
      case "Fog":
        className = time ? "wi-day-fog" : "wi-night-fog"
        break

      case "Clouds":
        switch (response.weather[0].id) {
          case 801:
            className = time ? "wi-day-cloudy" : "wi-night-alt-cloudy"
            break

          case 802:
            className = "wi-cloud"
            break

          case 803:
          case 804:
            className = "wi-cloudy"
            break
        }
    }
    console.log(className)
    return className;
  }

  function showWeather() {
    if (!place.current?.value) return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place.current?.value}&units=metric&appid=${process.env.API_KEY}`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        let box = document.getElementById('info')
        box!.style.width = "100%"
        box!.style.height = "700px"
        if (response.cod == 200) {
          /* Img classname */
          const img = document.getElementById("image")
          img?.setAttribute('src', '/svg/' + getClassName(response) + '.svg')

          /* Information */
          const temp = document.getElementById('currentTemp')
          const maxtemp = document.getElementById('maxTemp')
          const mintemp = document.getElementById('minTemp')
          const humidity = document.getElementById('humidity')
          const wind = document.getElementById('wind')
          temp!.innerHTML = `${Math.round(response.main.temp)}°`
          maxtemp!.innerHTML = `${Math.round(response.main.temp_min)}°`
          mintemp!.innerHTML = `${Math.round(response.main.temp_max)}°`
          // humidity!.innerHTML = `${response.main.humidity}%`
          // wind!.innerHTML = `${response.wind.speed}km/h`

        } else {
          console.log("NOOOOOT 200")
        }
      });
  }

  return (
    <Layout title={title}>
      <div id="box" className={styles['box']}>

        <div id="subbox" className={styles['subbox']}>
          <FontAwesomeIcon className={styles['locdot']} icon={faLocationDot} />
          <input id="textinput" type="text" ref={place}></input>
          <button className={styles['magnify']} onClick={() => showWeather()}><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></button>
        </div>

        <div id="info" className={styles['info']}>
          <div className={styles['img-div']}>
            <img className={styles['imagen']} id="image" alt="image" />
          </div>

          <div className={styles['wrapinfo']}>

              <div className={styles['temperature']}>
                <span className={styles['currentTemp']} id="currentTemp"></span>

                <div className={styles['maxmin']}>
                  <span className={styles['maxTemp']} id="maxTemp"></span>
                  <span className={styles['minTemp']} id="minTemp"></span>
                </div>
              </div>


            <div className={styles['other']}>
              <span className={styles['humidity']} id="humidity"></span>
              <span className={styles['wind']} id="wind"></span>
            </div>

          </div>

        </div>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </Layout>
  )
}
