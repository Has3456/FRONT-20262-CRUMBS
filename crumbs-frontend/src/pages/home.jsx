import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Importación de Estilos
import '../styles/home.css';

// Importación de Componentes de Bloque
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  
  // Inicialización de animaciones al cargar el componente
  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true,
      mirror: false 
    });
  }, []);

  return (
    <div className="home-wrapper">
      {/* 1. Capas de Efectos Visuales de Fondo */}
      <div className="background-overlay">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
      </div>

      {/* 2. Navegación Principal */}
      <Navbar />

      {/* 3. Sección de Impacto (Hero) */}
      <Hero />

      {/* 4. Sección: Psicología Aplicada */}
      <section id="psicologia" className="info-section">
        <div className="container grid">
          <div className="text-content" data-aos="fade-right">
            <span className="section-label">PSICOLOGÍA APLICADA</span>
            <h2>Más que una herramienta, <br />un cambio de paradigma.</h2>
            <p>
              Crumbs analiza la raíz de tus hábitos. No solo registramos cifras; 
              decodificamos el comportamiento impulsivo para identificar las 
              "zonas de peligro" antes de que afecten tu patrimonio a largo plazo.
            </p>
            <div className="stat-mini">
              <p>Análisis de comportamiento en tiempo real basado en modelos cognitivos.</p>
            </div>
          </div>
          <div className="visual-content" data-aos="zoom-in">
            <div className="abstract-geometry">
              <div className="geo-ring one"></div>
              <div className="geo-ring two"></div>
              <div className="geo-ring three"></div>
              <div className="geo-core"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sección: Misión y Visión */}
      <section className="mission-vision-section">
        <div className="container grid-two">
          <div className="mv-card" data-aos="fade-up">
            <span className="mv-number">01</span>
            <h3>Misión</h3>
            <p>Transformar la educación financiera en un proceso intuitivo y consciente, permitiendo que cada individuo identifique y elimine las fugas de capital diarias.</p>
          </div>
          <div className="mv-card accent-card" data-aos="fade-up" data-aos-delay="100">
            <span className="mv-number">02</span>
            <h3>Visión</h3>
            <p>Convertirnos en el estándar global de gestión de micro-activos para el 2030, redefiniendo la relación emocional y técnica de las personas con su dinero.</p>
          </div>
        </div>
      </section>

      {/* 6. Sección: Modelo Estratégico 5+5 */}
      <section id="metodo" className="grid-features">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-label">MODELO ESTRATÉGICO</span>
            <h2>El Sistema 5+5</h2>
          </div>
          <div className="features-grid">
            <div className="f-card" data-aos="fade-up">
              <h4>Análisis de Perfil</h4>
              <p>Contexto de ingresos y ocupación para recomendaciones personalizadas.</p>
            </div>
            <div className="f-card" data-aos="fade-up">
              <h4>Zonas de Peligro</h4>
              <p>Detección de comercios y aplicaciones con mayor tasa de gasto impulsivo.</p>
            </div>
            <div className="f-card" data-aos="fade-up">
              <h4>Inteligencia de Categorías</h4>
              <p>Clasificación técnica entre gastos fijos y migajas evitables.</p>
            </div>
            <div className="f-card" data-aos="fade-up">
              <h4>Salud en Medios de Pago</h4>
              <p>Monitorización de uso de crédito frente a flujo de efectivo.</p>
            </div>
            <div className="f-card f-highlight" data-aos="fade-up">
              <h4>Semáforo de Necesidad</h4>
              <p>Evaluación de prioridad del 1 al 5 para cada transacción registrada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Sección: Trayectoria */}
      <section id="trayectoria" className="timeline-section">
        <div className="container">
          <span className="section-label">NUESTRO CAMINO</span>
          <div className="timeline-path">
            <div className="t-item" data-aos="fade-up">
              <span className="t-year">2024</span>
              <p>Conceptualización de la Arquitectura Crumbs y validación de Psicología Financiera.</p>
            </div>
            <div className="t-item" data-aos="fade-up">
              <span className="t-year">2025</span>
              <p>Lanzamiento del motor Spring Boot 3.x y fase de analítica predictiva.</p>
            </div>
            <div className="t-item" data-aos="fade-up">
              <span className="t-year">2026</span>
              <p>Expansión global y despliegue del ecosistema de seguridad encriptada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pie de Página */}
      <Footer />
    </div>
  );
}