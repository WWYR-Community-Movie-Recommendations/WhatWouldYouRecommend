import { Link } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import LoginButton from './Login';
// import './app.css';
import styled from 'styled-components';

const StyledDiv = styled.div`
body {
  margin: 0;
  padding: 0;
  height: 50%;
}

main {
  margin: 0;
  padding: 0;
  width: 100%;
  
}

.grid-container {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-auto-columns: minmax(minimum, maximum);
}

.logo-container {
  /* border: 3px solid green; */
  height: 100vh;
  text-align: center;
  background-color: #ec242a;
  padding-bottom: 3%;
}

h1 {
  color: #ffffff;
  font-size: 5vw;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
 
}

img {
  width: 50%;
  max-width: 50vw;
  height: auto;
  border-radius: 10px;
  border: 5px solid #ffffff;
  margin-top: 2%;
}

#hero-text {
  color: #ffffff;
  font-size: 2vw;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-top: 3%;
  
}

.existing-user-container {
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#existing-user-text {
  color: #030303;
  font-size: 3vw;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-top: 30%;
}

#existingUserForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#existingUserForm .form-control {
  width: 100%; 
  font-family: 'Roboto', sans-serif;
  margin-bottom: 3%;
}

#submit-button {
  width: 10vw;
  margin-top: 3%;
  margin-bottom: 3%;
}

a:hover {
  font-size: 1.6vw;
  font-weight: bold;
  color: #ec242a;
}

a {
  font-size: 1.5vw;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  color: #171a1d;
  transition: 350ms;
}

#home-page-text {
  color: black;
}
`;

function LandingPage() {
  return (
    <StyledDiv>
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
    </StyledDiv>
  );
}

export default LandingPage;