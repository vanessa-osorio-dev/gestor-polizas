# prueba_polizas

Aplicación para gestión de pólizas con frontend en HTML/CSS/JavaScript y backend en Node.js + Express, usando SQLite como base de datos.

## Estructura del proyecto

- `backend/`: API y acceso a datos.
- `frontend/`: interfaz web.
- `backend/database/prueba.db`: base de datos SQLite usada por el backend.

## Requisitos

- Node.js 22
- npm
- Base de datos SQLite ubicada en `backend/database/prueba.db`
- Navegador web moderno

## Base de datos

El backend trabaja con una base SQLite ya definida. La estructura principal es:

- `asesores`
- `clientes`
- `tipos_poliza`
- `poliza`
- `gestiones`
- `poliza_con_estado` (vista)

### Tablas y vista

- `asesores`: asesores comerciales.
- `clientes`: clientes asociados a un asesor.
- `tipos_poliza`: catálogo de tipos de póliza.
- `poliza`: pólizas de seguros.
- `gestiones`: seguimiento comercial de pólizas.
- `poliza_con_estado`: vista que calcula el estado de la pól automáticamente (vigente, vencida, por_vencer, renovada).

## Instalación y ejecución

### Backend

1. Ir a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor:
   ```bash
   npm run dev
   ```

El servidor se iniciará en el puerto 3000 (o el puerto definido en la variable de entorno `PORT`).

### Frontend

- abrir `frontend/index.html` con un servidor estático, por ejemplo Live Server en VS Code.

Si abres el archivo directamente con doble clic, algunos navegadores pueden bloquear peticiones por CORS o por el protocolo `file://`.

## Endpoints disponibles

- `GET /clientes`
- `GET /polizas`
- `PUT /polizas/:id`
- `POST /gestiones`

### `GET /polizas`

Soporta filtros opcionales por query string:

- `id_poliza`
- `id_cliente`
- `estado`

Ejemplos:

```text
GET /polizas?id_cliente=1
GET /polizas?estado=vigente
GET /polizas?id_poliza=10
```

## Consideraciones importantes

- El proyecto está preparado para correr con Node.js 22.
- El puerto del backend se configura mediante la variable de entorno `PORT` (fallback a 3000).
- La base de datos SQLite está incluida en el proyecto en `backend/database/prueba.db`.

## 📄 Licencia

Este proyecto se publica únicamente con fines educativos y de portafolio profesional.

© 2026 Vanessa Osorio Ortiz. Todos los derechos reservados.