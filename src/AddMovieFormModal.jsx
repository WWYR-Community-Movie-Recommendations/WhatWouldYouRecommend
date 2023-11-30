import { Modal, Button, Form, Container } from 'react-bootstrap';
import styles from './HomePage.module.css';


function AddMovieFormModal({ showModal, handleCloseModal, postMovie }) {

  // Handle share book button
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newMovie = {
      movieName: form.movieName.value,
      userComment: form.userComment.value,
      videoLink: form.videoLink.value,
      genre: form.genre.value,
    }

    console.log(newMovie);
    postMovie(newMovie);
    handleCloseModal(); 
  }


  return (
    <Modal show={showModal} onHide={handleCloseModal}>

        <Modal.Header closeButton>
          <Modal.Title>Share Your Movie Recommendation!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="movieName">
                <Form.Label></Form.Label>
                <Form.Control placeholder="Enter Name of Movie" name="movieName" type="text"/>
              </Form.Group>

              <Form.Group controlId="userComment">
                <Form.Label></Form.Label>
                <Form.Control placeholder="Enter Movie Comment" name="userComment" type="text"/>
              </Form.Group>

              <Form.Group controlId="videoLink">
                <Form.Label></Form.Label>
                <Form.Control placeholder="Enter Movie Trailer URL" name="videoLink" type="text"/>
              </Form.Group>

              <Form.Group controlId="genre">
                <Form.Label></Form.Label>
                <Form.Control as="select" name="genre" defaultValue="">
                  <option value="" disabled>Choose genre...</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animation</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Family">Family</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Suspense">Suspense</option>
                </Form.Control>
              </Form.Group>
              
              <Button 
                className={styles.shareRecommendationButton} 
                variant="primary" 
                type="submit"
              >
                Share Movie!
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
  );
}

export default AddMovieFormModal;
