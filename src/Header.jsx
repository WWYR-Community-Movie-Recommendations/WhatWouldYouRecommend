import { Container } from 'react-bootstrap';
import styles from './HomePage.module.css';

function Header({ page }) {
  let title, subtitle;

  switch (page) {
    case 'home':
      title = "Recommendations from your community!";
      subtitle = "Welcome User!";
      break;
    case 'community':
      title = "Community List";
      subtitle = "userOne, Check Out The Full List of Movies Shared By The Community!";
      break;
    case 'profile':
      title = "Profile";
      subtitle = "Profile Information";
      break;  
    case 'about':
      title = "About Me";
      subtitle = <>Name <em>&quot;NameInQuotes&quot;</em></>;
      break;
    default:
      // Default or fallback titles
      title = "Default Title";
      subtitle = "Default Subtitle";
  }

  return (
    <Container>
      <h1 className={styles.homePageH1}>{title}</h1>
      <h2 className={styles.homePageH2}>{subtitle}</h2>
    </Container>
  );
}

export default Header;