import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import HomePage from './components/HomePage'; // Import HomePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default route */}
      </Routes>
    </Router>
  );
}

export default App;
