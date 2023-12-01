import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="danger" onClick={() => logout({ logoutParams: { returnTo: import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;