import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import LogoutButton from './Logout';
import { withAuth0 } from '@auth0/auth0-react';

function CustomNavbar({ onShowModal }) {
  return (
    <Navbar expand="lg" variant="dark" className={styles.homePageNavContainer}>
        <Nav className={`flex-column ${styles.homePageNavColumn}`}>

          <Button 
            variant="primary" 
            as={Link} 
            to="/home" 
            className={styles.homePageNavButton}
          >
            Home
          </Button>

          <Button 
            variant="primary" 
            onClick={onShowModal} 
            className={styles.homePageNavButton}
          >
            Share a Movie
          </Button>

          <Button 
            variant="primary" 
            as={Link} to="/community-list" 
            className={styles.homePageNavButton}
          >
            Community List
          </Button>

          <Button
            variant="primary" 
            as={Link} to="/profile" 
            className={styles.homePageNavButton}
          >
            Profile
          </Button>

          <Button 
            variant="primary" 
            as={Link} to="/about-us" 
            className={styles.homePageNavButton}
          >
            About Us
          </Button>

          <LogoutButton />

        </Nav>
      </Navbar>
  );
}

export default withAuth0(CustomNavbar);
