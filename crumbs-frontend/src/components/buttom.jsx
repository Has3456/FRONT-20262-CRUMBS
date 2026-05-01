import React from 'react';

/**
 * Componente de Botón de Acción para Crumb's
 * @param {string} text - El texto que mostrará el botón (ej: "DESBLOQUEAR")
 * @param {function} onClick - La función que se ejecutará al hacer clic
 * @param {string} type - Por defecto es "submit" para formularios
 */
export default function Button({ text, onClick, type = "submit" }) {
  return (
    <button 
      type={type} 
      className="action-btn" 
      onClick={onClick}
    >
      <span>{text}</span>
      {/* Este es el efecto de brillo animado que definiste en tu CSS */}
      <div className="shimmer-effect"></div>
    </button>
  );
}