 export const API_URL = "http://localhost:3000";

export function cargarPolizas(filtroEstado = '') {
    fetch(`${API_URL}/polizas`)
        .then(response => response.json())
        .then(polizas => {
            if (filtroEstado) {
                polizas = polizas.filter(p => p.estado === filtroEstado);
            }
            mostrarPolizas(polizas);
            return polizas;
        })
       
}

export function estadoBadgeClass(estado) {
    const mapping = {
        renovada: 'status-renovada',
        vigente: 'status-vigente',
        vencida: 'status-vencida',
        por_vencer: 'status-por_vencer'
    };

    return mapping[estado] || 'text-bg-secondary';
}

export function mostrarPolizas(polizas) {
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
    });
}

export function init() {
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
}


