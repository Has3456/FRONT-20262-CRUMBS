import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Historial from '../components/historial'; // <-- Importamos el componente
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* 1. Navbar arriba */}
      <Navbar />

      <div className="dashboard-layout">
        {/* 2. Sidebar a la izquierda */}
        <Sidebar />

        {/* 3. Contenido principal a la derecha */}
        <main className="dashboard-main">
          <header className="main-header">
            <h1>Bienvenido a tu Panel</h1>
            <p>Aquí puedes ver el resumen de tu actividad.</p>
          </header>

          {/* Sección de Tarjetas (Sin eliminar nada) */}
          <section className="metrics-grid">
            <div className="metric-card">
              <h4>Puntos</h4>
              <p>450</p>
            </div>
            <div className="metric-card">
              <h4>Pedidos</h4>
              <p>12</p>
            </div>
          </section>

          {/* NUEVA SECCIÓN: El Historial de Pedidos */}
          <section className="dashboard-section">
            <Historial />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;