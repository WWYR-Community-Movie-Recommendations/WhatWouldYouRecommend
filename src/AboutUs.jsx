import { Container} from 'react-bootstrap';
import CustomNavbar from './CustomNavBar';
import styles from '../css/HomePage.module.css';
import Header from './Header';
import AddMovieFormModal from './AddMovieFormModal';
import AboutUsCard from './AboutUsCard';

function AboutUs({ showModal, handleCloseModal, handleShowModal, postMovie, postError,postSuccess }) {
  return (
    <Container fluid className={styles.homePageGridContainer}>

      <CustomNavbar onShowModal={handleShowModal} />

      <Container className={styles.HomePageRightContainer}>

        <Header page='about'/>  
        <AboutUsCard />
        
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