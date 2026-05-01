import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Historial.css';

export const Historial = () => {
  const navigate = useNavigate();

  // 1. Estado para los datos de la tabla (Aquí simulamos datos que vendrían de tu API)
  const [gastos, setGastos] = useState([
    {
      id: 1,
      fecha: '01/05/2026 14:30',
      establecimiento: 'Starbucks',
      categoria: 'Cafetería',
      presupuestoInicial: 100000,
      montoGasto: 15000,
      saldoFinal: 85000,
      riesgo: 'Bajo'
    },
    {
      id: 2,
      fecha: '01/05/2026 16:15',
      establecimiento: 'Restaurante El Faro',
      categoria: 'Comida',
      presupuestoInicial: 85000,
      montoGasto: 45000,
      saldoFinal: 40000,
      riesgo: 'Medio'
    },
    {
      id: 3,
      fecha: '01/05/2026 18:00',
      establecimiento: 'Casino Central',
      categoria: 'Entretenimiento',
      presupuestoInicial: 40000,
      montoGasto: 35000,
      saldoFinal: 5000,
      riesgo: 'Alto'
    }
  ]);

  // 2. Estados para los filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroRiesgo, setFiltroRiesgo] = useState('ALL');

  // 3. Lógica de filtrado en tiempo real
  const gastosFiltrados = gastos.filter((gasto) => {
    const cumpleBusqueda = 
      gasto.establecimiento.toLowerCase().includes(busqueda.toLowerCase()) ||
      gasto.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const cumpleRiesgo = filtroRiesgo === 'ALL' || gasto.riesgo === filtroRiesgo;

    return cumpleBusqueda && cumpleRiesgo;
  });

  // Función para eliminar un registro (Acción)
  const eliminarGasto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      setGastos(gastos.filter(gasto => gasto.id !== id));
    }
  };

  return (
    <div className="history-viewport">
      <header className="history-header">
        <div className="header-left">
          <div className="status-box">
            <span className="pulse-dot"></span>
            <p>REGISTRO CENTRAL DE MIGAJAS (LOG_FILE_01)</p>
          </div>
          <h1>HISTORIAL DE <span className="gold">OPERACIONES</span></h1>
        </div>
        
        <div className="header-actions">
          <div className="stat-mini">
            <span className="label">TOTAL LOGS:</span>
            <span id="total-logs" className="value">{gastosFiltrados.length}</span>
          </div>
          <button className="btn-exit" onClick={() => navigate('/dashboard')}>
            VOLVER AL PANEL
          </button>
        </div>
      </header>

      <main className="history-container">
        <div className="filter-bar">
          <input 
            type="text" 
            id="search-input" 
            placeholder="BUSCAR ESTABLECIMIENTO O CATEGORÍA..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select 
            id="filter-riesgo"
            value={filtroRiesgo}
            onChange={(e) => setFiltroRiesgo(e.target.value)}
          >
            <option value="ALL">TODOS LOS RIESGOS</option>
            <option value="Bajo">RIESGO BAJO</option>
            <option value="Medio">RIESGO MEDIO</option>
            <option value="Alto">RIESGO ALTO</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table id="history-table">
            <thead>
              <tr>
                <th>FECHA / HORA</th>
                <th>ESTABLECIMIENTO</th>
                <th>CATEGORÍA</th>
                <th>PRESUPUESTO INICIAL</th>
                <th>MONTO GASTO</th>
                <th>SALDO FINAL</th>
                <th>RIESGO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {gastosFiltrados.map((gasto) => (
                <tr key={gasto.id}>
                  <td>{gasto.fecha}</td>
                  <td><strong>{gasto.establecimiento}</strong></td>
                  <td>{gasto.categoria}</td>
                  <td>${gasto.presupuestoInicial.toLocaleString()}</td>
                  <td className="gasto-monto">-${gasto.montoGasto.toLocaleString()}</td>
                  <td>${gasto.saldoFinal.toLocaleString()}</td>
                  <td>
                    <span className={`badge-riesgo ${gasto.riesgo.toLowerCase()}`}>
                      {gasto.riesgo}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-delete" 
                      onClick={() => eliminarGasto(gasto.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {gastosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', color: '#888' }}>
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};