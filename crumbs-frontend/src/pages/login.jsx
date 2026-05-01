import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; 

// Importación de componentes reutilizables según tu arquitectura
import Input from '../components/input';
import Button from '../components/buttom'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Lógica de autenticación con LocalStorage
    const usuarios = JSON.parse(localStorage.getItem('crumbs_users')) || [];
    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioValido) {
      setLoading(true);
      
      // Registro de sesión
      localStorage.setItem('user_session', JSON.stringify({
        nombre: usuarioValido.nombre,
        email: usuarioValido.email,
        loginTime: new Date()
      }));

      // Redirección al Dashboard tras éxito
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1000);
    } else {
      alert("Acceso denegado. Las credenciales no coinciden con nuestros registros.");
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Navegación de retorno a la Web Principal */}
      <button className="back-to-dash" onClick={() => navigate('/')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>PÁGINA PRINCIPAL</span>
      </button>

      {/* Capas decorativas de fondo (Glows) */}
      <div className="background-overlay">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
      </div>

      <div className="main-wrapper">
        {/* Sección de Marca y Slogan */}
        <header className="brand-hero">
          <h1 className="main-logo">Crumb's</h1>
          <div className="slogan-container">
            <span className="decorator-line"></span>
            <p className="main-slogan">Rastrea las migajas y salva tu fortuna</p>
            <span className="decorator-line"></span>
          </div>
        </header>

        <div className="content-layout">
          {/* Formulario de Autenticación */}
          <section className="auth-panel">
            <div className="panel-accent-top"></div> 
            
            <div className="panel-header">
              <div className="crumb-light"></div>
              <h2>IDENTIFICACIÓN</h2>
              <p>Sistema de Seguridad de Activos</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <Input 
                label="ID DE USUARIO" 
                type="email" 
                placeholder="usuario@indhaven.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                label="CLAVE DE SEGURIDAD" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Mantener sesión activa
                </label>
                <a href="#" className="forgot-link">¿Olvidaste tu clave?</a>
              </div>

              <Button text={loading ? "ACCEDIENDO..." : "DESBLOQUEAR"} />

              {/* Sección de Registro de cuenta */}
              <div className="auth-footer">
                <p>¿No posees una credencial de acceso?</p>
                <button 
                  type="button" 
                  className="register-link" 
                  onClick={() => navigate('/registro')}
                >
                  SOLICITAR REGISTRO
                </button>
              </div>
            </form>
          </section>

          {/* Enjambre de iconos decorativos (Crumb Items) */}
          <aside className="swarm-collage">
            <div className="enjambre-container">
              <div className="crumb-item item-1">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
                </svg>
                <span>CAFÉ</span>
              </div>
              <div className="crumb-item item-2">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M7 15h.01M11 15h2"/>
                </svg>
                <span>STREAMING</span>
              </div>
              <div className="crumb-item item-3">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span>ANTOJOS</span>
              </div>
              <div className="crumb-item item-4">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34M9.29 20a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0Zm11.02 0a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0Z"/>
                </svg>
                <span>DELIVERY</span>
              </div>
              <div className="crumb-item item-5">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="m12 3-1.912 5.813L4 9l5.813 1.912L12 21l1.912-5.813L20 15l-5.813-1.912z"/>
                </svg>
                <span>LUJOS</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}