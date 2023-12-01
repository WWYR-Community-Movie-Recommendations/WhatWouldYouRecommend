import { Container } from 'react-bootstrap';
import styles from './HomePage.module.css';
import Movies from './Movies';
import CustomNavbar from './CustomNavBar';
import HomePageHeader from './HomePageHeader';
import AddMovieFormModal from './AddMovieFormModal';


function HomePage({ movies, error, showModal, handleShowModal, handleCloseModal, postMovie, postError, postSuccess, getToken }) {
  return (
    <Container fluid className={styles.homePageGridContainer}>

      <CustomNavbar onShowModal={handleShowModal} />

      <Container>
        <HomePageHeader page='home' />  

        <Movies 
          movies={movies}
          error={error}
          getToken={getToken}
        />
      </Container>

      <AddMovieFormModal 
        showModal={showModal} 
        handleCloseModal={handleCloseModal} 
        postMovie={postMovie} 
        postError={postError}
        postSuccess={postSuccess}
      />

    </Container>
  );
}

export default HomePage;


