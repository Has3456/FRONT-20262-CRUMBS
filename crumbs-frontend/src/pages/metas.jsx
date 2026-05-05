import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/metas.css'; // Asegúrate de que el CSS esté en esta ruta
 
export const Metas = () => {
  const navigate = useNavigate();
  const [metas, setMetas] = useState([]);
 
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [montoObjetivo, setMontoObjetivo] = useState('');
  const [ahorroActual, setAhorroActual] = useState('');
  const [prioridad, setPrioridad] = useState('Nominal');
  const [fecha, setFecha] = useState('');
 
  // --- Cargar Metas al Iniciar ---
  useEffect(() => {
    const savedMetas = JSON.parse(localStorage.getItem('crumbs_metas')) || [];
    setMetas(savedMetas);
  }, []);
 
  // --- Guardar Meta Nueva ---
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const nuevaMeta = {
      id: Date.now(),
      nombre: nombre,
      objetivo: parseFloat(montoObjetivo),
      actual: parseFloat(ahorroActual) || 0,
      prioridad: prioridad,
      fechaLimite: fecha,
    };
 
    const nuevasMetas = [...metas, nuevaMeta];
    setMetas(nuevasMetas);
    localStorage.setItem('crumbs_metas', JSON.stringify(nuevasMetas));
 
    // Resetear formulario
    setNombre('');
    setMontoObjetivo('');
    setAhorroActual('');
    setPrioridad('Nominal');
    setFecha('');
  };
 
  // --- Inyectar Capital ---
  const inyectarCapital = (id) => {
    const monto = parseFloat(prompt("¿CUÁNTO CAPITAL DESEA INYECTAR A ESTE OBJETIVO?"));
    if (isNaN(monto) || monto <= 0) return;
 
    const metasActualizadas = metas.map(meta => {
      if (meta.id === id) {
        return { ...meta, actual: meta.actual + monto };
      }
      return meta;
    });
 
    setMetas(metasActualizadas);
    localStorage.setItem('crumbs_metas', JSON.stringify(metasActualizadas));
  };
 
  return (
    <div className="mission-control-viewport">
      <header className="tactical-header">
        <div className="header-left">
          <div className="status-box">
            <span className="pulse-dot-green"></span> SISTEMA DE PROYECCIÓN DE CAPITAL ACTIVO
          </div>
          <h1>CENTRO DE <span className="gold">OBJETIVOS DE EXTRACCIÓN</span></h1>
        </div>
        <button className="btn-tactic-titilante" onClick={() => navigate('/dashboard')}>
          VOLVER AL PANEL
        </button>
      </header>
 
      <div className="layout-grid">
        {/* LADO IZQUIERDO: CONFIGURACIÓN */}
        <aside className="goal-config-card">
          <div className="panel-label">CONF_NUEVO_OBJETIVO</div>
          <form id="form-meta" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>DESIGNACIÓN DEL OBJETIVO</label>
              <input
                type="text"
                placeholder="Ej: Viaje Japón, Fondo Emergencia"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
 
            <div className="input-row-3">
              <div className="input-group">
                <label>MONTO OBJETIVO (COP)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={montoObjetivo}
                  onChange={(e) => setMontoObjetivo(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>AHORRO ACTUAL</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={ahorroActual}
                  onChange={(e) => setAhorroActual(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>PRIORIDAD</label>
                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                  <option value="Nominal">NOMINAL</option>
                  <option value="Elevada">ELEVADA</option>
                  <option value="Crítica">CRÍTICA</option>
                </select>
              </div>
            </div>
 
            <div className="input-row-2">
              <div className="input-group">
                <label>FECHA LÍMITE (DEADLINE)</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>ESTRATEGIA</label>
                <input type="text" placeholder="..." />
              </div>
            </div>
 
            <button type="submit" className="btn-establish">ESTABLECER OBJETIVO</button>
          </form>
        </aside>
 
        {/* LADO DERECHO: LISTADO */}
        <main className="analysis-section">
          <div className="panel-label">RESUMEN_DE_OBJETIVOS_LOG</div>
          <div className="goals-list" id="goals-container">
            {metas.length === 0 ? (
              <div className="goal-placeholder">SIN OBJETIVOS ACTIVOS. INICIE UNA NUEVA CONFIGURACIÓN.</div>
            ) : (
              metas.map((meta) => {
                const porcentaje = Math.min((meta.actual / meta.objetivo) * 100, 100).toFixed(1);
                return (
                  <div className="goal-card" key={meta.id}>
                    <div className="goal-header">
                      <h3>{meta.nombre.toUpperCase()}</h3>
                      <span className="goal-percent">{porcentaje}%</span>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${porcentaje}%` }}></div>
                    </div>
                    <div className="goal-stats">
                      <span>RECAUDADO: <span className="current-val">${meta.actual.toLocaleString()}</span></span>
                      <span>META: ${meta.objetivo.toLocaleString()}</span>
                    </div>
                    <button className="btn-add-fund" onClick={() => inyectarCapital(meta.id)}>
                      + INYECTAR CAPITAL
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
};