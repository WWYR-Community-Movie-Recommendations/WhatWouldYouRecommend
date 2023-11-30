// CustomNavbar.jsx
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

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
            as={Link} to="/about-us" 
            className={styles.homePageNavButton}
          >
            About Us
          </Button>

          <Button 
            variant="primary" 
            as={Link} to="/logout" 
            className={styles.homePageNavButton}
          >
            Log Out
          </Button>

        </Nav>
      </Navbar>
  );
}

export default CustomNavbar;
