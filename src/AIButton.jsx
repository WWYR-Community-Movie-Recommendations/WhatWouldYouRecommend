// AIButton.jsx
import { useState } from 'react';
import { Button, Modal, ListGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import styles from '../css/HomePage.module.css';

const SERVER = import.meta.env.VITE_SERVER;

function AIButton({ movieName, getToken }) {
  // States
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [currentMovie, setCurrentMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ** Functions **

  // Function - Handle click of AI Button
  const handleRecommendationsClick = async () => {
    setIsLoading(true); // Start loading
    setShowModal(true);

    // Format to include '_' insstead of spacess, ensure server url call appropriately without spaces
    const formattedTitle = movieName.replace(/\s/g, "_");
    const url = `${SERVER}/gpt-movies?nameOfMovie=${formattedTitle}`;

    // Send jwt for user verification on backend
    try {
      const jwt = await getToken();
      if (!jwt) {
        throw new Error('Failed to retrieve JWT');
      }
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      // Wait for response from backend
      const response = await axios.get(url, config);

      // Get data recommendation from AI call in response.data.data
      setIsLoading(false);
      setRecommendations(response.data.data);
      setCurrentMovie(movieName);
      
    } catch (error) {
      // Error 
      console.error('Error making API call to AI', error);
    }
  };

  return (
    <>
      <Button onClick={handleRecommendationsClick} variant='custom' className={styles.AIButton}>
        New! AI Recommendations!
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header closeButton className={styles.AIRecommendationModal}>
          <Modal.Title >
          {isLoading ? "Loading..." : <>Here are five movies like <em>{currentMovie}</em>!</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.AIListItemBody}>
          {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Retrieving movies like <em>{movieName}</em>...</p>
              </div>
            ) : (
              <ListGroup>
                {recommendations.map((rec, index) => (
                  <ListGroup.Item className={styles.AIListItem} key={rec + index}>{rec}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AIButton;
