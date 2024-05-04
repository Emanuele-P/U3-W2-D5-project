import { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import NotFound from './NotFound'
import NoContent from './NoContent'
import WeatherIcon from './WeatherIcon'

function MoreCards({ lat, lon }) {
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    return fetchForecast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon])

  const API_KEY = 'c0244df251672a4e585ee6e01739992d'
  const fetchForecast = () => {
    setLoading(true)
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
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
        const dailyData = data.list
          .filter((item) => {
            const date = new Date(item.dt * 1000)
            return date.getUTCHours() === 12
          })
          .slice(0, 4)

        setForecast(dailyData)
        setLoading(false)
        console.log('forecast:', dailyData)
      })
      .catch((error) => {
        console.error('Fetch error', error)
        setError(true)
        setLoading(false)
      })
  }

  if (error) {
    return <NoContent />
  }
  if (loading) {
    return (
      <NotFound
        message={
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        }
      />
    )
  }

  return (
    <>
      <Container className="more-cards mb-5 mt-4 mt-md-0">
        <Row>
          {forecast.map((card, i) => (
            <Col key={`index-${i}`} sm={6} lg={3}>
              <Card className="mt-3">
                <div className="d-flex justify-content-between">
                  <h5>
                    {new Date(card.dt * 1000).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                  </h5>
                  <h5 className="text-monospace text-end">
                    {new Date(card.dt * 1000).toLocaleDateString().slice(0, -5)}
                  </h5>
                </div>
                <p>{card.weather[0].main}</p>
                <hr />
                <div className="d-flex flex-column align-items-center">
                  <h2>{card.main.temp.toFixed(0)}°C</h2>
                  <WeatherIcon iconCode={card.weather[0].icon} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default MoreCards
