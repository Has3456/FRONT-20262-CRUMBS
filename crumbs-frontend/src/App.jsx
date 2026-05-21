import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de Páginas
import Home from './pages/home';
import Login from './pages/login';
import Registro from './pages/registro';
import { Dashboard } from './pages/Dashboard'; 
import { Historial } from './pages/Historial'; 
import { CrearGasto } from './pages/CrearGasto';
import { Metas } from './pages/metas';
import { Perfil } from './pages/perfil';

// Nuevas Importaciones (Asegúrate de tener estos archivos en src/pages/)
import { CrearCategoria } from './pages/CrearCategoria';
import { RegistrarMedioPago } from './pages/RegistrarMedioPago';
import { RegistrarComercio } from './pages/RegistrarComercio';



// Importación de Estilos Globales
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Página de aterrizaje */}
        <Route path="/" element={<Home />} />
        
        {/* 2. Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* 3. Panel de Control Principal */}
        <Route path="/dashboard" element={<Dashboard />} />
       
        {/* 4. Operaciones */}
        <Route path="/crear-gasto" element={<CrearGasto />} />
        <Route path="/crear-categoria" element={<CrearCategoria />} />
        <Route path="/registrar-medio-pago" element={<RegistrarMedioPago />} />
        <Route path="/registrar-comercio" element={<RegistrarComercio />} />

        {/* 5. Vistas de Gestión */}
        <Route path="/historial" element={<Historial />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Opcional: Ruta 404 */}
        <Route path="*" element={
          <div style={{ color: '#1a1c20', textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Ruta no encontrada</h1>
            <a href="/" style={{ color: '#d4af37' }}>Volver al inicio</a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;