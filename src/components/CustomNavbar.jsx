import { useState } from 'react'
import { Button, Container, Form, Nav, Navbar, Spinner } from 'react-bootstrap'
import TopBar from './TopBar'
import NoContent from './NoContent'
import NotFound from './NotFound'

function CustomNavbar() {
  const [searchValue, setSearchValue] = useState('')
  const [locationData, setLocationData] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    if (!value.trim()) {
      setLocationData(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchValue.trim()) {
      setLocationData(null)
      return
    }
    fetchLocation()
  }

  const API_KEY = 'c0244df251672a4e585ee6e01739992d'
  const fetchLocation = (value) => {
    setIsLoading(true)
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${API_KEY}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Fetch error')
        }
      })
      .then((data) => {
        if (data.length === 0) {
          setError('No results found for the specified location.')
          setLocationData(null)
        } else {
          setLocationData(data)
          setError('')
        }
      })
      .catch((error) => {
        console.error('Fetch error', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Container>
        <Navbar className="justify-content-between">
          <Form className="d-flex">
            <Form.Control
              id="searchForm"
              type="text"
              placeholder="Enter the location"
              value={searchValue}
              onChange={handleChange}
            />
            <Button className="search-btn" type="submit" onClick={handleSubmit}>
              Search
            </Button>
          </Form>
          <div className="ms-auto d-flex align-items-center gap-5">
            <Nav.Link href="" className="selected">
              Home
            </Nav.Link>
            <Nav.Link href="">News</Nav.Link>
            <Nav.Link href="">Live</Nav.Link>
            <Navbar.Brand href="" style={{ color: '$dark', cursor: 'pointer' }}>
              <i className="bi bi-umbrella-fill"></i>
            </Navbar.Brand>
          </div>
        </Navbar>
      </Container>
      {isLoading && (
        <NotFound
          message={
            <Spinner animation="border" role="status">
              <span className="visually-hidden"></span>
            </Spinner>
          }
        />
      )}
      {!searchValue && !isLoading && (
        <NotFound
          message={
            <h2>Search a location by its name, state code, or country code</h2>
          }
        />
      )}
      {error && <NoContent />}
      {!error && locationData && <TopBar locationData={locationData} />}
    </>
  )
}

export default CustomNavbar
