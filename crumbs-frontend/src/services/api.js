// src/services/api.js
const URL_BASE = "http://localhost:8080/api/crumbs";

export const api = {
    usuarios: `${URL_BASE}/usuarios`,
    categorias: `${URL_BASE}/categorias`,
    comercios: `${URL_BASE}/comercios`,
    gastos: `${URL_BASE}/gastos`,
    mediosPago: `${URL_BASE}/medios_pago`
};

// --- Ejemplo de funciones para consumir la API ---

export async function registrarUsuario(datos) {
    const response = await fetch(api.usuarios, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    if (!response.ok) throw new Error("Error al registrar");
    return response.json();
}

export async function listarGastos() {
    const response = await fetch(api.gastos);
    if (!response.ok) throw new Error("Error al obtener gastos");
    return response.json();
}

// Puedes seguir añadiendo funciones para categorías, comercios, etc.