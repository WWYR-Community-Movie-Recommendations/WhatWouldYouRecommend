//App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import CommunityList from "./CommunityList";
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';


const SERVER = import.meta.env.VITE_SERVER;


function App() {
  // Destructured from useAuth0
  const { isAuthenticated, getIdTokenClaims, isLoading } = useAuth0();


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

  // Trigger re-fetch of data when a movie is updated
  const [updateTrigger, setUpdateTrigger] = useState(0); // Add a trigger for updates
  

  // ** Functions **

  // useEffect to call getMovies
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Only call getMovies if authentication is completed and user is authenticated
      getMovies();
    } else {
      console.log("Waiting for authentication...");
    }
  }, [isAuthenticated, isLoading, updateTrigger]); // Invoked if these dependencies change

  // Retrieve user token to authenticate on back end
  const getToken = async () => {
    try {
      const tokenClaims = await getIdTokenClaims();
      return tokenClaims.__raw;
    } catch (error) {
      console.error("Error retrieving token:", error);
      setError(error.message);
    }
  };

  // GET movies from database
  const getMovies = async () => {
    try {
      const jwt = await getToken();
      if (!jwt) {
        throw new Error("Failed to retrieve JWT");
      }

      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      };

      const response = await axios.get(`${SERVER}/movies`, config);
      setMovies(response.data);
    } catch (error) {
      console.error("Error in getMovies:", error);
      setError(error.message);
    }
  };
  
  // POST new movie to database
  const postMovie = async (newMovie) => {
    const url = `${SERVER}/movies`;

    try {
      const jwt = await getToken();
      if (!jwt) {
        throw new Error("Failed to retrieve JWT");
      }

      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      };

      const response = await axios.post(url, newMovie, config);
      setMovies(currentMovies => [...currentMovies, response.data]);
      setPostError(null);
      setPostSuccess('Movie has been addedd successfully');

    } catch (error) {
        console.error("Error posting the movie:", error);
        setPostError('Failed to add movie. Please try again.');
        setPostSuccess(null);
    }
  };

  // UPDATE movie in database
  const updateMovie = async (movieToUpdate) => {
    const url = `${SERVER}/movies/${movieToUpdate._id}`;
  
    try {
      const jwt = await getToken();
      if (!jwt) {
        throw new Error('Failed to retrieve JWT');
      }
  
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
  
      await axios.put(url, movieToUpdate, config);
  
      // Update state with updated movie
      const updatedMovies = movies.map((oldMovie) =>
        oldMovie._id === movieToUpdate._id ? movieToUpdate : oldMovie
      );
      setMovies(updatedMovies);
      setUpdateError(null);
      setUpdateSuccess('Movie has been successfully updated!');
      setUpdatedMovieId(movieToUpdate._id);
      // Trigger to refetch movies
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error updating the movie:', error);
      setUpdateError('Failed to update the movie, Please try again.');
      setUpdateSuccess(null);
    }
  };
  

  // DELETE movie in database
  const deleteMovie = async (id) => {
    setDeletingMovieId(id); // Indicate which movie being deleted
    const url = `${SERVER}/movies/${id}`;
  
    try {
      const jwt = await getToken();
      if (!jwt) {
        throw new Error('Failed to retrieve JWT');
      }
  
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
  
      await axios.delete(url, config);
  
      // Update state to remove the deleted movie
      const updatedMovies = movies.filter(movie => movie._id !== id);
      setMovies(updatedMovies);
      setDeleteError(null);
      setDeleteSuccess('Movie has been removed successfully!');
      deletingMovieId(id);
    } catch (error) {
      console.error('Error deleting the movie:', error);
      setDeleteError('Failed to delete the movie, Please try again.');
      setDeleteSuccess(null);
    }
  };

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

        {/* <Route 
          path="/home" 
          element={<div>Hello World</div>}
        /> */}

        <Route 
          path="/home" 
          element={
            isAuthenticated ? (
              <HomePage 
                movies={movies} 
                error={error} 
                showModal={showModal} 
                handleShowModal={handleShowModal} 
                handleCloseModal={handleCloseModal} 
                postMovie={postMovie} 
                postError={postError}
                postSuccess={postSuccess}
                getToken={getToken}
              />
            ) : (
              <LandingPage />
            )
          } 
        />

        <Route 
          path="/about-us" 
          element={
            isAuthenticated ? (
              <AboutUs 
                showModal={showModal} 
                handleShowModal={handleShowModal} 
                handleCloseModal={handleCloseModal} 
                postMovie={postMovie} 
                postError={postError}
                postSuccess={postSuccess}
              />
            ) : (
              <LandingPage />
            )
          } 
        />

        <Route 
          path="/community-list" 
          element={ 
            isAuthenticated ? (
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
            ) : (
              <LandingPage />
            ) 
          } 
        />

        <Route
          path={'/profile'}
          element={
            isAuthenticated ? (
              <Profile 
              showModal={showModal} 
              handleShowModal={handleShowModal} 
              handleCloseModal={handleCloseModal} 
              postMovie={postMovie} 
              postError={postError}
              postSuccess={postSuccess}
            />
            ) : (
              <LandingPage />
            )
          }
        />

      </Routes>
    </Router>
  );   
}


export default withAuth0(App);