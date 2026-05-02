import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/historial.css';

export const Historial = () => {
  const navigate = useNavigate();

  // 1. Estado para los datos de la base de datos real (localStorage)
  const [gastos, setGastos] = useState([]);
  
  // 2. Estados para los filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroRiesgo, setFiltroRiesgo] = useState('ALL');

  // 3. Cargar historial al montar el componente (Equivalente a loadHistory)
  useEffect(() => {
    cargarDesdeStorage();
  }, []);

  const cargarDesdeStorage = () => {
    const db = JSON.parse(localStorage.getItem('crumbs_db')) || [];
    // Aplicamos reverse() para que los más recientes salgan primero, como en tu JS original
    setGastos([...db].reverse());
  };

  // 4. Lógica de filtrado en tiempo real (Equivalente a filterData)
  const gastosFiltrados = gastos.filter((item) => {
    const term = busqueda.toLowerCase();
    const matchesSearch = 
      item.nombre.toLowerCase().includes(term) || 
      item.categoria.toLowerCase().includes(term);

    const matchesRisk = filtroRiesgo === 'ALL' || item.riesgo === filtroRiesgo;

    return matchesSearch && matchesRisk;
  });

  // 5. Función para eliminar (Equivalente a deleteItem)
  const eliminarGasto = (id) => {
    if (window.confirm('¿CONFIRMA LA ELIMINACIÓN DE ESTE REGISTRO?')) {
      const dbActual = JSON.parse(localStorage.getItem('crumbs_db')) || [];
      const nuevaDb = dbActual.filter(item => item.id !== id);
      
      // Guardar en localStorage
      localStorage.setItem('crumbs_db', JSON.stringify(nuevaDb));
      
      // Actualizar estado local para refrescar la tabla
      cargarDesdeStorage();
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
              {gastosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontSize: '0.7rem', color: '#888' }}>{item.fecha}</td>
                  <td><strong style={{ color: '#fff' }}>{item.nombre.toUpperCase()}</strong></td>
                  <td><span style={{ color: '#888' }}>#</span>{item.categoria}</td>
                  <td>${item.presupuestoOriginal?.toLocaleString() || '0'}</td>
                  <td className="gasto-monto" style={{ color: '#ff4d4d' }}>-${item.monto.toLocaleString()}</td>
                  <td className="saldo-final" style={{ color: '#00ff88' }}>${item.saldoDespues?.toLocaleString() || '0'}</td>
                  <td>
                    <span className={`badge-risk risk-${item.riesgo.toLowerCase()}`}>
                      {item.riesgo.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-delete" 
                      onClick={() => eliminarGasto(item.id)}
                    >
                      ELIMINAR
                    </button>
                  </td>
                </tr>
              ))}
              
              {/* Mensaje de "No resultados" */}
              {gastosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', color: '#555', padding: '40px' }}>
                    --- NO SE ENCONTRARON REGISTROS EN EL LOG ---
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