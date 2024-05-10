import { useState } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  Row,
  Spinner,
} from 'react-bootstrap'
import TopBar from './TopBar'
import NotFound from './NotFound'

function CustomNavbar() {
  const [searchValue, setSearchValue] = useState('')
  const [locationData, setLocationData] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [manualSelect, setManualSelect] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    setManualSelect(false)
    if (!value.trim()) {
      setLocationData(null)
      setSearchResults([])
      setError('')
    } else {
      fetchLocation(value)
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchValue.trim()) {
      setError('Please enter a valid location')
      setLocationData(null)
      setSearchResults([])
      return
    }
    setIsLoading(true)
    fetchLocation(searchValue, true)
  }

  const handleSelect = (location) => {
    setManualSelect(true)
    setLocationData(location)
    setSearchResults([])
    setSearchValue(location.name)
    setIsLoading(false)
  }

  const API_KEY = 'c0244df251672a4e585ee6e01739992d'
  const fetchLocation = (value, selectFirst = false) => {
    setIsLoading(true)
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
    )
      .then((response) => {
        if (!response.ok) throw new Error('Fetch error')
        return response.json()
      })
      .then((data) => {
        setIsLoading(false)
        if (data.length === 0) {
          setError('No results found for the specified location.')
          setSearchResults([])
        } else {
          setSearchResults(data)
          setError('')
          if (selectFirst && !manualSelect) {
            handleSelect(data[0])
          }
        }
      })
      .catch((error) => {
        console.error('Fetch error', error)
        setError(true)
        setIsLoading(false)
      })
  }

  return (
    <>
      <Container>
        <Navbar className="d-block">
          <Row className="d-md-flex justify-content-between">
            <Col md={5} lg={4} className="d-none d-md-block">
              <div className="search-area">
                <Form
                  className="d-flex align-items-top"
                  onSubmit={handleSubmit}
                >
                  <Form.Control
                    id="searchForm"
                    type="text"
                    placeholder="Enter the location"
                    value={searchValue}
                    onChange={handleChange}
                  />
                  <Button className="search-btn" type="submit">
                    Search
                  </Button>
                </Form>
                {!isLoading && searchResults.length > 0 && (
                  <ListGroup className="search-results">
                    {searchResults.map((result, index) => (
                      <ListGroupItem
                        key={`index-${index}`}
                        onClick={() => handleSelect(result)}
                      >
                        {result.name}, {result.state || result.country}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
              </div>
            </Col>
            <Col
              xs={12}
              md={7}
              lg={8}
              className="d-flex justify-content-md-end align-items-start"
            >
              <div className="d-flex gap-3 gap-md-5 justify-content-md-end align-items-center">
                <Navbar.Brand
                  href=""
                  style={{ color: '$dark', cursor: 'pointer' }}
                  className="d-md-none"
                >
                  <i className="bi bi-umbrella-fill"></i>
                </Navbar.Brand>
                <Nav.Link href="" className="selected">
                  Home
                </Nav.Link>
                <Nav.Link href="">News</Nav.Link>
                <Nav.Link href="">Live</Nav.Link>
                <Navbar.Brand
                  href=""
                  style={{ color: '$dark', cursor: 'pointer' }}
                  className="d-none d-md-block"
                >
                  <i className="bi bi-umbrella-fill"></i>
                </Navbar.Brand>
              </div>
            </Col>
            <Col xs={12} className="d-md-none mt-5">
              <div className="search-area">
                <Form className="d-flex">
                  <Form.Control
                    id="searchForm"
                    type="text"
                    placeholder="Enter the location"
                    value={searchValue}
                    onChange={handleChange}
                  />
                  <Button
                    className="search-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Search
                  </Button>
                </Form>
                {!isLoading && searchResults.length > 0 && (
                  <ListGroup className="search-results">
                    {searchResults.map((result, index) => (
                      <ListGroupItem
                        key={`index-${index}`}
                        onClick={() => handleSelect(result)}
                      >
                        {result.name}, {result.state || result.country}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
              </div>
            </Col>
          </Row>
        </Navbar>
      </Container>

      {isLoading && searchValue && (
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
      {error && <NotFound message={<h2>Please search a valid location</h2>} />}
      {!error && locationData && <TopBar locationData={locationData} />}
    </>
  )
}

export default CustomNavbar
