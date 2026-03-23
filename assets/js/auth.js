const getDB = () => JSON.parse(localStorage.getItem('users_db')) || {};
const saveDB = (db) => localStorage.setItem('users_db', JSON.stringify(db));

function seleccionarMedico(nombre) {
    localStorage.setItem('medico_seleccionado', nombre);
    const session = localStorage.getItem('session');
    if (session) {
        renderDashboard(session);
        window.location.href = "#seccion-login";
    } else {
        window.location.href = "#seccion-login";
        alert("Seleccionaste a " + nombre + ". Inicia sesión para ver el valor de tu bono.");
    }
}

function toggleAuth() {
    document.getElementById('login-box').classList.toggle('hidden');
    document.getElementById('register-box').classList.toggle('hidden');
}

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('reg-username').value.toLowerCase().trim();
    const name = document.getElementById('reg-fullname').value.trim();
    const pass = document.getElementById('reg-password').value;
    const prev = document.getElementById('reg-prevision').value;
    
    let db = getDB();
    if (db[user]) return alert("Usuario ya existe.");

    db[user] = { nombre: name, pass: pass, prevision: prev, recetas: [], citas: [] };
    saveDB(db);
    alert("¡Registro exitoso!");
    toggleAuth();
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.toLowerCase().trim();
    const pass = document.getElementById('password').value;
    const db = getDB();
    if (db[user] && db[user].pass === pass) {
        localStorage.setItem('session', user);
        renderDashboard(user);
    } else { alert("Error en los datos."); }
});

function renderDashboard(userId) {
    const db = getDB();
    const data = db[userId];
    if (!data) return;

    const medicoPendiente = localStorage.getItem('medico_seleccionado');
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
    
    // Calcular valor según previsión
    let valorBono = "$12.990"; // Default Isapre
    if (data.prevision === "FONASA") valorBono = "$3.500";
    if (data.prevision === "DIPRECA") valorBono = "$2.100";

    document.getElementById('user-info-display').innerHTML = `
        <div class="p-3 border rounded bg-white shadow-sm mb-3">
            <h5 class="mb-1 text-dark">${data.nombre}</h5>
            <span class="badge bg-primary">${data.prevision}</span>
            <hr>
            <p class="small mb-0">Estado de Cuenta: <span class="text-success fw-bold">Al día</span></p>
        </div>
    `;

    const agendaDiv = document.getElementById('agenda-selector');
    if (medicoPendiente) {
        agendaDiv.innerHTML = `
            <div class="card border-danger mb-3 shadow">
                <div class="card-body">
                    <h6 class="fw-bold text-danger">🛒 Confirmar Atención</h6>
                    <p class="small mb-2">Especialista: <strong>${medicoPendiente}</strong></p>
                    <p class="small mb-3">Valor Copago (${data.prevision}): <span class="fs-5 fw-bold text-dark">${valorBono}</span></p>
                    
                    <input type="date" id="fecha-cita" class="form-control mb-2" value="2026-03-24">
                    <div class="d-flex gap-2">
                        <button onclick="confirmarCita('09:00')" class="btn btn-danger w-100">Pagar y Agendar 09:00</button>
                        <button onclick="confirmarCita('11:30')" class="btn btn-danger w-100">Pagar y Agendar 11:30</button>
                    </div>
                </div>
            </div>`;
    } else {
        agendaDiv.innerHTML = `<div class="alert alert-light border small text-center">Selecciona un médico para cotizar tu bono.</div>`;
    }

    const listaCitas = (data.citas || []).map(c => 
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>📅 ${c.fecha} - ${c.hora}</span>
            <span class="fw-bold">${c.medico}</span>
        </li>`).join('');

    document.getElementById('lista-recetas').innerHTML = `
        <div class="mt-2">
            <h6 class="fw-bold small text-muted">HISTORIAL DE BONOS PAGADOS</h6>
            <ul class="list-group list-group-flush">${listaCitas || '<li class="list-group-item small">No hay pagos recientes</li>'}</ul>
        </div>`;
}

function confirmarCita(hora) {
    const fecha = document.getElementById('fecha-cita').value;
    const medico = localStorage.getItem('medico_seleccionado');
    const userId = localStorage.getItem('session');
    if (!fecha) return alert("Selecciona fecha");

    let db = getDB();
    db[userId].citas.push({ medico, fecha, hora });
    saveDB(db);
    
    alert("💸 Pago procesado con éxito. Su bono ha sido emitido.");
    localStorage.removeItem('medico_seleccionado');
    renderDashboard(userId);
}

function logout() {
    localStorage.clear();
    location.reload();
}

const sessionActiva = localStorage.getItem('session');
if (sessionActiva) renderDashboard(sessionActiva);
