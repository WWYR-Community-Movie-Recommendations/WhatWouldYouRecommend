import { Container } from 'react-bootstrap';
import CustomNavbar from './CustomNavBar';
import styles from './HomePage.module.css';
import HomePageHeader from './HomePageHeader';
import AddMovieFormModal from './AddMovieFormModal';

function AboutUs({ showModal, handleCloseModal, handleShowModal, postMovie, postError,postSuccess }) {
  return (
    <Container fluid className={styles.homePageGridContainer}>

      <CustomNavbar onShowModal={handleShowModal} />

      <Container>
        <HomePageHeader page='about'/>  
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

export default AboutUs;