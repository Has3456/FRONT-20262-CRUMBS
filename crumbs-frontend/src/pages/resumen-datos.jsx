document.addEventListener('DOMContentLoaded', () => {
    const gastos = JSON.parse(localStorage.getItem('crumbs_db')) || [];
    const metaConfig = localStorage.getItem('config_meta') || 500000;
 
    const total = gastos.reduce((acc, g) => acc + g.monto, 0);
    
    // Rellenar valores simples
    document.getElementById('total-val').innerText = `$ ${total.toLocaleString()}`;
    document.getElementById('count-val').innerText = gastos.length;
 
    // Lógica de Riesgo Dinámica
    const riskStatus = document.getElementById('risk-status');
    if(total > metaConfig) {
        riskStatus.innerText = "CRÍTICO";
        riskStatus.style.color = "#ff453a";
    } else if (total > metaConfig * 0.7) {
        riskStatus.innerText = "ELEVADO";
        riskStatus.style.color = "#d4af37";
    }
 
    // Progreso Circular
    const perc = Math.min((total / metaConfig) * 100, 100);
    document.getElementById('progress-path').setAttribute('stroke-dasharray', `${perc}, 100`);
    document.getElementById('perc-val').innerText = `${Math.round(perc)}%`;
    document.getElementById('meta-text').innerText = `Gasto: $${total.toLocaleString()} / Meta: $${parseInt(metaConfig).toLocaleString()}`;
 
    // Barras de Categoría
    const cats = {};
    gastos.forEach(g => cats[g.categoria] = (cats[g.categoria] || 0) + g.monto);
    
    const container = document.getElementById('category-bars');
    container.innerHTML = Object.entries(cats).map(([name, val]) => {
        const p = (val / total) * 100;
        return `
            <div class="bar-row">
                <div class="bar-info"><span>${name.toUpperCase()}</span><span>$${val.toLocaleString()}</span></div>
                <div class="bar-track"><div class="bar-fill" style="width: ${p}%"></div></div>
            </div>
        `;
    }).join('');
});
 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/resumen.css'; // Comentado hasta que crees el archivo
 
export const Historial = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    gastos: [],
    total: 0,
    metaConfig: 500000,
    porcentaje: 0,
    categorias: {}
  });
 
  useEffect(() => {
    // 1. Cargar datos de LocalStorage
    const crumbs_db = JSON.parse(localStorage.getItem('crumbs_db')) || [];
    const config_meta = localStorage.getItem('config_meta') || 500000;
 
    // 2. Calcular total
    const totalCalculado = crumbs_db.reduce((acc, g) => acc + g.monto, 0);
 
    // 3. Agrupar por categorías
    const cats = {};
    crumbs_db.forEach(g => {
      cats[g.categoria] = (cats[g.categoria] || 0) + g.monto;
    });
 
    // 4. Calcular porcentaje de meta
    const perc = Math.min((totalCalculado / config_meta) * 100, 100);
 
    setDatos({
      gastos: crumbs_db,
      total: totalCalculado,
      metaConfig: config_meta,
      porcentaje: perc,
      categorias: cats
    });
  }, []);
 
  // Lógica de color de riesgo
  const getRiskStyle = () => {
    if (datos.total > datos.metaConfig) return { label: "CRÍTICO", color: "#ff453a" };
    if (datos.total > datos.metaConfig * 0.7) return { label: "ELEVADO", color: "#d4af37" };
    return { label: "NOMINAL", color: "#d4af37" };
  };
 
  const riesgo = getRiskStyle();
 
  return (
    <div className="summary-viewport">
      <header className="summary-header">
        <div className="header-left">
          <div className="status-box">
            <span className="pulse-dot"></span>
            <p>EXTRACCIÓN DE DATOS FINALIZADA</p>
          </div>
          <h1>RESUMEN DE <span className="gold">INTELIGENCIA</span></h1>
        </div>
 
        <button className="btn-exit" onClick={() => navigate('/dashboard')}>
          VOLVER AL PANEL
        </button>
      </header>
 
      <main className="summary-content">
        {/* FILA DE KPIs */}
        <div className="kpi-row">
          <div className="kpi-card">
            <span className="kpi-tag">TOTAL DETECTADO</span>
            <h2>$ {datos.total.toLocaleString()}</h2>
          </div>
          <div className="kpi-card">
            <span className="kpi-tag">MIGAJAS REGISTRADAS</span>
            <h2>{datos.gastos.length}</h2>
          </div>
          <div className="kpi-card">
            <span className="kpi-tag">NIVEL DE AMENAZA</span>
            <h2 style={{ color: riesgo.color }}>{riesgo.label}</h2>
          </div>
        </div>
 
        <div className="charts-section">
          {/* BARRAS DE CATEGORÍA */}
          <div className="data-box">
            <h3>FUGA POR CATEGORÍA</h3>
            <div className="bars-container">
              {Object.entries(datos.categorias).map(([name, val]) => {
                const p = (val / datos.total) * 100;
                return (
                  <div className="bar-row" key={name}>
                    <div className="bar-info">
                      <span>{name.toUpperCase()}</span>
                      <span>${val.toLocaleString()}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${p}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* PROGRESO CIRCULAR */}
          <div className="data-box center">
            <h3>CONTENCIÓN PRESUPUESTARIA</h3>
            <div className="circle-progress">
              <svg viewBox="0 0 36 36">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path 
                  className="circle-fill" 
                  strokeDasharray={`${datos.porcentaje}, 100`} 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="percentage-text">{Math.round(datos.porcentaje)}%</div>
            </div>
            <p className="meta-desc">
              Gasto: ${datos.total.toLocaleString()} / Meta: ${parseInt(datos.metaConfig).toLocaleString()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
 