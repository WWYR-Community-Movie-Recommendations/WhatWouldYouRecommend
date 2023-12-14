//Movies.jsx
import { Carousel, Card, Container } from 'react-bootstrap';
import styles from '../css/HomePage.module.css';
import AIButton from './AIButton';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function Movies({ movies, error, getToken }) {
  // User info
  const { user } = useAuth0();
  const currentUserID = user.sub

  // Added loading state to manage the fetching status of movies
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to update loading state based on movies or error updates
  useEffect(() => {
    if (movies || error) {
      setIsLoading(false);
    }
  }, [movies, error]);

  // Filter movies not shared by current user (that way only movies from other users display)
  let filteredMovies = movies.filter(movie => movie.userID !== currentUserID)

  // Shuffle array
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Shuffle only if more than 3 movies
  if (filteredMovies.length > 3) {
    shuffleArray(filteredMovies);
  }

  // Slice to get 3 movies (random if shuffled, first 3 if not)
  const selectedMovies = filteredMovies.slice(0, 3);

  return (
    <Container>
      <Carousel className={styles.homePageCarousel} variant='dark'>
        {isLoading ? (
          // Display loading message while fetching movies
          <h3 className={styles.homepageErrorMsg}>Fetching movies...</h3>
        ) : error ? (
          // Display error message if there is error in fetching movies
          <h3 className={styles.homepageErrorMsg}>Error loading movies. Reason: {error}</h3>
        ) : selectedMovies.length > 0 ? (
          // Display movies if available
          selectedMovies.map((movie) => (
            <Carousel.Item key={movie._id} className={styles.homePageCarouselItem}>
              <Card style={{ width: '45vw' }} className={styles.homePageVideoCard}>
                <Card.Body>
                  <MovieCard 
                    movie={movie}
                  />
                  <AIButton 
                    movieName={movie.movieName} 
                    getToken={getToken} 
                  />
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))
        ) : (
          // Display message if not loading, no error, and no movies found
          <h3 className={styles.homepageErrorMsg}>No Movies Found, Share a movie!</h3>
        )}     
      </Carousel>
    </Container>
  );
}

export default Movies;