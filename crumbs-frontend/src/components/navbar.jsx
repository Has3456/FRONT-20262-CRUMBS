import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente Navbar para Crumb's
 * Este componente utiliza 'Link' para asegurar que la navegación entre 
 * la Home y el Login sea instantánea sin recargar el navegador.
 */
export default function Navbar() {
  
  // Función para manejar el scroll suave hacia los IDs (Ecosistema, Método, etc.)
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo que redirige siempre a la Home */}
        <Link to="/" className="nav-logo">
          <div className="logo-dot"></div>
          CRUMBS
        </Link>

        <div className="nav-links">
          {/* Enlaces de ancla para la misma página */}
          <a 
            href="#psicologia" 
            onClick={(e) => handleScroll(e, 'psicologia')}
          >
            Ecosistema
          </a>
          
          <a 
            href="#metodo" 
            onClick={(e) => handleScroll(e, 'metodo')}
          >
            Modelo 5+5
          </a>
          
          <a 
            href="#trayectoria" 
            onClick={(e) => handleScroll(e, 'trayectoria')}
          >
            Trayectoria
          </a>

          {/* Botón de acción principal: Navega al Login */}
          <Link to="/login" className="btn-login-nav">
            INICIAR SESIÓN
          </Link>
        </div>
      </div>
    </nav>
  );
}