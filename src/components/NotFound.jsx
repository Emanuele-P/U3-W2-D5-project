import { Card, Container } from 'react-bootstrap'

function NotFound({ message }) {
  return (
    <Container className="message d-flex justify-content-center align-items-center">
      <Card className="d-flex justify-content-center align-items-center">
        {message}
      </Card>
    </Container>
  )
}

export default NotFound
