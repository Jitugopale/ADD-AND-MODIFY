import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';

function App() {
  return (
    <>
            <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/kyc-list" element={<Dashboard/>} />
          <Route path="/customers" element={<Customers/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
