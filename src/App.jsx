import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';
import HomePage from './HomePage';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );   
}


export default App;