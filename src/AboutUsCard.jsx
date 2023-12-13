// AboutUsCard.jsx
import { Card, Button, Nav } from 'react-bootstrap';

function AboutUsCard() {

  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Developer Info</Nav.Link>
          </Nav.Item>
          
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Melo</Card.Title>
        <Card.Text>
          <b>Background:</b>
          <p>Small business primarily in providing clients with tax and business services</p>
        </Card.Text>
        <Card.Text>
          <b>Why I chose to pursue software development:</b> 
          <p>Passion for technology and how things work led me to pursue learning software development. In my spare time, I enjoy tinkering with tech-related projects and continually expand my skills and knowledge. Recognizing the value of software development in enhancing my offerings to clients, I have officially embarked on a journey with Code Fellows to deepen my expertise. While my direction may evolve as I gather more knowledge, my experience in small business management and leadership has honed my ability to independently complete tasks and effectively plan and prioritize.</p>
        </Card.Text>
        <Card.Text>
          <b>Goal:</b> 
          <p>To acquire extensive knowledge in software development and explore the opportunities that await on this exciting journey.</p>
        </Card.Text>
        <Button variant="success" href="https://github.com/MelodicXP" target="_blank">GitHub Profile</Button>

      </Card.Body>
    </Card>

  )
    
}

export default AboutUsCard;