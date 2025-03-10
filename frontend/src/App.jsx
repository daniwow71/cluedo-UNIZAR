import { useState } from 'react';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Home from './pages/home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import RegisterPage from './pages/auth/register/RegisterPage.jsx';
import LoginPage from './pages/auth/login/LoginPage.jsx';
import StartGames from './pages/startGames/StartGames.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { logoutUser } from './services/User';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    logoutUser();
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home user={user} />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage setUser={setUser} />} />
        <Route path={ROUTES.GAMES} element={<StartGames />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;