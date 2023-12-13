import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import styles from '../css/LandingPage.module.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button className={styles.LandingPageLoginButton} variant="danger" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;