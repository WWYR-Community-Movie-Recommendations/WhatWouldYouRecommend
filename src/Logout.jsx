import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import styles from '../css/HomePage.module.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button 
    variant='custom' 
    onClick={() => logout({ logoutParams: { returnTo: import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT } })}
    className={styles.homePageNavButton}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;