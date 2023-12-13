// CommunityList.jsx
import { Container } from 'react-bootstrap';
import CustomNavbar from './CustomNavBar';
import styles from '../css/HomePage.module.css';
import Header from './Header';
import AddMovieFormModal from './AddMovieFormModal';
import CommunityMovies from './CommunityMovies';

function CommunityList({ movies, movieToUpdate, error, showModal, handleShowModal, handleCloseModal, postMovie, postError, postSuccess, updateMovie, updateError, updateSuccess, showUpdateModal, handleShowUpdateModal, handleCloseUpdateModal, handleUpdateClick, updatedMovieId, resetUpdateSuccess, deleteMovie, deletingMovieId, deleteError, deleteSuccess, user }) {

  return (
    <Container fluid className={styles.homePageGridContainer}>

      <CustomNavbar onShowModal={handleShowModal} />
      
      <Container className={styles.HomePageRightContainer}>
      
        <Header page='community' updateSuccess={{updateSuccess}}/>  

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
          user={user}
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