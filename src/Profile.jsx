import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomNavbar from './CustomNavBar';
import styles from './HomePage.module.css';
import Header from './Header';
import AddMovieFormModal from './AddMovieFormModal';

const Profile = ({ showModal, handleShowModal, handleCloseModal, postMovie, postError, postSuccess }) => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);
  
  return (
    isAuthenticated && (
      <Container fluid className={styles.homePageGridContainer}>

        <CustomNavbar onShowModal={handleShowModal} />
        
        <Container>
          <Header page='profile' />

          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <Card className="text-center">
                <Card.Img variant="top" src={user.picture} alt={user.name} />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        
        <AddMovieFormModal 
          showModal={showModal} 
          handleCloseModal={handleCloseModal} 
          postMovie={postMovie} 
          postError={postError}
          postSuccess={postSuccess}
        />
      </Container>
    )
  );
};

export default Profile;