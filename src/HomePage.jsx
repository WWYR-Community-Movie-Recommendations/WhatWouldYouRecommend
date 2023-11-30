import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import Movies from './Movies'
import AddMovieFormModal from './AddMovieFormModal';

const SERVER = import.meta.env.VITE_SERVER;

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Replaces ComponentDidMount() - since using functional components
  useEffect(() => {
    getMovies();
  }, []); // The empty array ensures this effect runs only once after initial render

  // GET request API to fetch all movies from  database 
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

  // Post new movie to database
  const postMovie = async (newMovie) => {
    const url = `${SERVER}/movies`;
    console.log(url);

    // this.getToken()
    //   .then(jwt => {
    //     // Assign jwt (contains token) to headers
    //     const config = {
    //       headers: { 'Authorization': `Bearer ${jwt}` }
    //     };

    //     // Perform the POST request with axios
    //     return axios.post(url, newBook, config);
    //   })
      console.log(newMovie);

      axios.post(url, newMovie)
      .then(response => {
        // Handle successful response
        setMovies(currentMovies => [...currentMovies, response.data]);
        setPostError(null);
        setPostSuccess('Movie has been addedd successfully');
      })
      .catch(error => {
        // Handle any errors from either getToken or axios.post
        console.error("Error posting the movie:", error);
        setPostError('Failed to add movie. Please try again.');
        setPostSuccess(null);
      });
  }

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
        
        <Movies 
          movies={movies}
          error={error}
        />
        
      </Container>

      <AddMovieFormModal 
        showModal={showModal} 
        handleCloseModal={handleCloseModal} 
        postMovie={postMovie} 
        postError={postError}
        postSuccess={postSuccess}
      />

    </Container>
  );
}

export default HomePage;


