import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/registro.css'; // Asegúrate de que el CSS esté en esta ruta

export default function Registro() {
  // Estados para capturar cada campo del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    genero: '',
    password: '',
    motivo: ''
  });

  const navigate = useNavigate();

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Lógica de registro
  const handleRegister = (e) => {
    e.preventDefault();

    // 1. Obtener la lista actual de usuarios o crear una nueva
    const usuariosExistentes = JSON.parse(localStorage.getItem('crumbs_users')) || [];

    // 2. Verificar si el correo ya existe
    const existe = usuariosExistentes.find(u => u.email === formData.email);
    if (existe) {
      alert("Este correo ya está registrado en el hormiguero.");
      return;
    }

    // 3. Agregar el nuevo usuario (con rol automático de usuario)
    const nuevoUsuario = { ...formData, rol: 'usuario' };
    usuariosExistentes.push(nuevoUsuario);

    // 4. Guardar en LocalStorage
    localStorage.setItem('crumbs_users', JSON.stringify(usuariosExistentes));

    alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
    navigate('/login');
  };

  return (
    <div className="register-body-context"> {/* Wrapper opcional por si necesitas aislar estilos */}
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
                  <input 
                    type="text" 
                    name="nombre"
                    placeholder="Ej. Pepito Martinez" 
                    value={formData.nombre}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="input-group">
                  <label><span className="dot"></span>EMAIL</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="tu@email.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="input-group">
                  <label><span className="dot"></span>TELÉFONO</label>
                  <input 
                    type="tel" 
                    name="telefono"
                    placeholder="+57 300 000 0000" 
                    value={formData.telefono}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="input-group">
                  <label><span className="dot"></span>EDAD</label>
                  <input 
                    type="number" 
                    name="edad"
                    placeholder="21" 
                    min="18" 
                    value={formData.edad}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="input-group">
                  <label><span className="dot"></span>GÉNERO</label>
                  <select 
                    className="dark-select" 
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Elegir...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                  </select>
                </div>

                <div className="input-group">
                  <label><span className="dot"></span>CONTRASEÑA</label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>

              </div>

              <div className="input-group full-width">
                <label><span className="dot"></span>¿POR QUÉ ELEGISTE CRUMBS?</label>
                <select 
                  className="dark-select" 
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Selecciona una opción...</option>
                  <option value="ahorro">Quiero empezar a ahorrar de verdad</option>
                  <option value="seguridad">Busco un sistema de seguridad para mis activos</option>
                  <option value="control">Necesito rastrear mis "migajas" (gastos hormiga)</option>
                  <option value="recomendacion">Me lo recomendó un amigo del hormiguero</option>
                </select>
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