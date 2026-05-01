import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importaciones basadas en tu arquitectura de carpetas
import Home from './pages/home';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Ruta Raíz: Ahora la Home es lo primero que se verá al abrir localhost:5173 */}
        <Route path="/" element={<Home />} />

        {/* 2. Ruta de Login: Accesible cuando el usuario haga clic en "Iniciar Sesión" */}
        <Route path="/login" element={<Login />} />

        {/* 3. Ruta de Registro: Espacio para tu futuro componente de registro */}
        <Route path="/registro" element={
          <div style={{ backgroundColor: '#05070a', minHeight: '100vh' }}>
            {/* Aquí conectarás tu página de registro más adelante */}
          </div>
        } />

        {/* 4. Ruta de Dashboard: Espacio para el panel de control */}
        <Route path="/dashboard" element={
          <div style={{ backgroundColor: '#05070a', minHeight: '100vh' }}>
            {/* Aquí conectarás tu panel de control de activos */}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;