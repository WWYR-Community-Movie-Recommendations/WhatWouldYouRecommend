import axios from 'axios';
import { useState, useEffect } from 'react';
import { Carousel, Card, Container } from 'react-bootstrap';
import styles from './HomePage.module.css';
const SERVER = import.meta.env.VITE_SERVER;


function Movies() {

  // Set states
  const [movies, setMovies] = useState([]); // Holds movies
  const [error, setError] = useState(null); // Holds error for fetching movies

  // Replaces ComponentDidMount() - since using functional components
  useEffect(() => {
    getMovies();
  }, []); // The empty array ensures this effect runs only once after initial render


  // Make a GET request to your API to fetch all the books from the database 
  const getMovies = () => {

    // this.getToken(); ---> invoke function to test if able to retrieve user data along with token
    
    // Assign token to jwt via getToken function
    // this.getToken()
    // .then(jwt => {
    //   // Assign jwt (contains token) to headers
    //   const config = {
    //     headers: { 'Authorization': `Bearer ${jwt}` }
    //   };

    //   console.log(config);
    //   // Pass book request along with config, allows backend to validate user auth prior to sending books data back
    //   return axios.get(`${SERVER}/books`, config);
    // })
    axios.get(`${SERVER}/movies`)
    .then(res => setMovies(res.data))
    .catch(error => {
      // Handle errors from either getToken or axios.get
      console.error("Error in getMovies:", error);
      setError(error.message);
    });
  }

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
            error ? <h3>Error loading books.</h3> : <h3>No Books Found</h3> // You can render something else when there are no movies
          )}
        </Carousel>
      </Container>
    );
}

export default Movies;