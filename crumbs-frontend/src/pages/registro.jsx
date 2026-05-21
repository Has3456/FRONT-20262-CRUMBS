import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/registro.css';
import { registrarUsuario } from '../services/api';

export default function Registro() {
  // 1. Estado inicial con todos los campos del backend
  const [formData, setFormData] = useState({
    nombres: '',
    email: '',
    contraseña: '',
    tipoDocumento: '',
    documento: '',
    edad: '',
    ocupacionPrincipal: '',
    nivelSocioeconomico: '',
    rangoIngresosMensuales: '',
    ubicacionGeografica: '',
    genero: '',
    motivo: ''
  });

  const navigate = useNavigate();

  // Manejador de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 2. Lógica de registro conectada al backend
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registrarUsuario({
        ...formData,
        edad: parseInt(formData.edad)
      });
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      navigate('/login');
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar: verifica que los datos sean correctos.");
    }
  };

  return (
    <div className="register-body-context">
      <div className="background-overlay">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
      </div>

      <main className="main-wrapper">
        <header className="brand-hero">
          <h1 className="main-logo-white">CRUMBS</h1>
          <div className="slogan-container">
            <div className="decorator-line"></div>
            <p className="main-slogan">Unete al hormiguero</p>
            <div className="decorator-line"></div>
          </div>
        </header>

        <section className="content-layout">
          <div className="auth-panel-wide">
            <div className="panel-accent-top"></div>
            <div className="panel-header">
              <div className="crumb-light"></div>
              <h2>REGISTRO</h2>
              <p>Comienza tu camino financiero</p>
            </div>

            <form id="registerForm" onSubmit={handleRegister}>
              <div className="form-grid-extra-wide">
                <div className="input-group">
                  <label><span className="dot"></span>NOMBRE COMPLETO</label>
                  <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>EMAIL</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>CONTRASEÑA</label>
                  <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>TIPO DOCUMENTO</label>
                  <input type="text" name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>DOCUMENTO</label>
                  <input type="text" name="documento" value={formData.documento} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>EDAD</label>
                  <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>OCUPACIÓN</label>
                  <input type="text" name="ocupacionPrincipal" value={formData.ocupacionPrincipal} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>NIVEL SOCIOECONÓMICO</label>
                  <input type="text" name="nivelSocioeconomico" value={formData.nivelSocioeconomico} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>RANGO INGRESOS</label>
                  <input type="text" name="rangoIngresosMensuales" value={formData.rangoIngresosMensuales} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>UBICACIÓN</label>
                  <input type="text" name="ubicacionGeografica" value={formData.ubicacionGeografica} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label><span className="dot"></span>GÉNERO</label>
                  <select name="genero" value={formData.genero} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
                <div className="input-group full-width">
                  <label><span className="dot"></span>¿POR QUÉ ELEGISTE CRUMBS?</label>
                  <select name="motivo" value={formData.motivo} onChange={handleChange} required className="dark-select">
                    <option value="" disabled>Selecciona una opción...</option>
                    <option value="ahorro">Quiero empezar a ahorrar de verdad</option>
                    <option value="seguridad">Busco un sistema de seguridad para mis activos</option>
                    <option value="control">Necesito rastrear mis "migajas"</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="action-btn">
                CREAR CUENTA
                <div className="shimmer-effect"></div>
              </button>
            </form>

            <div className="panel-footer">
              <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}