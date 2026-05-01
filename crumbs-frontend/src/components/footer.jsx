import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente Footer para Crumb's
 * Proporciona navegación secundaria y créditos de marca.
 */
export default function Footer() {
  
  // Función para volver al inicio suavemente al hacer clic en enlaces de la misma página
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si no encuentra el ID (porque estamos en otra página), redirige a la home
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer>
      <div className="container footer-grid">
        {/* Bloque de Marca */}
        <div className="footer-brand">
          <h2 className="footer-logo">CRUMBS</h2>
          <p>
            Gestión inteligente de capital mediante el control estratégico de micro-gastos.
          </p>
        </div>

        {/* Grupos de Enlaces */}
        <div className="footer-links-group">
          
          <div className="f-col">
            <h5>Plataforma</h5>
            <Link to="/login">Acceso Clientes</Link>
            <Link to="/registro">Solicitar Registro</Link>
          </div>

          <div className="f-col">
            <h5>Compañía</h5>
            <a 
              href="#psicologia" 
              onClick={(e) => scrollToSection(e, 'psicologia')}
            >
              Nuestro Propósito
            </a>
            <a 
              href="#trayectoria" 
              onClick={(e) => scrollToSection(e, 'trayectoria')}
            >
              Historia y Futuro
            </a>
          </div>

        </div>
      </div>

      {/* Franja Inferior de Copyright */}
      <div className="footer-bottom">
        <p>
          Hecho con precisión para optimizar tu salud financiera. &copy; {new Date().getFullYear()} Crumbs Intelligence.
        </p>
      </div>
    </footer>
  );
}