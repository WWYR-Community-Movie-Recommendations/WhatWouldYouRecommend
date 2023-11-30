import { useState } from 'react';
import { Container, Navbar, Nav, Modal, Button, Form, Carousel, Card, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container fluid className={styles.homePageGridContainer}>
      <Navbar expand="lg" variant="dark" className={styles.homePageNavContainer}>
      <Nav className={`flex-column ${styles.homePageNavColumn}`}>
          <Button variant="primary" as={Link} to="/home" className={styles.homePageNavButton}>Home</Button>
          <Button variant="primary" onClick={handleShowModal} className={styles.homePageNavButton}>Share a Movie</Button>
          <Button variant="primary" as={Link} to="/community-list" className={styles.homePageNavButton}>Community List</Button>
          <Button variant="primary" as={Link} to="/about-us" className={styles.homePageNavButton}>About Us</Button>
          <Button variant="primary" as={Link} to="/logout" className={styles.homePageNavButton}>Log Out</Button>
        </Nav>
      </Navbar>

      <div className={styles.recommendationContainer}>
        <h1 className={styles.homePageH1}>Random Movie Recommendations</h1>
        <h2 className={styles.homePageH2}>Welcome User!</h2>
  
        <Carousel className={styles.homePageCarousel} variant='dark'>
          <Carousel.Item className={styles.homePageCarouselItem}>
            <Card 
              style={{ width: '45vw' }} 
              className={styles.homePageVideoCard}
            >
              <Card.Body>
                <iframe
                  className={styles.homePageVideoContainer}
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/EyG3xl9jF40"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen>
                </iframe>
                <Card.Title>Movie Name</Card.Title>
                <Card.Text>
                  Movie Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere repellendus voluptatem perspiciatis excepturi quidem, explicabo aliquid modi incidunt tempora, unde natus consequuntur rerum. Excepturi veritatis repellendus reprehenderit. Ipsam, aperiam velit?
                </Card.Text>
                <Card.Text>Recommended By: User Name</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>

        {/* <p className={styles.homePageMovieProperties}>
          Click Button Below for Another Movie Recommendation!
        </p>

        <Button type="button" className={styles.getMovieButton}>Get Movie!</Button> */}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>

        <Modal.Header closeButton>
          <Modal.Title>Share Your Movie Recommendation!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Form>
              <Form.Group controlId="movieTitle">
                <Form.Label></Form.Label>
                <Form.Control placeholder="Enter Name of Movie"type="text"/>
              </Form.Group>

              <Form.Group controlId="movieComment">
                <Form.Label></Form.Label>
                <Form.Control placeholder="Enter Movie Comment"type="text"/>
              </Form.Group>

              <Form.Group controlId="movieTrailer">
                <Form.Label></Form.Label>
                <Form.Control placeholder="Enter Movie Trailer URL"type="text"/>
              </Form.Group>

              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control as="select" name="status" defaultValue="">
                  <option value="" disabled>Choose genre...</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animation</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Family">Family</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Suspense">Suspense</option>
                </Form.Control>
              </Form.Group>
              
              <Button 
                className={styles.shareRecommendationButton} 
                variant="primary" 
                type="submit"
              >
                Share Movie!
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default HomePage;


