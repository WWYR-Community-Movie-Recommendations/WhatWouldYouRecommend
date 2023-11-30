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

  // ** States **

  // Share Movie Modal and Handles
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Update Movie Modal and Handles
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  // Variable States
  const [movies, setMovies] = useState([]);  // Hold movies from GET request
  const [movieToUpdate, setMovieToUpdate] = useState({}); // Empty object to hold data of movie to be updated
  const [updatedMovieId, setUpdatedMovieId] = useState(null); // Track which movie updated
  const [deletingMovieId, setDeletingMovieId] = useState(null); // Track which movie being deleted
  
  // GET, POST, UPDATE, DELETE - success and error messages states
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [deleteError, setDeleteError] = useState(null); 
  const [deleteSuccess, setDeleteSuccess] = useState(null); 
  

  // ** Functions **

  // ComponenetDidMount() - replaced with useEffect
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
  
  // POST new movie to database
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

  // UPDATE movie in database
  const updateMovie = (movieToUpdate) => {

    const url = `${SERVER}/movies/${movieToUpdate._id}`;

    // this.getToken()
    // .then(jwt => {
    //   // Assign jwt (contains token) to headers
    //   const config = {
    //     headers: { 'Authorization': `Bearer ${jwt}` }
    //   };

    //   // Perform PUT request with axios
    //   return axios.put(url, bookToUpdate, config);
    // })
    
    axios.put(url, movieToUpdate)
    .then(() => {
      // Update state with updated movie
      const updatedMovies = movies.map(oldMovie => 
        oldMovie._id === movieToUpdate._id ? movieToUpdate : oldMovie
      );
      setMovies(updatedMovies);
      setUpdateError(null);
      setUpdateSuccess('Movie has been successfully updated!');
      setUpdatedMovieId(movieToUpdate._id);
    })
    .catch(error => {
      // Handle any errors from either getToken or axios.put
      console.error("Error updating the movie:", error);
      setUpdateError('Failed to update the movie, Please try again.');
      setUpdateSuccess(null);
    });
  }

  // DELETE movie in database
  const deleteMovie = (id) => {
    setDeletingMovieId(id); // Indicate which movie being deleted
    const url = `${SERVER}/movies/${id}`;

    // this.getToken()
    // .then(jwt => {
    //   // Assign jwt (contains token) to headers
    //   const config = {
    //     headers: { 'Authorization': `Bearer ${jwt}` }
    //   };

    //   // Perform DELETE request with axios
    //   return axios.delete(url, config);
    // })

    axios.delete(url)
      .then(() => {
        // Update state to remove the deleted movie
        const updatedMovies = movies.filter(movie => movie._id !== id);
        setMovies(updatedMovies);
        setDeleteError(null);
        setDeleteSuccess('Movie has been removed successfully!');
        deletingMovieId(id)
      })
      .catch(error => {
        // Handle any errors from either getToken or axios.delete
        console.error("Error deleting the movie:", error);
        setDeleteError('Failed to delete the movie, Please try again.');
        setDeleteSuccess(null);
      });
  }

  // Handle update button clicks
  const handleUpdateClick = (movie) => {
    handleShowUpdateModal(); // First action, update state of modal to 'show'
    setMovieToUpdate(movie); // Second action, set state of movie to update with data from existing movie
  };

  // Reset update success message when dismisses
  const resetUpdateSuccess = () => {
    setUpdateSuccess(null);
  };


  // ** Return() **

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

              postMovie={postMovie} 
              postError={postError}
              postSuccess={postSuccess}
              showModal={showModal} 
              handleShowModal={handleShowModal} 
              handleCloseModal={handleCloseModal} 

              updateMovie={updateMovie}
              movieToUpdate={movieToUpdate}
              updatedMovieId={updatedMovieId}
              updateError={updateError}
              updateSuccess={updateSuccess}
              showUpdateModal={showUpdateModal}
              handleShowUpdateModal={handleShowUpdateModal}
              handleCloseUpdateModal={handleCloseUpdateModal}
              handleUpdateClick={handleUpdateClick}
              resetUpdateSuccess={resetUpdateSuccess}

              deleteMovie={deleteMovie}
              deletingMovieId={deletingMovieId}
              deleteError={deleteError}
              deleteSuccess={deleteSuccess}
            />
          } 
        />
  
      </Routes>
    </Router>
  );   
}


export default App;