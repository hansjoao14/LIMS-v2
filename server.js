// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// // 🧭 Resolver __dirname en módulos ES
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🧩 Configuración de Keycloak
// const KEYCLOAK_URL = process.env.KEYCLOAK_URL || "http://185.197.251.149:8080";
// const REALM = process.env.KEYCLOAK_REALM || "faq-sgia";
// const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || "api-rest-mer-pacq";
// const CLIENT_SECRET =
//   process.env.KEYCLOAK_SECRET || "dvJXEnMFV6zTX7IliExmHuQhsYzYk8lY";

// // 📦 Helper: solicitar token genérico
// async function requestToken(params) {
//   const url = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params,
//   });

//   const data = await response.json();
//   if (!response.ok)
//     throw new Error(data.error_description || "Error de autenticación");

//   return data;
// }

// // 👤 Login
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ error: "Faltan credenciales" });

//   const params = new URLSearchParams();
//   params.append("grant_type", "password");
//   params.append("client_id", CLIENT_ID);
//   params.append("client_secret", CLIENT_SECRET);
//   params.append("username", username);
//   params.append("password", password);

//   try {
//     const data = await requestToken(params);
//     res.json(data);
//   } catch (err) {
//     console.error("Error en login:", err.message);
//     res.status(401).json({ error: err.message });
//   }
// });

// // 🔁 Refrescar token
// app.post("/refresh", async (req, res) => {
//   const { refresh_token } = req.body;
//   if (!refresh_token)
//     return res.status(400).json({ error: "Falta el refresh_token" });

//   const params = new URLSearchParams();
//   params.append("grant_type", "refresh_token");
//   params.append("client_id", CLIENT_ID);
//   params.append("client_secret", CLIENT_SECRET);
//   params.append("refresh_token", refresh_token);

//   try {
//     const data = await requestToken(params);
//     res.json(data);
//   } catch (err) {
//     console.error("Error al refrescar:", err.message);
//     res.status(401).json({ error: err.message });
//   }
// });

// // 🚪 Logout
// app.post("/logout", async (req, res) => {
//   const { refresh_token } = req.body;
//   if (!refresh_token)
//     return res.status(400).json({ error: "Falta el refresh_token" });

//   const url = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/logout`;

//   const params = new URLSearchParams();
//   params.append("client_id", CLIENT_ID);
//   params.append("client_secret", CLIENT_SECRET);
//   params.append("refresh_token", refresh_token);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: params,
//     });

//     if (!response.ok) throw new Error("No se pudo cerrar sesión");
//     res.json({ message: "Sesión cerrada correctamente " });
//   } catch (err) {
//     console.error("Error en logout:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📦 Servir Angular compilado
// const angularDistPath = path.join(__dirname, "dist/LIMS/browser");
// app.use(express.static(angularDistPath, { maxAge: "1y", etag: false }));

// // 🎯 Fallback SPA (compatible con Express 5)
// app.use((req, res) => {
//   res.sendFile(path.join(angularDistPath, "index.html"));
// });

// // 🚀 Iniciar servidor
// const PORT = process.env.PORT || 5200;
// app.listen(PORT, () => {
//   console.log(` Servidor corriendo en http://localhost:${PORT}`);
//   console.log(`📦 Sirviendo Angular desde: ${angularDistPath}`);
// });


import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// 🧭 Resolver __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 🧩 Configuración de Keycloak
const KEYCLOAK_URL = process.env.KEYCLOAK_URL || "http://173.212.251.64:8080";
const REALM = process.env.KEYCLOAK_REALM || "faq-sgia";
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || "lims_frontend";
const CLIENT_SECRET = process.env.KEYCLOAK_SECRET || "eCi2QiNPfHuTr7BBPGdbs7XQgvGm0HF1";
// Sin CLIENT_SECRET: cliente público (Client authentication: Off)

// 📦 Helper: solicitar token genérico
async function requestToken(params) {
  const url = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error_description || "Error de autenticación");

  return data;
}

// 👤 Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Faltan credenciales" });
  console.log("Login request received for username:", username);
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("username", username);
  params.append("password", password);

  try {
    const data = await requestToken(params);
    res.json(data);
  } catch (err) {
    console.error("Error en login:", err.message);
    res.status(401).json({ error: err.message });
  }
});

// 🔁 Refrescar token
app.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token)
    return res.status(400).json({ error: "Falta el refresh_token" });

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", CLIENT_ID);
  params.append("refresh_token", refresh_token);

  try {
    const data = await requestToken(params);
    res.json(data);
  } catch (err) {
    console.error("Error al refrescar:", err.message);
    res.status(401).json({ error: err.message });
  }
});

// 🚪 Logout
app.post("/logout", async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token)
    return res.status(400).json({ error: "Falta el refresh_token" });

  const url = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/logout`;

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("refresh_token", refresh_token);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!response.ok) throw new Error("No se pudo cerrar sesión");
    res.json({ message: "Sesión cerrada correctamente ✅" });
  } catch (err) {
    console.error("Error en logout:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 📦 Servir Angular compilado
const angularDistPath = path.join(__dirname, "dist/LIMS/browser");
app.use(express.static(angularDistPath, { maxAge: "1y", etag: false }));

// 🎯 Fallback SPA (compatible con Express 5)
app.use((req, res) => {
  res.sendFile(path.join(angularDistPath, "index.html"));
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📦 Sirviendo Angular desde: ${angularDistPath}`);
});
