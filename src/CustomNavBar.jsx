import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../css/HomePage.module.css';
import LogoutButton from './Logout';
import { withAuth0 } from '@auth0/auth0-react';

function CustomNavbar({ onShowModal }) {
  return (
    <Navbar expand="lg" variant="dark" className={styles.homePageNavContainer}>
        <Nav className={`flex-column ${styles.homePageNavColumn}`}>

          <Nav.Link
            as={Link}
            to="/home"
            className={styles.homePageNavButton}
          >
            Home
          </Nav.Link>

          <Button 
            variant='custom' 
            onClick={onShowModal} 
            className={styles.homePageNavButton}
          >
            Share a Movie
          </Button>

          <Nav.Link 
            variant="primary" 
            as={Link} to="/community-list" 
            className={styles.homePageNavButton}
          >
            Community List
          </Nav.Link>

          <Nav.Link
            variant="primary" 
            as={Link} to="/profile" 
            className={styles.homePageNavButton}
          >
            Your Profile
          </Nav.Link>

          <Nav.Link 
            variant="primary" 
            as={Link} to="/about-us" 
            className={styles.homePageNavButton}
          >
            About
          </Nav.Link>

          <LogoutButton />

        </Nav>
      </Navbar>
  );
}

export default withAuth0(CustomNavbar);
