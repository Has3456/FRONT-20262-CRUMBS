// ============================================================
//  CRUMBS SYSTEM — services/authService.js
//  Conexión Real con la API de Spring Boot (Estructura Fetch)
// ============================================================

// Dejamos la URL BASE directamente en la raíz de la API
const URL_BASE = "http://localhost:8080/api/crumbs";
const SESSION_KEY = "usuarioLogeado";

// Configuramos las URLs mapeando exactamente la ruta de tu Controlador en Spring
export const urlAPI = {
  usuarios: `${URL_BASE}/usuarios`, // http://localhost:8080/api/crumbs/usuarios
};

// ==========================================
// ---------- SECCIÓN DE USUARIOS -----------
// ==========================================

// Función para CREAR un usuario mediante POST (Usada en registro.jsx)
export async function crearUsuario(nuevoUsuario) {
  // Apuntamos exactamente a http://localhost:8080/api/crumbs/usuarios
  const respuesta = await fetch(urlAPI.usuarios, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoUsuario), 
  });

  if (!respuesta.ok) {
    throw new Error(`Error en el servidor: ${respuesta.status}`);
  }
  
  return await respuesta.json();
}

// Función para LEER todos los usuarios mediante GET
export async function getUsuarios() {
  const respuesta = await fetch(urlAPI.usuarios);
  
  if (!respuesta.ok) {
    throw new Error("Error al obtener la lista de usuarios del servidor");
  }
  
  return await respuesta.json();
}

// ==========================================
// ---------- SECCIÓN DE SESIÓN -------------
// ==========================================
export async function login(documento, tipo_documento) {
  try {
    const usuarios = await getUsuarios();
    return usuarios.find(u => u.documento === documento && u.tipo_documento === tipo_documento) || null;
  } catch (error) {
    console.error("Error en el proceso de Login:", error);
    return null;
  }
}

export function setSession(usuario) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
}

export function getSession() {
  try { 
    return JSON.parse(localStorage.getItem(SESSION_KEY)); 
  } catch { 
    return null; 
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}