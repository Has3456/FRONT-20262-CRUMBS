import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gasto.css';


export const CrearGasto = () => {
  const navigate = useNavigate();

  // --- ESTADOS PRINCIPALES ---
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [valor, setValor] = useState('');
  const [presupuestoAntes, setPresupuestoAntes] = useState('');
  const [imagen, setImagen] = useState('');
  const [tipoNecesidad, setTipoNecesidad] = useState('');
  const [frecuenciaGasto, setFrecuenciaGasto] = useState('');
  const [lugarConsumo, setLugarConsumo] = useState('');
  const [medioVerificacion, setMedioVerificacion] = useState('');
  const [gradoNecesidad, setGradoNecesidad] = useState('');

  // --- ESTADOS DE ANÁLISIS ---
  const [saldoRestante, setSaldoRestante] = useState(0);
  const [riesgo, setRiesgo] = useState('Bajo');

  // --- RELACIONES Y LISTAS ---
  const [categoriaId, setCategoriaId] = useState('');
  const [medioPagoId, setMedioPagoId] = useState('');
  const [comercioId, setComercioId] = useState('');
  
  const [listaMediosPago, setListaMediosPago] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaComercios, setListaComercios] = useState([]);
  

useEffect(() => {
  const cargarDatos = async () => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) return;

    // 1. Cargar Medios de Pago
    try {
      const resMedios = await fetch(`http://localhost:8080/api/crumbs/medios_pago/usuario/${usuarioId}`);
      if (resMedios.ok) {
        const medios = await resMedios.json();
        setListaMediosPago(Array.isArray(medios) ? medios : []);
      }
    } catch (error) {
      console.error("Error al cargar medios de pago:", error);
    }

    // 2. Cargar Categorías
    try {
      const resCat = await fetch(`http://localhost:8080/api/crumbs/categorias/usuario/${usuarioId}`);
      if (resCat.ok) {
        const categorias = await resCat.json();
        setListaCategorias(Array.isArray(categorias) ? categorias : []);
      }
    } catch (error) {
      console.error("Categorías no disponibles:", error);
    }

    // 3. Cargar Comercios
    try {
      const resComercios = await fetch(`http://localhost:8080/api/crumbs/comercios/usuario/${usuarioId}`);
      if (resComercios.ok) {
        const comercios = await resComercios.json();
        setListaComercios(Array.isArray(comercios) ? comercios : []);
      }
    } catch (error) {
      console.error("Error al cargar comercios:", error);
    }
  };

  cargarDatos();
}, []);

  // --- LÓGICA DE CÁLCULO AUTOMÁTICO ---
useEffect(() => {
  const p = parseFloat(presupuestoAntes) || 0;
  const v = parseFloat(valor) || 0;
  const nuevoSaldo = p - v;
  
  setSaldoRestante(nuevoSaldo);

  if (nuevoSaldo < 0) {
      setRiesgo('Alto (Deuda)');
  } else if (nuevoSaldo < (p * 0.1)) {
      setRiesgo('Medio');
  } else {
      setRiesgo('Bajo');
  }
}, [presupuestoAntes, valor]);

  // ... (Tu useEffect de cálculo de riesgo se queda igual) ...

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const usuarioId = localStorage.getItem('usuarioId');

  // 1. Validación de seguridad: no enviar si no hay sesión
  if (!usuarioId) {
    alert("Error: Sesión no encontrada. Por favor, inicia sesión.");
    navigate('/login');
    return;
  }

  // 2. Construcción del objeto Gasto
  // Aseguramos que las relaciones sean objetos con ID, como Spring espera
  const gasto = {
    descripcion,
    fecha,
    valor: parseFloat(valor) || 0,
    imagen,
    tipoNecesidad,
    frecuenciaGasto,
    lugarConsumo,
    medioVerificacion,
    gradoNecesidad: gradoNecesidad.toString(),
    
    usuario: { id: parseInt(usuarioId) },
    categoria: categoriaId ? { id: parseInt(categoriaId) } : null,
    medioPago: medioPagoId ? { id: parseInt(medioPagoId) } : null,
    comercio: comercioId ? { id: parseInt(comercioId) } : null
  };

  // 3. Envío al backend
  try {
    const response = await fetch(`http://localhost:8080/api/crumbs/gastos/usuario/${usuarioId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(gasto)
    });

    if (!response.ok) {
      // Si el servidor responde con 404 o 500, capturamos el mensaje
      const errorText = await response.text();
      throw new Error(errorText || "Error al registrar el gasto. Revisa los datos.");
    }

    alert('¡Gasto registrado con éxito!');
    navigate('/dashboard'); 
    
  } catch (error) {
    console.error("Error en el registro:", error);
    alert('No se pudo guardar: ' + error.message);
  }
};


  return (

    <div className="form-viewport">

      <header className="form-header">

        <div className="header-info">
          <span className="pulse-dot"></span>
          <p>MÓDULO DE ANÁLISIS FINANCIERO</p>
        </div>

        <button
          className="btn-panel"
          onClick={() => navigate('/dashboard')}
        >
          VOLVER AL PANEL
        </button>

      </header>

      <main className="horizontal-container">

        <form className="horizontal-form" onSubmit={handleSubmit}>

          {/* ================================= */}
          {/* INFORMACIÓN GENERAL */}
          {/* ================================= */}

          <div className="form-section">

            <div className="section-tag">
              01. INFORMACIÓN GENERAL
            </div>

           <div className="input-group">

              <label>LUGAR DE CONSUMO</label>

              <input
                type="text"
                placeholder="Ej: Supermercado"
                value={lugarConsumo}
                onChange={(e) => setLugarConsumo(e.target.value)}
                required
              />

            </div>


            <div className="input-group">

              <label>DESCRIPCIÓN</label>

              <input
                type="text"
                placeholder="Ej: Compra de café"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />

            </div>

            <div className="input-group">

              <label>FECHA</label>

              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />

            </div>

            <div className="input-group">

              <label>PRESUPUESTO ACTUAL</label>

           <input
              type="number"
              placeholder="Dinero disponible"
              value={presupuestoAntes} // <--- Verifica que sea exactamente este nombre
              onChange={(e) => setPresupuestoAntes(e.target.value)}/>

            </div>

            <div className="input-group">

              <label>VALOR DEL GASTO</label>

              <input
                type="number"
                placeholder="0"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />

            </div>

        
            <div className="input-group">

              <label>IMAGEN (URL)</label>

              <input
                type="text"
                placeholder="https://..."
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />

            </div>

          </div>

          {/* ================================= */}
          {/* CLASIFICACIÓN */}
          {/* ================================= */}

          <div className="form-section">

            <div className="section-tag">
              02. CLASIFICACIÓN
            </div>

            <div className="input-group">

              <label>TIPO DE NECESIDAD</label>

              <select
                value={tipoNecesidad}
                onChange={(e) => setTipoNecesidad(e.target.value)}
                required
              >

                <option value="">Seleccione</option>
                <option value="Necesario">Necesario</option>
                <option value="Deseo">Deseo</option>
                <option value="Impulso">Impulso</option>

              </select>

            </div>

            <div className="input-group">

              <label>FRECUENCIA DEL GASTO</label>

              <select
                value={frecuenciaGasto}
                onChange={(e) => setFrecuenciaGasto(e.target.value)}
                required
              >

                <option value="">Seleccione</option>
                <option value="Diario">Diario</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Esporádico">Esporádico</option>

              </select>

            </div>

           <div className="input-group">
            <label>CATEGORÍA</label>
            <select 
              value={categoriaId} 
              onChange={(e) => setCategoriaId(e.target.value)} 
              required
            >
              <option value="">Seleccione categoría</option>
              {listaCategorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

           <div className="input-group">
              <label>MEDIO DE PAGO</label>
             <select
              value={medioPagoId}
              onChange={(e) => setMedioPagoId(e.target.value)}
              required
            >
              <option value="">Seleccione</option>
             {listaMediosPago?.map((medio) => (
              <option key={medio.id} value={medio.id}>
                {medio?.nombre ?? 'Sin nombre'}
              </option>
            ))}
            </select>
            </div>

         <div className="input-group">
          <label>COMERCIO</label>
          <select 
            value={comercioId} 
            onChange={(e) => setComercioId(e.target.value)} 
            required
          >
            <option value="">Seleccione</option>
            {Array.isArray(listaComercios) && listaComercios.map((comercio) => (
              <option key={comercio.id} value={comercio.id}>
                {comercio.nombre}
              </option>
            ))}
          </select>
        </div>

            <div className="input-group">

              <label>MEDIO DE VERIFICACIÓN</label>

              <select
                value={medioVerificacion}
                onChange={(e) => setMedioVerificacion(e.target.value)}
                required
              >

                <option value="">Seleccione</option>
                <option value="Factura">Factura</option>
                <option value="Recibo">Recibo</option>
                <option value="Ninguno">Ninguno</option>

              </select>

            </div>

            <div className="input-group">

              <label>GRADO DE NECESIDAD (1-5)</label>

              <input
                type="number"
                min="1"
                max="5"
                value={gradoNecesidad}
                onChange={(e) => setGradoNecesidad(e.target.value)}
                required
              />

            </div>

          </div>

          {/* ================================= */}
          {/* ANÁLISIS */}
          {/* ================================= */}

          <div className="form-section">

            <div className="section-tag">
              03. IMPACTO FINANCIERO
            </div>

       

            <div className="input-group">

              <label>SALDO RESTANTE</label>

              <input
                type="text"
                readOnly
                className="readonly-input"
                value={
                  saldoRestante < 0
                    ? `DEUDA: $${Math.abs(saldoRestante).toLocaleString()}`
                    : `$${saldoRestante.toLocaleString()}`
                }
                style={{
                  color: saldoRestante < 0 ? '#ff453a' : '#d4af37'
                }}
              />

            </div>

            <div className="input-group">

              <label>NIVEL DE RIESGO</label>

              <input
                type="text"
                readOnly
                className="readonly-input"
                value={riesgo}
              />

            </div>

            <button type="submit" className="btn-submit">
              REGISTRAR GASTO
            </button>

          </div>

        </form>
      </main>
    </div>
  );
}
