const URL_BASE = "http://localhost:8080/api/crumbs";

export const urlAPI = {
  usuarios: `${URL_BASE}/usuarios`,
};

export async function registrarUsuario(datosUsuario) {
  const respuesta = await fetch(urlAPI.usuarios, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosUsuario),
  });
  
  if (!respuesta.ok) throw new Error("Error al registrar el usuario");
  return respuesta.json();
}