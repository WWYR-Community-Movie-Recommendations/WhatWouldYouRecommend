import { useState } from 'react';
import { Container, Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import Movies from './Movies'

function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container fluid className={styles.homePageGridContainer}>

      <Navbar expand="lg" variant="dark" className={styles.homePageNavContainer}>
        <Nav className={`flex-column ${styles.homePageNavColumn}`}>

          <Button 
            variant="primary" 
            as={Link} 
            to="/home" 
            className={styles.homePageNavButton}
          >
            Home
          </Button>

          <Button 
            variant="primary" 
            onClick={handleShowModal} 
            className={styles.homePageNavButton}
          >
            Share a Movie
          </Button>

          <Button 
            variant="primary" 
            as={Link} to="/community-list" 
            className={styles.homePageNavButton}
          >
            Community List
          </Button>

          <Button 
            variant="primary" 
            as={Link} to="/about-us" 
            className={styles.homePageNavButton}
          >
            About Us
          </Button>

          <Button 
            variant="primary" 
            as={Link} to="/logout" 
            className={styles.homePageNavButton}
          >
            Log Out
          </Button>

        </Nav>
      </Navbar>

      <Container className={styles.recommendationContainer}>

        <h1 className={styles.homePageH1}>Random Movie Recommendations</h1>
        <h2 className={styles.homePageH2}>Welcome User!</h2>
        <Movies />
        
      </Container>

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


