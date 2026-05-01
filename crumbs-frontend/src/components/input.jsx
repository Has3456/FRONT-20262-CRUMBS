import React from 'react';

/**
 * Componente de Input reutilizable para Crumb's
 * @param {string} label - El texto que aparece arriba del campo
 * @param {string} type - email, password, text, etc.
 * @param {string} placeholder - El texto de ayuda dentro del campo
 * @param {string} value - El valor actual (conectado al estado de React)
 * @param {function} onChange - La función que actualiza el valor cuando el usuario escribe
 */
export default function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <label>
        <span className="dot"></span> {label}
      </label>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        required 
        spellCheck="false" 
        autoComplete="off"
      />
    </div>
  );
}