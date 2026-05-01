import React from 'react';
import '../styles/dashboard.css'; // Compartirá los estilos con el dashboard

const Sidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <h2>Panel Cliente</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="#inicio" className="active">
            <span className="icon">🏠</span> Inicio
          </a>
        </li>
        <li>
          <a href="#pedidos">
            <span className="icon">📦</span> Mis Pedidos
          </a>
        </li>
        <li>
          <a href="#perfil">
            <span className="icon">👤</span> Mi Perfil
          </a>
        </li>
        <li>
          <a href="#soporte">
            <span className="icon">🎧</span> Soporte
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="#cerrar" className="logout-btn">Cerrar Sesión</a>
      </div>
    </aside>
  );
};

export default Sidebar;