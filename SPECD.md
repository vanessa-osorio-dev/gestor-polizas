
  # 🛡️ Gestor Polizas

## 📹 Video de demostración

**Loom:** https://www.loom.com/share/32ca5ea543dd4516a967a034c00e9b76

---

# 📖 Análisis del problema

## Contexto

El mes pasado, María, una asesora con aproximadamente **280 clientes activos**, comentó:

> "Tengo toda la información en un archivo de Excel. Cada lunes filtro las pólizas que vencen ese mes, llamo cliente por cliente, marco una columna como 'gestionado' y cuando renuevan actualizo manualmente la fecha. El problema es que el archivo se daña, se duplica, pierdo el contexto de las conversaciones con cada cliente y, cuando una póliza vence sin que me dé cuenta, termino perdiendo ese cliente."

Esta situación evidencia las limitaciones de un proceso completamente manual para administrar la cartera de pólizas.

---

# 🔍 Análisis del problema

Se identificaron los siguientes inconvenientes:

- **Falta de integridad de la información.**
  El archivo de Excel puede dañarse, duplicarse o sobrescribirse.

- **Ausencia de trazabilidad.**
  No existe un historial de las gestiones realizadas a cada cliente.

- **Seguimiento manual de vencimientos.**
  El asesor depende de revisar constantemente el archivo para detectar pólizas próximas a vencer.

- **Pérdida de oportunidades comerciales.**
  La falta de seguimiento oportuno genera pérdida de clientes y disminución de ingresos.

### Conclusión

El problema principal es la utilización de una herramienta no diseñada para gestionar procesos comerciales, lo que provoca pérdida de información, falta de seguimiento y una disminución en la eficiencia operativa.

---

# 💡 Decisión de diseño

Para solucionar el problema se diseñó una aplicación basada en una **base de datos relacional** utilizando **SQLite**, permitiendo:

- Gestión centralizada de clientes.
- Administración de pólizas.
- Seguimiento de renovaciones.
- Historial de gestiones comerciales.
- Conservación de la información.
- Reemplazo del proceso manual realizado en Excel.

El objetivo fue construir una solución sencilla, escalable y fácil de mantener.

---

# 🗄️ Modelo de datos

## Entidades principales

### Asesores

Representa los usuarios del sistema.

Permite que la solución pueda evolucionar a un modelo multiusuario.

### Clientes

Información de las personas aseguradas.

### Tipos de póliza

Catálogo de los diferentes tipos de seguros.

Ejemplo:

- Auto
- Hogar
- Vida

### Pólizas

Almacena la información de cada póliza asociada a un cliente.

### Gestiones

Registra cada interacción realizada con el cliente.

Gracias a esta entidad nunca se pierde el contexto comercial.

---

## 📐 Diagrama Relacional

```text
+-----------------------+
|       asesores        |
+-----------------------+
| id_asesor (PK)        |
| nombre                |
| email                 |
| telefono              |
+-----------------------+
           │
           │ 1 : N
           ▼
+-----------------------+
|       clientes        |
+-----------------------+
| id_cliente (PK)       |
| id_asesor (FK)        |
| nombre                |
| documento             |
| telefono              |
| email                 |
| direccion             |
| fecha_registro        |
+-----------------------+
           │
           │ 1 : N
           ▼
+-----------------------+          +------------------------------+
|       polizas         |          | VIEW poliza_con_estado       |
+-----------------------+          +------------------------------+
| id_poliza (PK)        |--------->| id_poliza                    |
| id_cliente (FK)       |          | id_cliente                   |
| id_tipo_poliza (FK)   |          | id_tipo_poliza              |
| numero_poliza         |          | fecha_inicio                |
| aseguradora           |          | fecha_vencimiento           |
| fecha_inicio          |          | CASE ... END AS estado      |
| fecha_vencimiento     |          | FROM poliza                |
+-----------------------+          +------------------------------+
           │
           │ N : 1
           ▼
+-----------------------+
|    tipos_poliza       |
+-----------------------+
| id_tipo_poliza (PK)   |
| nombre                |
+-----------------------+

           ▲
           │ 1 : N
           │
+-----------------------+
|      gestiones        |
+-----------------------+
| id_gestion (PK)       |
| id_poliza (FK)        |
| fecha_gestion         |
| tipo_contacto         |
| comentario            |
| resultado             |
| proxima_accion        |
+-----------------------+
```

Además se implementó la vista:

**poliza_con_estado**

La cual calcula automáticamente el estado de cada póliza utilizando las fechas registradas.

Estados posibles:

- Vigente
- Por vencer
- Vencida
- Renovada

---

# 🖥️ Interfaz

### Pantalla principal

![Listado de pólizas](docs/image.png)

### Registro de gestiones

![Gestión de pólizas](docs/image-1.png)

---

# ✅ Funcionalidades implementadas

- Consulta de todas las pólizas.
- Filtrado por estado.
- Filtrado por cliente.
- Consulta por identificador.
- Actualización de fechas de vigencia.
- Cálculo automático del estado de la póliza mediante una vista SQL.
- Registro del historial de gestiones comerciales.

---

# 🚀 Mejoras futuras

- Sistema de autenticación.
- Roles y permisos.
- Notificaciones automáticas por correo.
- CRUD completo de clientes y pólizas.
- Dashboard con indicadores.
- Reportes de renovación.
- Búsqueda avanzada.

---

# 🔌 Endpoints

## Clientes

```http
GET /clientes
```

Obtiene todos los clientes.

---

## Pólizas

```http
GET /polizas
```

Obtiene todas las pólizas.

```http
GET /polizas?id_cliente=1
```

Consulta pólizas por cliente.

```http
GET /polizas?id_poliza=2
```

Consulta una póliza específica.

```http
GET /polizas?estado=vencida
```

Filtra por estado.

---

## Actualizar póliza

```http
PUT /polizas/1
```

Ejemplo:

```json
{
    "fecha_inicio":"2025-01-01",
    "fecha_vencimiento":"2025-12-31"
}
```

---

## Registrar gestión

```http
POST /gestiones
```

Ejemplo:

```json
{
  "id_poliza":1,
  "tipo_contacto":"EMAIL",
  "resultado":"RENOVADO",
  "comentario":"Llamar nuevamente",
  "proxima_accion":"2026-06-22",
  "fecha_gestion":"2026-06-22"
}
```