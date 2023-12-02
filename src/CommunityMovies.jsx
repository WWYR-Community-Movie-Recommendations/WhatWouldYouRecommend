//CommunityMovies.jsx
import { Accordion, Card, Container, Button, Alert, Spinner, Dropdown } from 'react-bootstrap';
import { useState, useMemo } from 'react';
import styles from './HomePage.module.css';
import UpdateMovieFormModal from './UpateMovieFormModal';
import { useAuth0 } from "@auth0/auth0-react";

function CommunityMovies({ movies, error, handleUpdateClick, updateMovie, movieToUpdate, updateError, updateSuccess, showUpdateModal, handleCloseUpdateModal, updatedMovieId, resetUpdateSuccess, deleteMovie, deletingMovieId, deleteSuccess }) {

  const [sortCriteria, setSortCriteria] = useState('username');

  const { user } = useAuth0();

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedMovies = useMemo(() => {
    let filteredMovies = movies;

    if (sortCriteria === 'recommendedByMe') {
      filteredMovies = movies.filter(movie => movie.email === user.email);
    } else if (sortCriteria !== 'recommendedByMe' ) {
      filteredMovies = movies.filter(movie => movie.email !== user.email);
    }

    return filteredMovies.sort((a, b) => {
      let aValue, bValue;
      switch (sortCriteria) {
        case 'username':
          aValue = a.userName || '';
          bValue = b.userName || '';
          return aValue.localeCompare(bValue);
        case 'movieName':
          aValue = a.movieName || '';
          bValue = b.movieName || '';
          return aValue.localeCompare(bValue);
        case 'genre':
          aValue = a.genre || '';
          bValue = b.genre || '';
          return aValue.localeCompare(bValue);
        case 'recommendedByMe':
          // Assuming sharedByMe is a boolean
          aValue = a.sharedByMe ? 1 : 0;
          bValue = b.sharedByMe ? 1 : 0;
          return aValue - bValue;
        default:
          return 0;
      }
    });
  }, [movies, sortCriteria, user.email]);
  

  return (
    <Container>
       <div className={styles.sortDropdownContainer}>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-sort">
            Sort By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSort('username')}>
              Username
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('movieName')}>
              Movie Title
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('genre')}>
              Genre
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('recommendedByMe')}>
              Shared By Me
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {error && <p className="error-message">Error: {error}</p>}

      {movies.length > 0 ? (
        <Accordion  className={styles.movieAccordion}>
          {sortedMovies.map((movie, index) => (

            <Accordion.Item eventKey={index.toString()} key={movie._id}>

              <Accordion.Header className={styles.movieAccordionHeader}>
                {movie.movieName} - Genre: {movie.genre} - Recommended By: {movie.userName} - userEmail: {movie.email}
              </Accordion.Header>

              <Accordion.Body>

                <Card style={{ width: '45vw' }} className={styles.movieCard}>

                  {updateSuccess && movie._id === updatedMovieId && 
                    <Alert variant="success" onClose={resetUpdateSuccess} dismissible>
                      <p>{updateSuccess}</p>
                    </Alert>
                  } 

                  {deleteSuccess && movie._id === deletingMovieId && 
                    <Alert variant="danger"  dismissible>
                      <p>{deleteSuccess}</p>
                    </Alert>
                  }

                  <Card.Body>

                    <iframe
                      className={styles.movieVideoContainer}
                      width="100%"
                      height="315"
                      src={movie.videoLink}
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen>
                    </iframe>

                    <Card.Title>{movie.movieName}</Card.Title>
                    <Card.Text>Comment: {movie.userComment}</Card.Text>
                    <Card.Text>Genre: {movie.genre}</Card.Text>
                    <Card.Text>Recommended By: {movie.userName}</Card.Text>
                    <Card.Text>Movie Id: {movie._id}</Card.Text>

                    {movie.email === user.email && (
                      <>
                        <Button 
                          className='update-button' 
                          variant="secondary" 
                          onClick={() => handleUpdateClick(movie)}
                        >
                          Update Movie
                        </Button>
                      
                        <Button 
                          className='delete-button' 
                          variant="danger" 
                          onClick={() => deleteMovie(movie._id)}
                        >
                          {deletingMovieId=== movie._id ? <Spinner as="span" animation="border" size="sm" /> : 'Delete Movie'}
                        </Button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        error ? <h3>Error loading movies.</h3> : <h3>No movies found. Share a movie!</h3>
      )}

      <UpdateMovieFormModal 
        movieToUpdate={movieToUpdate}
        updateMovie={updateMovie}
        updateError={updateError}
        updateSuccess={updateSuccess}
        showUpdateModal={showUpdateModal}
        handleCloseUpdateModal={handleCloseUpdateModal}
      />


    </Container>
  );
}

export default CommunityMovies;