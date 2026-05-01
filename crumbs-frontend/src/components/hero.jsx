import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente Hero para Crumb's
 * Se encarga de la primera impresión del usuario con el mensaje estratégico
 * y las llamadas a la acción (CTA).
 */
export default function Hero() {

  // Función para bajar suavemente a la sección de psicología al hacer clic en "DESCUBRIR MÁS"
  const scrollToDiscover = (e) => {
    e.preventDefault();
    const target = document.getElementById('psicologia');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      {/* El atributo data-aos permite que el contenido entre con efecto desde abajo */}
      <div className="hero-content" data-aos="fade-up">
        
        <span className="hero-tag">
          Rastrea las migajas, salva tu fortuna
        </span>

        <h1 className="main-title">
          DEJA DE PERDER DINERO EN <span>MIGAJAS</span>
        </h1>

        <div className="quote-wrapper">
          <p className="main-quote">
            "Cuidado con los gastos pequeños; una pequeña filtración hunde un gran barco."
          </p>
          <cite>— Benjamin Franklin</cite>
        </div>

        <div className="hero-actions">
          {/* Botón principal que lleva al sistema de registro */}
          <Link to="/registro" className="btn-gold">
            REGISTRARSE
          </Link>

          {/* Botón secundario para explorar el ecosistema (Scroll suave) */}
          <a 
            href="#psicologia" 
            className="btn-outline" 
            onClick={scrollToDiscover}
          >
            DESCUBRIR MÁS
          </a>
        </div>
        
      </div>
    </section>
  );
}