import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gasto.css';

export const CrearGasto = () => {
  const navigate = useNavigate();

  // --- ESTADOS DEL FORMULARIO ---
  const [nombre, setNombre] = useState('');
  const [presupuestoAntes, setPresupuestoAntes] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [especificar, setEspecificar] = useState('');
  
  // --- ESTADOS DE ANÁLISIS ---
  const [saldoRestante, setSaldoRestante] = useState(0);
  const [riesgo, setRiesgo] = useState('Bajo'); // 'Bajo', 'Medio', 'Alto'

  // --- LÓGICA DE CÁLCULO EN TIEMPO REAL ---
  useEffect(() => {
    const p = parseFloat(presupuestoAntes) || 0;
    const m = parseFloat(monto) || 0;
    const restante = p - m;
    setSaldoRestante(restante);

    if (p > 0 && m > 0) {
      const porcentajeGasto = (m / p) * 100;
      if (porcentajeGasto >= 50) setRiesgo('Alto');
      else if (porcentajeGasto >= 20) setRiesgo('Medio');
      else setRiesgo('Bajo');
    } else {
      setRiesgo('Bajo');
    }
  }, [presupuestoAntes, monto]);

  // --- PROCESAR EL REGISTRO (SUBMIT) ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Estructura de la "Migaja" adaptada del JS original
    const nuevaMigaja = {
      id: Date.now(),
      nombre: nombre,
      monto: parseFloat(monto),
      presupuestoOriginal: parseFloat(presupuestoAntes),
      saldoDespues: saldoRestante,
      categoria: categoria === 'Otros' ? especificar : (categoria || "No especificado"),
      riesgo: riesgo,
      fecha: new Date().toLocaleString(),
      // Lógica de coordenadas para el Radar de Riesgo
      x: Math.floor(Math.random() * 70) + 15,
      y: Math.floor(Math.random() * 70) + 15
    };

    // Persistencia en LocalStorage (crumbs_db)
    const db = JSON.parse(localStorage.getItem('crumbs_db')) || [];
    db.push(nuevaMigaja);
    localStorage.setItem('crumbs_db', JSON.stringify(db));

    // Feedback visual y redirección
    const btn = e.target.querySelector('.btn-submit');
    btn.innerText = "SISTEMA ACTUALIZADO";
    btn.style.background = "#28a745";

    setTimeout(() => {
      navigate('/dashboard'); // O la ruta que prefieras para volver
    }, 1200);
  };

  return (
    <div className="form-viewport">
      <header className="form-header">
        <div className="header-info">
          <span className="pulse-dot"></span>
          <p>MÓDULO DE ANÁLISIS FINANCIERO TRANSVERSAL</p>
        </div>
        <button className="btn-panel" onClick={() => navigate('/dashboard')}>
          VOLVER AL PANEL
        </button>
      </header>

      <main className="horizontal-container">
        <form id="form-gasto" className="horizontal-form" onSubmit={handleSubmit}>
          
          {/* SECCIÓN 01: IDENTIFICACIÓN */}
          <div className="form-section">
            <div className="section-tag">01. IDENTIFICACIÓN</div>
            <div className="input-group">
              <label>ESTABLECIMIENTO</label>
              <input 
                type="text" 
                placeholder="Ej: Starbucks" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required 
              />
            </div>
            <div className="input-group">
              <label>PRESUPUESTO DISPONIBLE</label>
              <input 
                type="number" 
                placeholder="Efectivo actual" 
                value={presupuestoAntes}
                onChange={(e) => setPresupuestoAntes(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* SECCIÓN 02: CLASIFICACIÓN */}
          <div className="form-section">
            <div className="section-tag">02. CLASIFICACIÓN</div>
            <div className="input-group">
              <label>MONTO DEL GASTO (COP)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required 
              />
            </div>
            <div className="input-group">
              <label>CATEGORÍA</label>
              <select 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)} 
                required
              >
                <option value="">Seleccione...</option>
                <option value="Snacks">Snacks & Café</option>
                <option value="Transporte">Transporte / Apps</option>
                <option value="Suscripciones">Suscripciones</option>
                <option value="Hobby">Hobby / Ocio</option>
                <option value="Otros">Otros (Especificar)</option>
              </select>
            </div>
            
            {categoria === 'Otros' && (
              <div className="input-group" id="container-especificar">
                <label>DETALLE DE CATEGORÍA</label>
                <input 
                  type="text" 
                  placeholder="¿Cuál?" 
                  value={especificar}
                  onChange={(e) => setEspecificar(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          {/* SECCIÓN 03: IMPACTO TÁCTICO */}
          <div className="form-section">
            <div className="section-tag">03. IMPACTO TÁCTICO</div>
            <div className="input-group">
              <label>SALDO TRAS OPERACIÓN</label>
              <input 
                type="text" 
                className="readonly-input" 
                style={{ color: saldoRestante < 0 ? "#ff453a" : "#d4af37" }}
                readOnly 
                value={saldoRestante < 0 ? `DEUDA: $${Math.abs(saldoRestante).toLocaleString()}` : `$${saldoRestante.toLocaleString()}`} 
              />
            </div>
            
            <div className="input-group">
              <label>AMENAZA DETECTADA</label>
              <div className="risk-display">
                <div 
                  className={`risk-light l-bajo ${riesgo === 'Bajo' ? 'active' : ''}`}
                  style={{ opacity: riesgo === 'Bajo' ? 1 : 0.2, boxShadow: riesgo === 'Bajo' ? "0 0 15px rgba(10, 132, 255, 0.4)" : "none" }}
                >B</div>
                <div 
                  className={`risk-light l-medio ${riesgo === 'Medio' ? 'active' : ''}`}
                  style={{ opacity: riesgo === 'Medio' ? 1 : 0.2, boxShadow: riesgo === 'Medio' ? "0 0 15px rgba(212, 175, 55, 0.4)" : "none" }}
                >M</div>
                <div 
                  className={`risk-light l-alto ${riesgo === 'Alto' ? 'active' : ''}`}
                  style={{ opacity: riesgo === 'Alto' ? 1 : 0.2, boxShadow: riesgo === 'Alto' ? "0 0 15px rgba(255, 69, 58, 0.4)" : "none" }}
                >A</div>
              </div>
            </div>

            <button type="submit" className="btn-submit">PROCESAR MIGAJA</button>
          </div>

        </form>
      </main>
    </div>
  );
};