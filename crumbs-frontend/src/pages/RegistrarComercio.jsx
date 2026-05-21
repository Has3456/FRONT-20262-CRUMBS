import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/categoria.css'; // Reutilizamos tu CSS de formulario

export const RegistrarComercio = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nit: '',
        nombre: '',
        actividad: '',
        contacto: '',
        segmentoMercado: 'Retail',
        canalVenta: 'Presencial',
        fidelizacionActiva: false,
        calificacionConfianza: 5,
        frecuenciaRecurrencia: 1
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  const usuarioId = localStorage.getItem('usuarioId');

  if (!usuarioId) {
    alert("Error de sesión. Inicia sesión de nuevo.");
    navigate('/login');
    return;
  }

  // Ahora enviamos el formData que ya tienes en el estado
  // Además, incluimos el usuario para que la relación se cree bien
  const comercioParaEnviar = {
    ...formData,
    usuario: { id: parseInt(usuarioId) }
  };

  try {
    const response = await fetch(`http://localhost:8080/api/crumbs/comercios/usuario/${usuarioId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comercioParaEnviar)
    });

    if (!response.ok) {
      throw new Error("Error al registrar el comercio");
    }

    alert('¡Comercio registrado con éxito!');
    navigate('/dashboard'); // O donde quieras redirigir
  } catch (error) {
    console.error("Error:", error);
    alert('Error al guardar: ' + error.message);
  }
};



    return (
        <div className="form-viewport">
            <div className="form-header">
                <div className="header-info"><div className="pulse-dot"></div> NUEVO COMERCIO</div>
            </div>

            <form className="horizontal-form" onSubmit={handleSubmit}>
                <section className="form-section">
                    <div className="section-tag">DATOS IDENTIFICATIVOS</div>
                    <div className="input-group">
                        <label>NIT</label>
                        <input name="nit" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Nombre del Comercio</label>
                        <input name="nombre" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Actividad Económica</label>
                        <input name="actividad" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Contacto</label>
                        <input name="contacto" onChange={handleChange} />
                    </div>
                </section>

                <section className="form-section">
                    <div className="section-tag">PERFIL COMERCIAL</div>
                    <div className="input-group">
                        <label>Segmento de Mercado</label>
                        <select name="segmentoMercado" onChange={handleChange}>
                            <option value="Retail">Retail</option>
                            <option value="Servicios">Servicios</option>
                            <option value="Tecnologia">Tecnología</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Fidelización Activa</label>
                        <input type="checkbox" name="fidelizacionActiva" onChange={handleChange} style={{width: 'auto'}} />
                    </div>
                    <div className="input-group">
                        <label>Calificación Confianza (1-5)</label>
                        <input type="number" name="calificacionConfianza" min="1" max="5" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn-submit">REGISTRAR COMERCIO</button>
                </section>
            </form>
        </div>
    );
};