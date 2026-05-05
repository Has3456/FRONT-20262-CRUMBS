import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/perfil.css';

 

export const Perfil = () => {

  const navigate = useNavigate();

 

  // Estados del usuario

  const [usuario, setUsuario] = useState({

    nombre: '',

    email: '',

    avatar: 'https://via.placeholder.com/150/0a0c10/d4af37?text=SUBIR_FOTO'

  });

 

  // Estados de estadísticas

  const [stats, setStats] = useState({

    ahorroTotal: 0,

    migajasCount: 0,

    rank: 'RANGO: RECLUTA',

    lastSync: '---'

  });

 

  const [feedback, setFeedback] = useState("SINCRONIZAR EXPEDIENTE");

 

  useEffect(() => {

    // 1. Cargar datos del usuario

    const savedUser = JSON.parse(localStorage.getItem('currentUser')) || {

      nombre: "Operador Desconocido",

      email: "sin_enlace@crumbs.com",

      avatar: null

    };

    

    if (savedUser.avatar) {

      setUsuario(savedUser);

    } else {

      setUsuario({ ...savedUser, avatar: 'https://via.placeholder.com/150/0a0c10/d4af37?text=SUBIR_FOTO' });

    }

 

    // 2. Calcular estadísticas desde otros módulos

    const gastos = JSON.parse(localStorage.getItem('crumbs_db')) || [];

    const metas = JSON.parse(localStorage.getItem('crumbs_metas')) || [];

 

    const ahorro = metas.reduce((acc, item) => acc + item.actual, 0);

    const conteoGastos = gastos.length;

 

    // Lógica de Rango

    let rangoCalculado = "RANGO: RECLUTA";

    if (ahorro > 1000000) rangoCalculado = "RANGO: MAESTRO ESTRATEGA";

    else if (ahorro > 500000) rangoCalculado = "RANGO: OPERADOR ELITE";

 

    setStats({

      ahorroTotal: ahorro,

      migajasCount: conteoGastos,

      rank: rangoCalculado,

      lastSync: new Date().toLocaleTimeString()

    });

  }, []);

 

  // Manejo de la foto de perfil (Base64)

  const handleAvatarChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = (event) => {

        setUsuario({ ...usuario, avatar: event.target.result });

      };

      reader.readAsDataURL(file);

    }

  };

 

  // Guardar cambios

  const handleSave = () => {

    localStorage.setItem('currentUser', JSON.stringify(usuario));

    

    setFeedback("EXPEDIENTE SINCRONIZADO");

    setTimeout(() => setFeedback("SINCRONIZAR EXPEDIENTE"), 2000);

  };

 

  return (

    <div className="profile-viewport">

      <header className="profile-header">

        <div className="header-left">

          <div className="status-box">

            <span className="pulse-dot-gold"></span>

            <span>EXPEDIENTE_ID: CRUMB-{usuario.nombre.substring(0,3).toUpperCase()}</span>

          </div>

          <h1>PERFIL DEL <span className="gold">OPERADOR</span></h1>

        </div>

        <button className="btn-tactic-titilante" onClick={() => navigate('/dashboard')}>

          VOLVER AL PANEL

        </button>

      </header>

 

      <div className="profile-layout">

        <aside className="profile-sidebar">

          <div className="avatar-container">

            <div className="avatar-frame" onClick={() => document.getElementById('input-avatar').click()}>

              <img src={usuario.avatar} alt="Avatar Operador" />

              <div className="hover-overlay">CAMBIAR AVATAR</div>

            </div>

            <input

              type="file"

              id="input-avatar"

              accept="image/*"

              style={{ display: 'none' }}

              onChange={handleAvatarChange}

            />

            <div className="rank-badge">{stats.rank}</div>

          </div>

 

          <div className="user-info-card">

            <div className="input-group">

              <label>NOMBRE CLAVE / DESIGNACIÓN</label>

              <input

                type="text"

                value={usuario.nombre}

                onChange={(e) => setUsuario({...usuario, nombre: e.target.value})}

                placeholder="Ingrese su nombre"

              />

            </div>

            <div className="input-group">

              <label>CORREO DE ENLACE</label>

              <input

                type="email"

                value={usuario.email}

                onChange={(e) => setUsuario({...usuario, email: e.target.value})}

                placeholder="correo@ejemplo.com"

              />

            </div>

            <p className="info-helper">Los cambios se sincronizarán con la base de datos local.</p>

            <button

                className="btn-update"

                onClick={handleSave}

                style={{ background: feedback === "EXPEDIENTE SINCRONIZADO" ? "#30d158" : "#d4af37" }}

            >

                {feedback}

            </button>

          </div>

        </aside>

 

        <main className="performance-panel">

          <div className="panel-label">MÉTRICAS_DE_EXTRACCIÓN_GLOBAL</div>

 

          <div className="stats-grid">

            <div className="stat-card">

              <span className="stat-title">AHORRO TOTAL ACUMULADO</span>

              <span className="stat-value gold">$ {stats.ahorroTotal.toLocaleString()}</span>

            </div>

            <div className="stat-card">

              <span className="stat-title">EFECTIVIDAD DE MISIÓN</span>

              <span className="stat-value" style={{ color: '#30d158' }}>

                {stats.ahorroTotal > 0 ? '85%' : '0%'}

              </span>

            </div>

            <div className="stat-card">

              <span className="stat-title">MIGAJAS DETECTADAS (LOGS)</span>

              <span className="stat-value">{stats.migajasCount}</span>

            </div>

          </div>

 

          <div className="achievements-section">

            <div className="panel-label">CONDECORACIONES_Y_LOGROS</div>

            <div className="achievements-grid">

              <div className={`achievement ${stats.ahorroTotal > 0 ? '' : 'locked'}`}>

                <div className="icon">🎯</div>

                <span>PRIMER AHORRO</span>

              </div>

              <div className={`achievement ${stats.migajasCount > 5 ? '' : 'locked'}`}>

                <div className="icon">🛡️</div>

                <span>MAESTRO RADAR</span>

              </div>

              <div className={`achievement ${stats.ahorroTotal >= 1000000 ? '' : 'locked'}`}>

                <div className="icon">💎</div>

                <span>MILLONARIO</span>

              </div>

              <div className="achievement">

                <div className="icon">🚀</div>

                <span>DEUDA CERO</span>

              </div>

            </div>

          </div>

 

          <div className="data-footer">

            <span className="data-code">DATA_ENCRYPTION: AES-256-ACTIVE</span>

            <span className="data-code">LAST_SYNC: {stats.lastSync}</span>

          </div>

        </main>

      </div>

    </div>

  );

};