import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar tokens de sesión (ej. localStorage.clear())
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo-dot"></div>
        <span>CRUMBS</span>
      </div>
      
      <div className="user-card">
        <div className="avatar" id="user-initials">AG</div>
        <div className="user-meta">
          <p className="label">AGENTE</p>
          <h4 id="user-name-display">Cargando...</h4>
        </div>
      </div>

      <nav className="menu-nav">
        <p className="menu-label">SISTEMA TÁCTICO</p>
        <button 
          className={`menu-item ${activeSection === 'resumen' ? 'active' : ''}`}
          onClick={() => setActiveSection('resumen')}
        >
          <span className="nav-dot"></span> Radar de Riesgo
        </button>
        <button 
          className={`menu-item ${activeSection === 'resumen' ? 'active' : ''}`}
          onClick={() => setActiveSection('resumen')}
        >
          <span className="nav-dot"></span> Resumen de Datos
        </button>
        
        <p className="menu-label">OPERACIONES</p>
        <button className="menu-item" onClick={() => navigate('/crear-gasto')}>
          <span className="nav-dot"></span> Registrar Gasto
        </button>
        <button 
          className={`menu-item ${activeSection === 'historial' ? 'active' : ''}`}
          onClick={() => setActiveSection('historial')}
        >
          <span className="nav-dot"></span> Historial
        </button>
        <button 
          className={`menu-item ${activeSection === 'metas' ? 'active' : ''}`}
          onClick={() => setActiveSection('metas')}
        >
          <span className="nav-dot"></span> Metas de Ahorro
        </button>


        <button className="menu-item" onClick={() => navigate('/registrar-medio-pago')}>
         <span className="nav-dot"></span> Registrar Medio Pago
        </button>

          <button className="menu-item" onClick={() => navigate('/registrar-comercio')}>
          <span className="nav-dot"></span> Registrar Comercio
        </button>


          <button className="menu-item" onClick={() => navigate('/crear-categoria')}> 
          <span className="nav-dot"></span> Crear Categoría
        </button>
        
        <p className="menu-label">SISTEMA</p>
        <button className="menu-item" onClick={() => navigate('/perfil')}>
          <span className="nav-dot"></span> Mi Perfil
        </button>
        
        <hr className="divider" />
        <button className="menu-item logout-btn" onClick={handleLogout}>
          <span className="nav-dot-exit"></span> Cerrar Sesión
        </button>

        

      


      </nav>
    </aside>
  );
};