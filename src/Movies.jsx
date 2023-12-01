import { Carousel, Card, Container, Button, Modal, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import styles from './HomePage.module.css';
import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER;

function Movies({ movies, error, getToken }) {

  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [currentMovie, setCurrentMovie] = useState('');

  const handleRecommendationsClick = async (movieTitle) => {
    const formattedTitle = movieTitle.replace(/\s/g, "_");
    const url = `${SERVER}/gpt-movies?nameOfMovie=${formattedTitle}`;
    try {
      
      const jwt = await getToken();
      if (!jwt) {
        throw new Error('Failed to retrieve JWT');
      }
  
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
  
      console.log(config);

      const response = await axios.get(url, config);
      console.log(response.data.data);

      setRecommendations(response.data.data);
      setCurrentMovie(movieTitle);
      setShowModal(true);
    } catch (error) {
      console.error('Error making API call to AI', error);
    }
  };


  return (
    <Container>
      {error && <p className="error-message">Error: {error}</p>}
  
      <Carousel className={styles.homePageCarousel} variant='dark'>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Carousel.Item key={movie._id} className={styles.homePageCarouselItem}>

              <Card style={{ width: '45vw' }} className={styles.homePageVideoCard}>
                <Card.Body>
                  <iframe
                    className={styles.homePageVideoContainer}
                    width="560"
                    height="315"
                    src={movie.videoLink} 
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen>
                  </iframe>
                  <Card.Title>{movie.movieName}</Card.Title>
                  <Card.Text>{movie.userComment}</Card.Text>
                  <Card.Text>Recommended By: {movie.userName}</Card.Text>
                  <Card.Text>Genre: {movie.genre}</Card.Text>
                  <Card.Text>MovieId: {movie._id}</Card.Text>

                  <Button onClick={() => handleRecommendationsClick(movie.movieName)}>
                    New! AI Recommendations for Movies Like This!
                  </Button>

                </Card.Body>
              </Card>

            </Carousel.Item>
          ))
        ) : (
          error ? <h3>Error loading books.</h3> : <h3>No Books Found, Share a movie!</h3> // You can render something else when there are no movies
        )}
      </Carousel>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Here are five movies like {currentMovie}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {recommendations.map((rec, index) => (
              <ListGroup.Item key={rec + index}>{rec}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>    

    </Container>
  );
}

export default Movies;