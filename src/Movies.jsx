import { Carousel, Card, Container } from 'react-bootstrap';
import styles from './HomePage.module.css';
import AIButton from './AIButton';
import { useAuth0 } from "@auth0/auth0-react";

function Movies({ movies, error, getToken }) {
  const { user } = useAuth0();

  // Filter movies not shared by current user (that way only movies from other users display)
  let filteredMovies = movies.filter(movie => movie.email !== user.email)

  // Shuffle array
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Shuffle only if more than 4 movies
  if (filteredMovies.length > 4) {
    shuffleArray(filteredMovies);
  }

  // Slice to get 3 movies (random if shuffled, first 3 if not)
  const selectedMovies = filteredMovies.slice(0, 3);

  return (
    <Container>
      {error && <p className="error-message">Error: {error}</p>}
  
      <Carousel className={styles.homePageCarousel} variant='dark'>
        {selectedMovies.length > 0 ? (
          selectedMovies.map((movie) => (
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

                  <AIButton 
                    movieName={movie.movieName} 
                    getToken={getToken} 
                  />

                </Card.Body>
              </Card>

            </Carousel.Item>
          ))
        ) : (
          error ? <h3>Error loading movies.</h3> : <h3>No Movies Found, Share a movie!</h3> // You can render something else when there are no movies
        )}
      </Carousel>

    </Container>
  );
}

export default Movies;