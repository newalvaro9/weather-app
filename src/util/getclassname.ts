export default function getClassName(response: any): string {
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
    return className;
}