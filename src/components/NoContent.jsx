import { Card, Container } from 'react-bootstrap'

function NoContent() {
  return (
    <Container className="error d-flex justify-content-center align-items-center">
      <Card className="d-flex justify-content-center align-items-center">
        <h2>Oops! Something went wrong...</h2>
        <h4>
          We're sorry for the inconvenience. Please try refreshing the page (ง ◉
          _ ◉)ง
        </h4>
      </Card>
    </Container>
  )
}

export default NoContent
