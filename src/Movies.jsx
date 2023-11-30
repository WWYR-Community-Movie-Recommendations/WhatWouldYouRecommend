import { Carousel, Card, Container } from 'react-bootstrap';
import styles from './HomePage.module.css';

function Movies({ movies, error }) {

  return (
    <Container>
      {error && <p className="error-message">Error: {error}</p>}
  
      <Carousel className={styles.homePageCarousel} variant='dark'>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Carousel.Item key={movie.id} className={styles.homePageCarouselItem}>
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
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))
        ) : (
          error ? <h3>Error loading books.</h3> : <h3>No Books Found, Share a movie!</h3> // You can render something else when there are no movies
        )}
      </Carousel>
    </Container>
  );
}

export default Movies;