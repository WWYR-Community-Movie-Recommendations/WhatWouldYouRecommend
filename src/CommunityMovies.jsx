import { Accordion, Card, Container, Button, Alert, Spinner } from 'react-bootstrap';
import styles from './HomePage.module.css';
import UpdateMovieFormModal from './UpateMovieFormModal';

function CommunityMovies({ movies, error, handleUpdateClick, updateMovie, movieToUpdate, updateError, updateSuccess, showUpdateModal, handleCloseUpdateModal, updatedMovieId, resetUpdateSuccess, deleteMovie, deletingMovieId, deleteSuccess }) {

  return (
    <Container>
      {error && <p className="error-message">Error: {error}</p>}

      {movies.length > 0 ? (
        <Accordion defaultActiveKey="0" flush className={styles.movieAccordion}>
          {movies.map((movie, index) => (

            <Accordion.Item eventKey={index.toString()} key={movie._id}>
              <Accordion.Header className={styles.movieAccordionHeader}>{movie.movieName} - Recommended By: {movie.userName}</Accordion.Header>
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
                    <Card.Text>{movie.userComment}</Card.Text>
                    <Card.Text>{movie.genre}</Card.Text>
                    <Card.Text>Recommended By: {movie.userName}</Card.Text>
                    <Card.Text>Movie Id: {movie._id}</Card.Text>

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