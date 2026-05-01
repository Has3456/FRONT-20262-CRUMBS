import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  // Estado para controlar qué sección se muestra
  const [activeSection, setActiveSection] = useState('resumen');
  const [metaAhorro, setMetaAhorro] = useState('');

  const handleGuardarMeta = (e) => {
    e.preventDefault();
    if (!metaAhorro) return;
    alert(`Meta de ahorro fijada en: $${metaAhorro}`);
    // Aquí puedes añadir tu lógica para guardar en la base de datos/API
  };

  return (
    <div className="app-container">
      {/* Insertamos el componente del Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="main-viewport">
        
        {/* SECCIÓN RESUMEN */}
        {activeSection === 'resumen' && (
          <section id="section-resumen" className="content-view">
            <header className="view-header">
              <h1>ESTADO DEL <span className="gold">PATRIMONIO</span></h1>
            </header>
            <div className="stats-grid">
              <div className="stat-card">
                <h5>GASTO TOTAL DETECTADO</h5>
                <h2 id="total-spent">$ 0</h2>
              </div>
              <div className="stat-card">
                <h5>FRECUENCIA DE "MIGAJAS"</h5>
                <h2 id="expense-count">0 / mes</h2>
              </div>
              <div className="stat-card">
                <h5>ZONA DE MAYOR FUGA</h5>
                <h2 id="top-category">---</h2>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN METAS */}
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

        {/* SECCIÓN HISTORIAL */}
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
                  {/* Aquí mapearías tus datos reales de gastos */}
                  <tr>
                    <td>Restaurante X</td>
                    <td>Comida</td>
                    <td>$25,000</td>
                    <td>Alto</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};