import { useState } from 'react';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;