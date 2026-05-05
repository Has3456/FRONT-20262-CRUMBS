import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de Páginas
import Home from './pages/home';
import Login from './pages/login';
import Registro from './pages/registro';
import { Dashboard } from './pages/Dashboard'; 
import { Historial } from './pages/Historial'; 
import { CrearGasto } from './pages/CrearGasto'; // Importación del nuevo componente

// Importación de Estilos Globales
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Página de aterrizaje (Landing Page) */}
        <Route path="/" element={<Home />} />
        
        {/* 2. Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* 3. Panel de Control Principal */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 3.5. Crear Gasto - Módulo de Análisis */}
        <Route path="/crear-gasto" element={<CrearGasto />} />

        {/* 4. Vista de Historial Detallado */}
        <Route path="/historial" element={<Historial />} />

        {/* Opcional: Ruta para manejar errores 404 */}
        <Route path="*" element={
          <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Ruta no encontrada</h1>
            <a href="/" style={{ color: '#ffd700' }}>Volver al inicio</a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;