// AIButton.jsx
import { useState } from 'react';
// Added here
import { Button, Modal, ListGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER;

function AIButton({ movieName, getToken }) {
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [currentMovie, setCurrentMovie] = useState('');
  // Added here
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommendationsClick = async () => {
    setIsLoading(true); // Start loading
    setShowModal(true);
    const formattedTitle = movieName.replace(/\s/g, "_");
    const url = `${SERVER}/gpt-movies?nameOfMovie=${formattedTitle}`;
    try {
      const jwt = await getToken();
      if (!jwt) {
        throw new Error('Failed to retrieve JWT');
      }
  
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      const response = await axios.get(url, config);
      // Added
      setIsLoading(false);
      setRecommendations(response.data.data);
      setCurrentMovie(movieName);
      
    } catch (error) {
      console.error('Error making API call to AI', error);
    }
  };

  return (
    <>
      <Button onClick={handleRecommendationsClick}>
        New! AI Recommendations for Movies Like This!
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isLoading ? "Loading..." : `Here are five movies like ${currentMovie}!`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Retrieving movies like {currentMovie}...</p>
              </div>
            ) : (
              <ListGroup>
                {recommendations.map((rec, index) => (
                  <ListGroup.Item key={rec + index}>{rec}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AIButton;
