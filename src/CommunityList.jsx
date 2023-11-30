import { Container } from 'react-bootstrap';
import CustomNavbar from './CustomNavBar';
import styles from './HomePage.module.css';
import HomePageHeader from './HomePageHeader';
import AddMovieFormModal from './AddMovieFormModal';
import CommunityMovies from './CommunityMovies';

function CommunityList({ movies, movieToUpdate, error, showModal, handleShowModal, handleCloseModal, postMovie, postError, postSuccess, updateMovie, updateError, updateSuccess, showUpdateModal, handleShowUpdateModal, handleCloseUpdateModal, handleUpdateClick, updatedMovieId, resetUpdateSuccess, deleteMovie, deletingMovieId, deleteError, deleteSuccess }) {

  return (
    <Container fluid className={styles.homePageGridContainer}>

      <CustomNavbar onShowModal={handleShowModal} />
      
      <Container>
      
        <HomePageHeader page='community' updateSuccess={{updateSuccess}}/>  

        <CommunityMovies
          movies={movies}
          error={error}
          movieToUpdate={movieToUpdate}
          handleUpdateClick={handleUpdateClick}
          updateMovie={updateMovie}
          updateError={updateError}
          updateSuccess={updateSuccess}
          showUpdateModal={showUpdateModal}
          handleShowUpdateModal={handleShowUpdateModal}
          handleCloseUpdateModal={handleCloseUpdateModal}
          updatedMovieId={updatedMovieId}
          resetUpdateSuccess={resetUpdateSuccess}
          
          deleteMovie={deleteMovie}
          deletingMovieId={deletingMovieId}
          deleteError={deleteError}
          deleteSuccess={deleteSuccess}
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