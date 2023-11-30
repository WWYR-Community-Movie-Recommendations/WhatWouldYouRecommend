import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import CommunityList from "./CommunityList";
import 'bootstrap/dist/css/bootstrap.min.css';

const SERVER = import.meta.env.VITE_SERVER;

function App() {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Replaces ComponentDidMount() - since using functional components
  // The empty array ensures this effect runs only once after initial render
  useEffect(() => {
    getMovies();
  }, []); 

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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route 
          path="/home" 
          element={
            <HomePage 
              movies={movies} 
              error={error} 
              showModal={showModal} 
              handleShowModal={handleShowModal} 
              handleCloseModal={handleCloseModal} 
              postMovie={postMovie} 
              postError={postError}
              postSuccess={postSuccess}
            />
          } 
        />

        <Route 
          path="/about-us" 
          element={
            <AboutUs 
              showModal={showModal} 
              handleShowModal={handleShowModal} 
              handleCloseModal={handleCloseModal} 
              postMovie={postMovie} 
              postError={postError}
              postSuccess={postSuccess}
            />
          } 
        />

        <Route 
          path="/community-list" 
          element={
            <CommunityList 
              movies={movies} 
              error={error} 
              showModal={showModal} 
              handleShowModal={handleShowModal} 
              handleCloseModal={handleCloseModal} 
              postMovie={postMovie} 
              postError={postError}
              postSuccess={postSuccess}
            />
          } 
        />
  
      </Routes>
    </Router>
  );   
}


export default App;