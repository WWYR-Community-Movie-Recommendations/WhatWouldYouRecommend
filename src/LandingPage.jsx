import { Link } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import LoginButton from './Login';

function LandingPage() {
  return (
    <main className="grid-container">

      <div className="logo-container">
        <h1>WWYR</h1>
        {/* https://unsplash.com/photos/wMkaMXTJjlQ Samuel Regan-Asante */}
        <img src="img/samuel-regan-asante-wMkaMXTJjlQ-unsplash.jpg" alt="picture of variety of movies" />
        <p id="hero-text">Discover Trusted Movie Recommendations</p>
      </div>

      <div className="existing-user-container">
        <p id="existing-user-text">Welcome Back!</p>

        <Container>

          <Form id="existingUserForm">

            <Form.Group>
              <Form.Label htmlFor="username"></Form.Label>
              <Form.Control type="text" id="username" name="userName" placeholder="Enter User Name" />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="userID"></Form.Label>
              <Form.Control type="text" id="userID" maxLength="4" name="userID" placeholder="Enter four-digit user ID#" />
            </Form.Group>

            <LoginButton />

          </Form>

          <Link to="/newUser">New User? Click Here</Link>
        
        </Container>

      </div>
    </main>
  );
}

export default LandingPage;