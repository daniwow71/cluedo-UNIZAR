import './styles/Header.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import useHeader from '../../hooks/useHeader';

const Header = ({ user, onLogout }) => {
  const { isMobile, toggleMenu, navClasses, navListClasses } = useHeader()

  return (
    <header className="header">
      <h1 className="header-title">Cluedo UNIZAR</h1>

      {isMobile && (
        <button className="header-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <GiHamburgerMenu size={24} />
        </button>
      )}

      <nav className={navClasses}>
        <ul className={navListClasses}>
          <li className="header-nav-item"><Link to="/">Inicio</Link></li>
          <li className="header-nav-item"><Link to="/games">Partidas</Link></li>
          <li className="header-nav-item"><Link to="/rules">Reglas</Link></li>
          {user ? (
            <>
              <li className="header-nav-item header-profile">
                <Link to="/profile">Mi perfil</Link>
              </li>
              <li className="header-nav-item header-logout">
                <Link to="/" onClick={onLogout}>Cerrar sesión</Link>
              </li>
            </>
          ) : (
            <>
              <li className="header-nav-item header-login">
                <Link to="/login">Iniciar sesión</Link>
              </li>
              <li className="header-nav-item header-register">
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;