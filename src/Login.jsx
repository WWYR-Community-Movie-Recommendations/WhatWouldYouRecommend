import { Button } from "react-bootstrap";

const LoginButton = () => {
  // const { loginWithRedirect } = useAuth0();

  return <Button type="submit" id="submit-button">Submit</Button>;

  // return <Button className="loginLogout-button" variant="success" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;