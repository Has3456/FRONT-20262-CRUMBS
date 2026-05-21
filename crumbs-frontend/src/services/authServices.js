// src/services/authServices.js
import { api } from './api'; // Importamos la URL base de tu api.js

const SESSION_KEY = "usuarioLogeado";

export const login = async (email, password) => {
    try {
        const respuesta = await fetch(`${api.usuarios}/login`, { // Ajusta esta ruta a tu controlador
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña: password })
        });

        if (!respuesta.ok) throw new Error("Credenciales inválidas");

        const usuario = await respuesta.json();
        
        // Guardamos el usuario en localStorage para mantener la sesión
        localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
        return usuario;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem(SESSION_KEY);
};

export const getSession = () => {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
};