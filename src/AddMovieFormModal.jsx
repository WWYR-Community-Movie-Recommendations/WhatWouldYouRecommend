import { Modal, Button, Form, Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import styles from './HomePage.module.css';


function AddMovieFormModal({ showModal, handleCloseModal, postMovie }) {

  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  // Check if movie trailer is a valid YouTube link
  const isValidYouTubeURL = (url) => {

    // Regular expression to match the YouTube URL pattern
    const youtubeURLRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    // Test the URL against the regex pattern
    return youtubeURLRegex.test(url);

  };

  // Convert url into embeddable format by extracting videoID from Youtube URL
  const convertToEmbedURL = (youtubeURL) => {

    // search for characters after 'v=' and ignore once reaches '&'
    let regex = /[?&]v=([^&]+)/;
    let match = youtubeURL.match(regex);

    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    } else {
      // Handle invalid or unsupported URLs
      console.error('Invalid YouTube URL:', youtubeURL);
      return null;
    }
  };

  // Handle share book button
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Extract form data
    const newMovie = {
      movieName: form.movieName.value,
      userComment: form.userComment.value,
      videoLink: form.videoLink.value,
      genre: form.genre.value,
    };

    // Validation checks
    if (!newMovie.movieName || !newMovie.userComment || !newMovie.videoLink || !newMovie.genre) {
      setAlertContent('Please fill in all fields.');
      setShowAlert(true);
      return;
    }

    if (!isValidYouTubeURL(newMovie.videoLink)) {
      setAlertContent('Please enter a valid YouTube link.');
      setShowAlert(true);
      return;
    }

    const embedURL = convertToEmbedURL(newMovie.videoLink);
    if (!embedURL) {
      setAlertContent('Failed to convert YouTube URL to an embeddable format.');
      setShowAlert(true);
      return;
    }

    newMovie.videoLink = embedURL;
    
    // Post movie
    console.log(newMovie);
    postMovie(newMovie);
    handleCloseModal(); 
    setShowAlert(false);
  }


  return (
    <Modal show={showModal} onHide={handleCloseModal}>

        <Modal.Header closeButton>
          <Modal.Title>Share Your Movie Recommendation!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                {alertContent}
              </Alert>
            )}
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
