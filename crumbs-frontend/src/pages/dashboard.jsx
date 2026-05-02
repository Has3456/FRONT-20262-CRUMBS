import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/sidebar';
import '../styles/dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();

  // --- ESTADOS PARA MANTENER LA LÓGICA DEL JS ---
  const [activeSection, setActiveSection] = useState('resumen'); // Control de secciones
  const [userData, setUserData] = useState({ nombre: '', iniciales: '' }); // Datos de sesión
  const [gastos, setGastos] = useState([]); // Lista de crumbs_db
  const [resumen, setResumen] = useState({ total: 0, cantidad: 0, topCategoria: '---' }); // Cálculos
  const [metaAhorro, setMetaAhorro] = useState(''); // Input de metas

  // --- 1. VERIFICAR SESIÓN Y CARGAR DATOS (Equivalente al DOMContentLoaded) ---
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('user_session'));
    
    if (!session) {
      // Si no hay sesión, directo al login (Verificación de seguridad)
      navigate('/login'); 
      return;
    }

    // Seteamos los datos del usuario en el estado
    setUserData({
      nombre: session.nombre,
      iniciales: session.nombre.substring(0, 2).toUpperCase()
    });

    // Ejecutamos la carga de datos inicial
    actualizarTodoElDashboard();

    // Cargar meta de ahorro si ya existe
    const metaGuardada = localStorage.getItem('config_meta');
    if (metaGuardada) setMetaAhorro(metaGuardada);
  }, [navigate]);

  // --- 2. LÓGICA DE CÁLCULOS (Equivalente a cargarResumen y cargarHistorial) ---
  const actualizarTodoElDashboard = () => {
    const db = JSON.parse(localStorage.getItem('crumbs_db')) || [];
    setGastos(db);

    // Calcular Total Spent
    const total = db.reduce((acc, g) => acc + g.monto, 0);
    
    // Calcular Categoría Top (Lógica de tu JS original)
    let top = '---';
    if (db.length > 0) {
      const categorias = db.map(g => g.categoria);
      top = categorias.sort((a, b) =>
        categorias.filter(v => v === a).length - categorias.filter(v => v === b).length
      ).pop();
    }

    setResumen({
      total: total,
      cantidad: db.length,
      topCategoria: top ? top.toUpperCase() : '---'
    });
  };

  // --- 3. FUNCIONES DE ACCIÓN ---
  
  // Guardar Meta (Equivalente a guardarMeta)
  const handleGuardarMeta = (e) => {
    e.preventDefault();
    if (metaAhorro > 0) {
      localStorage.setItem('config_meta', metaAhorro);
      alert("Meta de ahorro actualizada correctamente en el hormiguero.");
    }
  };

  // Cerrar Sesión (Equivalente a cerrarSesion)
  const handleCerrarSesion = () => {
    localStorage.removeItem('user_session');
    navigate('/login');
  };

  return (
    <div className="app-container">
      {/* 
          Sidebar: Recibe el estado para cambiar secciones y los datos 
          del usuario para el perfil.
      */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        user={userData}
        onLogout={handleCerrarSesion}
      />

      <main className="main-viewport">
        
        {/* SECCIÓN RESUMEN (Integrada con cargarResumen) */}
        {activeSection === 'resumen' && (
          <section id="section-resumen" className="content-view">
            <header className="view-header">
              <h1>ESTADO DEL <span className="gold">PATRIMONIO</span></h1>
              <p>Bienvenido de nuevo, {userData.nombre}</p>
            </header>
            <div className="stats-grid">
              <div className="stat-card">
                <h5>GASTO TOTAL DETECTADO</h5>
                <h2 id="total-spent">$ {resumen.total.toLocaleString()}</h2>
              </div>
              <div className="stat-card">
                <h5>FRECUENCIA DE "MIGAJAS"</h5>
                <h2 id="expense-count">{resumen.cantidad} registros</h2>
              </div>
              <div className="stat-card">
                <h5>ZONA DE MAYOR FUGA</h5>
                <h2 id="top-category">{resumen.topCategoria}</h2>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN METAS (Integrada con guardarMeta) */}
        {activeSection === 'metas' && (
          <section id="section-metas" className="content-view">
            <header className="view-header">
              <h1>CONTROL DE <span className="gold">CONTENCIÓN</span></h1>
            </header>
            <div className="budget-main-card">
              <h4>Establecer Límite Mensual</h4>
              <p>Define cuánto es lo máximo que permites que se escape en "migajas".</p>
              <form onSubmit={handleGuardarMeta} className="input-action-group">
                <input 
                  type="number" 
                  id="input-meta-ahorro" 
                  placeholder="Ej: 500000"
                  value={metaAhorro}
                  onChange={(e) => setMetaAhorro(e.target.value)}
                />
                <button type="submit" className="btn-primary">FIJAR META</button>
              </form>
            </div>
          </section>
        )}

        {/* SECCIÓN HISTORIAL (Integrada con cargarHistorial) */}
        {activeSection === 'historial' && (
          <section id="section-historial" className="content-view">
            <header className="view-header">
              <h1>LOG DE <span className="gold">ACTIVIDAD</span></h1>
            </header>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ESTABLECIMIENTO</th>
                    <th>CATEGORÍA</th>
                    <th>MONTO</th>
                    <th>RIESGO</th>
                  </tr>
                </thead>
                <tbody id="lista-gastos-body">
                  {gastos.length > 0 ? (
                    gastos.map((g, index) => (
                      <tr key={index}>
                        <td>{g.nombre}</td>
                        <td>{g.categoria}</td>
                        <td>$ {g.monto.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${g.riesgo.toLowerCase()}`}>
                            {g.riesgo}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                        No hay registros en el historial.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};