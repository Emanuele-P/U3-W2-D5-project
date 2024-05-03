import { Card, Col, Container, Row } from 'react-bootstrap'
import WeatherIcon from './WeatherIcon'
import NotFound from './NotFound'

function TodayDetails({ weatherData }) {
  const inCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0)
  }

  const calculateLocalTime = (offset) => {
    const utcDate = new Date()
    const localDate = new Date(utcDate.getTime() + offset * 1000)
    let timeString = localDate.toLocaleTimeString()

    let timeWithoutSeconds
    if (timeString.includes('AM') || timeString.includes('PM')) {
      timeWithoutSeconds = `${timeString.substring(0, 5)} ${timeString.slice(
        -2
      )}`
    } else {
      timeWithoutSeconds = timeString.substring(0, 5)
    }

    return timeWithoutSeconds
  }
  function convertSpeed(speedMps) {
    return (speedMps * 3.6).toFixed(2)
  }
  const windSpeedKmh = convertSpeed(weatherData.wind.speed)

  const localTime = weatherData
    ? calculateLocalTime(weatherData.timezone)
    : 'Loading time...'

  if (!weatherData) {
    return (
      <NotFound
        message={
          <h2>Search a location by its name, state code, or country code</h2>
        }
      />
    )
  }

  return (
    <>
      <Container className="today">
        <Row>
          <Col md={4}>
            <Card className="card-one">
              <h3>Current Temperature</h3>
              {weatherData ? (
                <>
                  <WeatherIcon iconCode={weatherData.weather[0].icon} />
                  <p>{weatherData.weather[0].description}</p>
                  <hr />
                  <span>{inCelsius(weatherData.main.temp)}°</span>
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </Card>
          </Col>
          <Col md={8}>
            <Card className="card-two">
              <div className="d-flex justify-content-between">
                <div>
                  <h3>Current Weather</h3>
                  <p>Local time: {localTime}</p>
                </div>
                <div>
                  <h3>London</h3>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column pt-2 gap-3">
                  <h5>Max temp:</h5>
                  <h5>Min temp:</h5>
                  <h5>Humidity: </h5>
                  <h5>Feels Like:</h5>
                  <h5>Wind speed:</h5>
                </div>
                <div className="d-flex flex-column align-items-end pt-2 gap-3">
                  <h5>{inCelsius(weatherData.main.temp_max)}°C</h5>
                  <h5>{inCelsius(weatherData.main.temp_min)}°C</h5>
                  <h5>{weatherData.main.humidity}%</h5>
                  <h5>{inCelsius(weatherData.main.feels_like)}°C</h5>
                  <h5>{windSpeedKmh}km/h</h5>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TodayDetails
