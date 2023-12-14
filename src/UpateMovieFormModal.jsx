// UpdateMovieFormModal.jsx
import { Modal, Button, Form, Container } from 'react-bootstrap';
import styles from '../css/HomePage.module.css';


function UpdateMovieFormModal({ showUpdateModal, handleCloseUpdateModal, updateMovie, movieToUpdate }) {

  // Handle share movie button
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const updatedMovie = {
      movieName: form.movieName.value || movieToUpdate.movieName,
      userComment: form.userComment.value || movieToUpdate.userComment,
      videoLink: form.videoLink.value || movieToUpdate.videoLink,
      genre: form.genre.value || movieToUpdate.genre,
      _id: movieToUpdate._id
    }
    updateMovie(updatedMovie);
    handleCloseUpdateModal(); 
  }


  return (
    <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>

        <Modal.Header closeButton>
          <Modal.Title>Update Movie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>

            <Form onSubmit={submitHandler}>

              <Form.Group controlId="movieName">
                <Form.Label></Form.Label>
                <Form.Control 
                  placeholder={movieToUpdate.movieName}
                  name="movieName" 
                  type="text"
                />
              </Form.Group>

              <Form.Group controlId="userComment">
                <Form.Label></Form.Label>
                <Form.Control 
                  placeholder={movieToUpdate.userComment} 
                  name="userComment" 
                  type="text"
                />
              </Form.Group>

              <Form.Group controlId="videoLink">
                <Form.Label></Form.Label>
                <Form.Control 
                  placeholder={movieToUpdate.videoLink} 
                  name="videoLink" 
                  type="text"
                />
              </Form.Group>

              <Form.Group controlId="genre">
                <Form.Label></Form.Label>
                <Form.Control as="select" name="genre" defaultValue={movieToUpdate.genre}>
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
                Update Movie!
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
  );
}

export default UpdateMovieFormModal;