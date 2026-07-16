# 🛡️ gestor polizas

Aplicación web Full Stack para la gestión de pólizas de seguros, desarrollada con **HTML**, **CSS**, **JavaScript**, **Node.js**, **Express** y **SQLite**.

El sistema permite administrar clientes, consultar pólizas, actualizar fechas de vigencia y registrar gestiones comerciales mediante una API REST.

> **Nota:** Este proyecto fue desarrollado como parte de una prueba técnica y se publica con fines de portafolio para demostrar mis habilidades en el desarrollo Full Stack.

---

# 🚀 Demo

### 🌐 Frontend

https://gestor-polizas-vanessaosorio.netlify.app/

### ⚙️ Backend (API)

https://gestor-polizas-efai.onrender.com

---

# ✨ Funcionalidades

- Gestión de clientes.
- Consulta de pólizas.
- Búsqueda de pólizas por ID.
- Consulta de pólizas por cliente.
- Filtro por estado de la póliza.
- Actualización de fechas de vigencia.
- Registro de gestiones comerciales.
- API REST desarrollada con Express.
- Base de datos SQLite incluida en el proyecto.

---

# 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- SQLite
- REST API

---

# 📂 Estructura del proyecto

```text
gestor-polizas/
│
├── backend/
│   ├── database/
│   │   └── prueba.db
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── index.html
│
└── README.md
```

---

# 🗄️ Base de datos

El proyecto utiliza una base de datos **SQLite** incluida en el repositorio.

### Tablas

- asesores
- clientes
- tipos_poliza
- poliza
- gestiones

### Vista

- poliza_con_estado

La vista calcula automáticamente el estado de cada póliza:

- Vigente
- Por vencer
- Vencida
- Renovada

---

# 🔌 API

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/clientes` | Obtener todos los clientes |
| GET | `/polizas` | Obtener todas las pólizas |
| PUT | `/polizas/:id` | Actualizar una póliza |
| POST | `/gestiones` | Registrar una gestión |

## Filtros disponibles

```http
GET /polizas?id_cliente=1
```

```http
GET /polizas?id_poliza=10
```

```http
GET /polizas?estado=vigente
```

---

# ⚙️ Instalación

## Clonar el repositorio

```bash
git clone https://github.com/vanessa-osorio-dev/gestor-polizas.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

El servidor se ejecutará en:

```
http://localhost:3000
```

## Frontend

Abrir la carpeta **frontend** utilizando **Live Server** en Visual Studio Code.

---

# 🏗️ Arquitectura

```
                  Usuario
                      │
                      ▼
        Frontend (Netlify)
                      │
              Peticiones HTTP
                      │
                      ▼
        Backend (Render)
                      │
                      ▼
         Base de datos SQLite
```

---

# 📌 Consideraciones

- Compatible con Node.js 22.
- La base de datos SQLite se incluye con datos de ejemplo para facilitar la evaluación del proyecto.


---

## ⚙️ Configuración para desarrollo local

El frontend consume la API mediante la constante `API_URL`.

Para ejecutar el proyecto en tu equipo, asegúrate de que el backend esté iniciado en `http://localhost:3000` y configura la URL de la siguiente manera:

```javascript
export const API_URL = "http://localhost:3000";
```

Para utilizar la aplicación desplegada en producción, cambia la URL por la del backend en Render:

```javascript
export const API_URL = "https://gestor-polizas-efai.onrender.com";
```

Una vez configurada la URL correspondiente, inicia el backend y ejecuta el frontend con **Live Server** en Visual Studio Code.

---


# 👩‍💻 Autor

**Vanessa Osorio Ortiz**

Tecnóloga en Análisis y Desarrollo de Sistemas de Información.

Estudiante de Ingeniería de Software.

GitHub:
https://github.com/vanessa-osorio-dev

---

# 📄 Licencia

Este proyecto se publica únicamente con fines educativos y de portafolio profesional.

© 2026 Vanessa Osorio Ortiz. Todos los derechos reservados.