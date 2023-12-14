import { Container } from 'react-bootstrap';
import styles from '../css/HomePage.module.css';
import { useAuth0 } from "@auth0/auth0-react";

function Header({ page }) {

  const { user } = useAuth0();

  let title, subtitle;

  switch (page) {
    case 'home':
      title = `Welcome ${user.given_name}!`;
      subtitle = "Here are some random movies from your community!";
      break;
    case 'community':
      title = "Community List";
      subtitle = "Check Out The Full List of Movies Shared By Your Community!";
      break;
    case 'profile':
      title = "Your Profile Information";
      subtitle = "";
      break;  
    case 'about':
      title = "About";
      subtitle = "";
      break;
    default:
      // Default/fallback title
      title = "Default Title";
      subtitle = "Default Subtitle";
  }

  return (
    <Container className={styles.homePageH1andH2}>
      <h1 className={styles.homePageH1}>{title}</h1>
      <h2 className={styles.homePageH2}>{subtitle}</h2>
    </Container>
  );
}

export default Header;