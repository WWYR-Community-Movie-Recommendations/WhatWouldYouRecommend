import { Accordion, Card, Container, Button } from 'react-bootstrap';
import styles from './HomePage.module.css';

function CommunityMovies({ movies, error }) {

  return (
    <Container>
      {error && <p className="error-message">Error: {error}</p>}
  
      {movies.length > 0 ? (
        <Accordion defaultActiveKey="0" flush className={styles.movieAccordion}>
          {movies.map((movie, index) => (
            <Accordion.Item eventKey={index.toString()} key={movie.id}>
              <Accordion.Header className={styles.movieAccordionHeader}>{movie.movieName} - Recommended By: {movie.userName}</Accordion.Header>
              <Accordion.Body>
                <Card style={{ width: '45vw' }} className={styles.movieCard}>
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
                    <Card.Text>Recommended By: {movie.userName}</Card.Text>

                    <Button 
                      className='update-button' 
                      variant="secondary" 
                      // onClick={() => this.handleUpdateClick(book)}
                    >
                     Update Book
                    </Button>
                  
                    <Button 
                      className='delete-button' 
                      variant="danger" 
                      // onClick={() => this.deleteBook(movie._id)}
                    >
                      Delete Movie
                      {/* {this.state.deletingBookId === book._id ? <Spinner as="span" animation="border" size="sm" /> : 'Delete Book'} */}
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

    </Container>
  );
}

export default CommunityMovies;