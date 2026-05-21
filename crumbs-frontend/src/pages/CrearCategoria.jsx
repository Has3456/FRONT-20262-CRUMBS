import React, { useState } from 'react';
import '../styles/categoria.css';

export const CrearCategoria = () => {
    const [categoria, setCategoria] = useState({
        nombre: '',
        justificacion: '',
        responsable: '',
        naturalezaGasto: 'Fijo',
        comportamientoEsperado: 'Ahorro',
        periodicidadSugerida: 'Mensual',
        claseConsumo: 'Producto',
        limiteOperativo: '',
        fechaCreacion: '',// El usuario llenará esto
        Responsable: ''
    });

    const handleChange = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    };

 
    const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = localStorage.getItem('usuarioId');

    // 1. Clonamos el estado para no modificar el original directamente
    const categoriaParaEnviar = { ...categoria };

   
    if (categoriaParaEnviar.fechaCreacion) {
        categoriaParaEnviar.fechaCreacion = categoriaParaEnviar.fechaCreacion + "T00:00:00";
    }

    try {
        const response = await fetch(`http://localhost:8080/api/crumbs/categorias/usuario/${usuarioId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoriaParaEnviar) // Enviamos el objeto con la hora añadida
        });

        if (response.ok) {
            alert("Categoría creada con éxito");
        } else {
            const errorData = await response.json();
            alert("Error al crear: " + errorData.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
};

    return (
        <div className="form-viewport">
            <div className="form-header">
                <div className="header-info"><div className="pulse-dot"></div> NUEVA CATEGORÍA</div>
            </div>
            
            <form className="horizontal-form" onSubmit={handleSubmit}>
                <section className="form-section">
                    <div className="section-tag">INFO BÁSICA</div>
                    <div className="input-group">
                        <label>Nombre</label>
                        <input name="nombre" onChange={handleChange} placeholder="Ej: Alimentación" />
                    </div>
                    <div className="input-group">
                        <label>Justificación</label>
                        <input name="justificacion" onChange={handleChange} placeholder="Motivo del presupuesto" />
                    </div>

                <div className="input-group">
                        <label>Fecha de Creación</label>
                        <input 
                            type="date" 
                            name="fechaCreacion" 
                            onChange={handleChange} 
                            required // Esto lo hace obligatorio automáticamente
                        />
                    </div>


               
                     <div className="input-group">
                        <label>Responsable</label>
                        <input 
                            name="responsable" 
                            onChange={handleChange} 
                            placeholder="Nombre del responsable" 
                        />
                    </div>

                    <div className="input-group">
                        <label>Límite Operativo</label>
                        <input type="number" name="limiteOperativo" onChange={handleChange} placeholder="0.00" />
                    </div>
                </section>

                <section className="form-section">
                    <div className="section-tag">CONFIGURACIÓN</div>
                    <div className="input-group">
                        <label>Naturaleza</label>
                        <select name="naturalezaGasto" onChange={handleChange}>
                            <option value="Fijo">Fijo</option>
                            <option value="Variable">Variable</option>
                        </select>
                    </div>
                    {/* NUEVOS CAMPOS AGREGADOS */}
                    <div className="input-group">
                        <label>Comportamiento</label>
                        <select name="comportamientoEsperado" onChange={handleChange}>
                            <option value="Ahorro">Ahorro</option>
                            <option value="Consumo">Consumo</option>
                            <option value="Inversion">Inversión</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Clase de Consumo</label>
                        <select name="claseConsumo" onChange={handleChange}>
                            <option value="Producto">Producto</option>
                            <option value="Servicio">Servicio</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Periodicidad</label>
                        <select name="periodicidadSugerida" onChange={handleChange}>
                            <option value="Mensual">Mensual</option>
                            <option value="Semanal">Semanal</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-submit">Registrar Categoría</button>
                </section>
            </form>
        </div>
    );
};