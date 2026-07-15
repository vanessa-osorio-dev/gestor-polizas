const API_URL = "http://localhost:3000";

function cargarPolizas(filtroEstado = '') {
    fetch(`${API_URL}/polizas`)
        .then(response => response.json())
        .then(polizas => {
            if (filtroEstado) {
                polizas = polizas.filter(p => p.estado === filtroEstado);
            }
            mostrarPolizas(polizas);
        })
        .catch(error => console.error('Error:', error));
}

function estadoBadgeClass(estado) {
    const mapping = {
        renovada: 'status-renovada',
        vigente: 'status-vigente',
        vencida: 'status-vencida',
        por_vencer: 'status-por_vencer'
    };

    return mapping[estado] || 'text-bg-secondary';
}

function mostrarPolizas(polizas) {
    const tbody = document.getElementById('tbodyResultado');
    tbody.innerHTML = '';

    polizas.forEach(poliza => {
        const row = document.createElement('tr');
        row.id = `row-${poliza.id_poliza}`;

        const estadoClass = `badge rounded-pill status-badge ${estadoBadgeClass(poliza.estado)}`;
        const estadoTexto = (poliza.estado || '').replace(/_/g, ' ');

        row.innerHTML = `
            <td id="id-${poliza.id_poliza}">${poliza.id_poliza}</td>
            <td id="cliente-${poliza.id_poliza}">${poliza.nombre_cliente || poliza.id_cliente}</td>
            <td id="fecha-${poliza.id_poliza}">${poliza.fecha_inicio}</td>
            <td id="tipo-${poliza.id_poliza}">${poliza.id_tipo_poliza}</td>
            <td id="vencimiento-${poliza.id_poliza}">${poliza.fecha_vencimiento}</td>
            <td><span class="${estadoClass}">${estadoTexto}</span></td>
            <td class="text-nowrap">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="habilitarEdicion('${poliza.id_poliza}')">Editar</button>
                <button class="btn btn-sm btn-outline-success me-1" onclick="toggleGestion('${poliza.id_poliza}')">+ gestión</button>
                            
                <button id="guardar-${poliza.id_poliza}" class="btn btn-sm btn-warning" onclick="guardarEdicion('${poliza.id_poliza}')" style="display:none">Guardar</button>
            </td>
        `;
        tbody.appendChild(row);

        const gestionRow = document.createElement('tr');
        gestionRow.id = `form-gestion-${poliza.id_poliza}`;
        gestionRow.classList.add('gestion-row');
        gestionRow.style.display = 'none';
        gestionRow.innerHTML = `
            <td colspan="7">
                <div class="gestion-panel">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                        <div>
                            <h3 class="h6 fw-semibold mb-1">Nueva gestión de la póliza</h3>
                            <p class="text-secondary mb-0">Registra el seguimiento comercial o administrativo asociado a esta póliza.</p>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary" onclick="toggleGestion('${poliza.id_poliza}')">Cancelar</button>
                    </div>

                    <div class="row g-3">
                        <div class="col-12 col-md-3">
                            <label class="form-label">Tipo de contacto</label>
                            <select class="form-select" id="tipo_contacto-${poliza.id_poliza}">
                                <option value="LLAMADA">LLAMADA</option>
                                <option value="EMAIL">EMAIL</option>
                                <option value="PRESENCIAL">PRESENCIAL</option>
                                <option value="WHATSAPP">WHATSAPP</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-3">
                            <label class="form-label">Resultado</label>
                            <select class="form-select" id="resultado-${poliza.id_poliza}">
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="RENOVADO">RENOVADO</option>
                                <option value="NO_INTERESADO">NO INTERESADO</option>
                                <option value="SIN_RESPUESTA">SIN RESPUESTA</option>
                                <option value="VOLVER_LLAMAR">VOLVER A LLAMAR</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-3">
                            <label class="form-label">Próxima acción</label>
                            <input type="date" class="form-control" required id="proxima-accion-${poliza.id_poliza}">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Comentario</label>
                            <textarea class="form-control" id="comentario-${poliza.id_poliza}" rows="3" required></textarea>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-3">
                        <button class="btn btn-success" onclick="guardarGestion('${poliza.id_poliza}')">Guardar gestión</button>
                    </div>
                </div>
            </td>
        `;
        tbody.appendChild(gestionRow);
     
    });
}

function toggleGestion(id_poliza) {
    const form = document.getElementById(`form-gestion-${id_poliza}`);
    form.style.display = form.style.display === 'none' ? 'table-row' : 'none';
}



async function guardarGestion(id_poliza) {
    const tipo = document.getElementById(`tipo_contacto-${id_poliza}`).value;
    const resultado = document.getElementById(`resultado-${id_poliza}`).value;
    const comentario = document.getElementById(`comentario-${id_poliza}`).value;
    const proxima_accion = document.getElementById(`proxima-accion-${id_poliza}`).value;
    const fecha = new Date().toISOString().split('T')[0];

    if (!tipo) {
        alert('El tipo de contacto es obligatorio');
        return;
    }
    if (!resultado) {
        alert('El resultado es obligatorio');
        return;
    }
    if (!comentario.trim()) {
        alert('El comentario es obligatorio');
        return;
    }

    const res = await fetch(`${API_URL}/gestiones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_poliza,
            tipo_contacto: tipo,
            resultado,
            comentario,
            proxima_accion,
            fecha_gestion: fecha
        })
    });

    if (res.ok) {
        alert('Gestión guardada correctamente');
        toggleGestion(id_poliza);
    } else {
        const data = await res.json();
        alert('Error al guardar la gestión: ' + data.error);
    }
}

function habilitarEdicion(id_poliza) {
    const campos = ['fecha', 'vencimiento'];

    campos.forEach(campo => {
        const celda = document.getElementById(`${campo}-${id_poliza}`);
        const valor = celda.textContent;
        celda.innerHTML = `<input type="text" class="form-control form-control-sm" id="input-${campo}-${id_poliza}" value="${valor}">`;
    });

    document.querySelector(`#row-${id_poliza} button:first-child`).style.display = 'none';
    document.getElementById(`guardar-${id_poliza}`).style.display = 'inline-block';
}

function guardarEdicion(id_poliza) {
    const data = {
        fecha_inicio: document.getElementById(`input-fecha-${id_poliza}`).value,
        fecha_vencimiento: document.getElementById(`input-vencimiento-${id_poliza}`).value
    };

    fetch(`${API_URL}/polizas/${id_poliza}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        cargarPolizas();
    })
    .catch(error => {
        console.error('Error al guardar:', error);
        alert('Error al guardar los cambios');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnFiltrar').addEventListener('click', () => {
        const estado = document.getElementById('inputEstado').value.trim();
        if (estado) {
            cargarPolizas(estado);
        } else {
            alert('Por favor, ingrese un estado para filtrar');
        }
    });

    document.getElementById('btnLimpiar').addEventListener('click', () => {
        document.getElementById('inputEstado').value = '';
        const tbody = document.getElementById('tbodyResultado');
        tbody.innerHTML = '';
        cargarPolizas();
    });

    cargarPolizas();
});
