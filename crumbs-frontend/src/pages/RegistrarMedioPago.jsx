import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/categoria.css';

export const RegistrarMedioPago = () => {
    const navigate = useNavigate();
    
    // 1. He añadido fechaCreacion al estado inicial
    const [formData, setFormData] = useState({
        nombre: '',
        justificacion: '',
        responsable: '',
        naturalezaGasto: 'Fijo',
        comportamientoEsperado: 'Ahorro',
        periodicidadSugerida: 'Mensual',
        claseConsumo: 'Producto',
        limiteOperativo: '',
        fechaCreacion: new Date().toISOString().slice(0, 16) // Formato para input datetime-local
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Recuperamos el ID real desde el localStorage
    const usuarioId = localStorage.getItem('usuarioId'); 

    // Validación de seguridad: Si no hay ID, el usuario no está "logueado"
    if (!usuarioId) {
        alert("Error de sesión: Debes iniciar sesión para realizar esta acción.");
        navigate('/login'); // Redirigir al login si no hay sesión
        return;
    }

    // 2. Preparamos el objeto para enviar
    const datosAEnviar = {
        ...formData,
        limiteOperativo: parseFloat(formData.limiteOperativo) || 0,
        // Aseguramos que la fecha tenga el formato correcto para Java LocalDateTime
        fechaCreacion: formData.fechaCreacion.includes('T') 
                       ? formData.fechaCreacion.replace('T', 'T') + ":00" 
                       : formData.fechaCreacion + ":00" 
    };

    try {
        // 3. Enviamos la petición al backend incluyendo el usuarioId en la URL
        const response = await fetch(`http://localhost:8080/api/crumbs/medios_pago/usuario/${usuarioId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosAEnviar)
        });

        // 4. Manejo de errores de servidor
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error al guardar el medio de pago');
        }

        // 5. Éxito: Feedback visual y redirección
        alert("¡Medio de pago registrado exitosamente!");
        navigate('/dashboard'); // Redirección a tu dashboard

    } catch (error) {
        console.error("Error detallado:", error);
        alert("No se pudo guardar: " + error.message);
    }
};

    return (
        <div className="form-viewport">
            <div className="form-header">
                <div className="header-info">
                    <div className="pulse-dot"></div> NUEVO MEDIO DE PAGO
                </div>
            </div>

            <form className="horizontal-form" onSubmit={handleSubmit}>
                <section className="form-section">
                    <div className="section-tag">INFO BÁSICA</div>
                    <div className="input-group">
                        <label>Nombre del Medio</label>
                        <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    {/* 3. Nuevo campo de fecha editable */}
                    <div className="input-group">
                        <label>Fecha de Creación</label>
                        <input 
                            type="datetime-local" 
                            name="fechaCreacion" 
                            value={formData.fechaCreacion} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Responsable</label>
                        <input name="responsable" value={formData.responsable} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Límite Operativo</label>
                        <input type="number" name="limiteOperativo" value={formData.limiteOperativo} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Justificación</label>
                        <textarea name="justificacion" value={formData.justificacion} onChange={handleChange} />
                    </div>
                </section>

                <section className="form-section">
                    <div className="section-tag">CONFIGURACIÓN TÁCTICA</div>
                    <div className="input-group">
                        <label>Naturaleza</label>
                        <select name="naturalezaGasto" value={formData.naturalezaGasto} onChange={handleChange}>
                            <option value="Fijo">Fijo</option>
                            <option value="Variable">Variable</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Comportamiento</label>
                        <select name="comportamientoEsperado" value={formData.comportamientoEsperado} onChange={handleChange}>
                            <option value="Ahorro">Ahorro</option>
                            <option value="Control">Control</option>
                            <option value="Libre">Libre</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Periodicidad</label>
                        <select name="periodicidadSugerida" value={formData.periodicidadSugerida} onChange={handleChange}>
                            <option value="Mensual">Mensual</option>
                            <option value="Semanal">Semanal</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Clase de Consumo</label>
                        <select name="claseConsumo" value={formData.claseConsumo} onChange={handleChange}>
                            <option value="Producto">Producto</option>
                            <option value="Servicio">Servicio</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-submit">GUARDAR MEDIO</button>
                </section>
            </form>
        </div>
    );
};