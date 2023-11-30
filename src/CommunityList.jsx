import { Container } from 'react-bootstrap';
import CustomNavbar from './CustomNavBar';
import styles from './HomePage.module.css';
import HomePageHeader from './HomePageHeader';
import AddMovieFormModal from './AddMovieFormModal';
import CommunityMovies from './CommunityMovies';

function CommunityList({ movies, error, showModal, handleShowModal, handleCloseModal, postMovie, postError, postSuccess }) {
  return (
    <Container fluid className={styles.homePageGridContainer}>

      <CustomNavbar onShowModal={handleShowModal} />

      <Container>
        <HomePageHeader page='community'/>  

        <CommunityMovies
          movies={movies}
          error={error}
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

export default CommunityList;