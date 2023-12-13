import { Card } from 'react-bootstrap';
import styles from '../css/HomePage.module.css';

const MovieCard = ({ movie }) => {
  return (
    <>
      <iframe
        className={styles.homePageVideoContainer}
        width="560"
        height="315"
        src={movie.videoLink} 
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen>
      </iframe>
      <Card.Title>{movie.movieName}</Card.Title>
      <Card.Text>&quot;<em>{movie.userComment}</em>&quot;</Card.Text>
      <Card.Text>Genre: {movie.genre}</Card.Text>
      <Card.Text>Recommended By: {movie.userName}</Card.Text>
    </>
  );
};

export default MovieCard;