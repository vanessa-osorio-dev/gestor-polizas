const express = require('express');

/**
 * Configura las rutas de la API para la gestión de pólizas.
 * @param {Object} db Instancia de la base de datos SQLite.
 * @returns {import('express').Router}
 */
module.exports = (db) => {
    const router = express.Router();

    /**
     * GET /clientes
     * Obtiene todos los clientes.
     */
    router.get('/clientes', (req, res) => {
        try {
            const clientes = db.prepare('SELECT * FROM clientes').all();
            res.json(clientes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los clientes.' });
        }
    });

    /**
     * GET /polizas
     * Consulta pólizas.
     * Filtros opcionales:
     *  - id_poliza
     *  - id_cliente
     *  - estado
     */
    router.get('/polizas', (req, res) => {
        const { id_poliza, id_cliente, estado } = req.query;

        try {

            // Buscar por ID de póliza
            if (id_poliza) {
                const poliza = db.prepare(`
                    SELECT p.*, c.nombre AS nombre_cliente
                    FROM poliza_con_estado p
                    LEFT JOIN clientes c
                        ON p.id_cliente = c.id_cliente
                    WHERE p.id_poliza = ?
                `).get(id_poliza);

                if (!poliza) {
                    return res.status(404).json({
                        error: 'Póliza no encontrada.'
                    });
                }

                return res.json(poliza);
            }

            // Buscar por cliente
            if (id_cliente) {
                const polizas = db.prepare(`
                    SELECT p.*, c.nombre AS nombre_cliente
                    FROM poliza_con_estado p
                    LEFT JOIN clientes c
                        ON p.id_cliente = c.id_cliente
                    WHERE p.id_cliente = ?
                `).all(id_cliente);

                return res.json(polizas);
            }

            // Buscar por estado
            if (estado) {
                const polizas = db.prepare(`
                    SELECT p.*, c.nombre AS nombre_cliente
                    FROM poliza_con_estado p
                    LEFT JOIN clientes c
                        ON p.id_cliente = c.id_cliente
                    WHERE p.estado = ?
                `).all(estado);

                return res.json(polizas);
            }

            // Sin filtros
            const polizas = db.prepare(`
                SELECT p.*, c.nombre AS nombre_cliente
                FROM poliza_con_estado p
                LEFT JOIN clientes c
                    ON p.id_cliente = c.id_cliente
            `).all();

            res.json(polizas);

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Error al consultar las pólizas.'
            });
        }
    });

    /**
     * PUT /polizas/:id
     * Actualiza las fechas de una póliza.
     */
    router.put('/polizas/:id', (req, res) => {

        const { id } = req.params;
        const { fecha_inicio, fecha_vencimiento } = req.body;

        try {

            const stmt = db.prepare(`
                UPDATE poliza
                SET fecha_inicio = ?, fecha_vencimiento = ?
                WHERE id_poliza = ?
            `);

            const result = stmt.run(
                fecha_inicio,
                fecha_vencimiento,
                id
            );

            if (result.changes === 0) {
                return res.status(404).json({
                    error: 'Póliza no encontrada.'
                });
            }

            res.json({
                message: 'Póliza actualizada correctamente.'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Error al actualizar la póliza.'
            });
        }
    });

    /**
     * POST /gestiones
     * Registra una gestión para una póliza.
     */
    router.post('/gestiones', (req, res) => {

        const {
            id_poliza,
            tipo_contacto,
            resultado,
            fecha_gestion,
            comentario,
            proxima_accion
        } = req.body;

        try {

            const stmt = db.prepare(`
                INSERT INTO gestiones (
                    id_gestion,
                    id_poliza,
                    fecha_gestion,
                    tipo_contacto,
                    comentario,
                    resultado,
                    proxima_accion
                )
                VALUES (
                    NULL,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `);

            stmt.run(
                id_poliza,
                fecha_gestion,
                tipo_contacto,
                comentario,
                resultado,
                proxima_accion
            );

            res.status(201).json({
                message: 'Gestión agregada correctamente.'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Error al registrar la gestión.'
            });
        }
    });

    return router;
};
