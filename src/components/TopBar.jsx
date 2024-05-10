import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import WeatherIcon from './WeatherIcon'
import TodayDetails from './TodayDetails'
import NoContent from './NoContent'
import NotFound from './NotFound'
import MoreCards from './MoreCards'

function TopBar({ locationData }) {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (locationData && locationData.lat && locationData.lon) {
      fetchWeather(locationData.lat, locationData.lon)
    } else {
      setError(true)
    }
  }, [locationData])

  const API_KEY = 'c0244df251672a4e585ee6e01739992d'
  const fetchWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          setError(true)
          throw new Error('Fetch error')
        }
      })
      .then((data) => {
        setWeather(data)
        setError(false)
        console.log('weather:', data)
      })
      .catch((error) => {
        console.error('Fetch error', error)
        setError(true)
        setWeather(null)
      })
  }

  if (error) {
    return <NoContent />
  }
  if (!weather) {
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
      <Container className="top-bar d-flex justify-content-between">
        <h1>
          {locationData.name},<br />
          {locationData.state || locationData.country}
        </h1>
        <div className="d-flex gap-3">
          <div className="d-none d-md-flex align-items-center">
            <WeatherIcon iconCode={weather.weather[0].icon} />
          </div>
          <div className="text-end">
            <h2>Weather</h2>
            <h4>Today</h4>
            <h4 className="text-primary">{weather.weather[0].main}</h4>
          </div>
        </div>
      </Container>
      {weather && <TodayDetails weatherData={weather} />}
      {weather && <MoreCards lat={locationData.lat} lon={locationData.lon} />}
    </>
  )
}

export default TopBar
