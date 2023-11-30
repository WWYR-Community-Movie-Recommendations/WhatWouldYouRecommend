import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );   
}


export default App;