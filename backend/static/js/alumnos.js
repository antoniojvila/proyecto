// Datos de prueba de alumnos, unidades y completed
const alumnosData = [
    {
        name: "Alumno 1",
        nivel: 5,
        unidades: [
            { nombre: "Unidad 1", average: 100, completed: [true, true, true] },
            { nombre: "Unidad 2", average: 50, completed: [true, false, true] }
        ]
    },
];
 

function getTokenFromUrl(name) {
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    const data = urlParams.get(name);
    return data;
}


const mytoken = getTokenFromUrl('token');
const myrefresh = getTokenFromUrl('refresh');

async function authenticatedFetch(url, method = 'GET', body = null) {
    let accessToken = localStorage.getItem('access_token');
    if(accessToken == null){
        accessToken = mytoken;
    }

    const refreshToken = localStorage.getItem('refresh_token');
    if(refreshToken == null){
        refreshToken = myrefresh;
    }

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
        body: body ? JSON.stringify(body) : null,
    };

    let response = await fetch(url, options);

    if (response.status === 401) {
        const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!refreshResponse.ok) {
            throw new Error('Failed to refresh token');
        }

        const refreshData = await refreshResponse.json();
        localStorage.setItem('access_token', refreshData.access);
        accessToken = refreshData.access;

        options.headers['Authorization'] = 'Bearer ' + accessToken;
        response = await fetch(url, options);
    }

    return response.json();
}

function getAlumnosData(url) {
    return authenticatedFetch(url);
}




// Elementos del DOM
const buscarAlumnoInput = document.getElementById("buscar-alumno");
const listaAlumnosDiv = document.getElementById("lista-alumnos");
//const promedioUnidadesP = document.getElementById("promedio-unidades");
//const promedioNivelP = document.getElementById("promedio-nivel");

// Funciones para calcular estadísticas
function calcularPromedioUnidadesCompletadas(alumnos) {
    const totalUnidades = alumnos.reduce((acc, alumno) => acc + alumno.units.length, 0);
    const totalaverage = alumnos.reduce((acc, alumno) => acc + alumno.units.reduce((accU, unidad) => accU + unidad.average, 0), 0);
    return (totalaverage / totalUnidades).toFixed(2);
}

function calcularPromedioNivel(alumnos) {
    const totalNivel = alumnos.reduce((acc, alumno) => acc + alumno.nivel, 0);
    return (totalNivel / alumnos.length).toFixed(2);
}

// Funciones para mostrar datos en la interfaz
function mostrarEstadisticas(alumnos) {
    promedioUnidadesP.textContent = `Promedio de unidades completadas: ${calcularPromedioUnidadesCompletadas(alumnos)}%`;
    promedioNivelP.textContent = `Promedio de nivel de alumnos: ${calcularPromedioNivel(alumnos)}`;
}

function mostrarAlumnos(alumnos) {
    listaAlumnosDiv.innerHTML = alumnos.map(alumno => `
        <div class="alumno">
            <h2 class="toggle-alumno">${alumno.username} (Nivel: ${alumno.level})</h2>
            <div class="unidades" style="display:none;">
                <ul>
                    ${alumno.units.map(unidad => `
                        <li>
                            <h3 class="toggle-unidad">${unidad.name} - ${unidad.average}% completado</h3>
                            <div class="completed" style="display:none;">
                                <ul>
                                    ${unidad.lessons.map((completed, index) => `<li>Lección ${index + 1}: ${completed ? 'Completada' : 'No completada'}</li>`).join('')}
                                </ul>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // Agregar eventos de toggle a los elementos generados
    document.querySelectorAll('.toggle-alumno').forEach(elem => {
        elem.addEventListener('click', () => {
            const unidadesDiv = elem.nextElementSibling;
            unidadesDiv.style.display = unidadesDiv.style.display === 'none' ? 'block' : 'none';
        });
    });

    document.querySelectorAll('.toggle-unidad').forEach(elem => {
        elem.addEventListener('click', () => {
            const completedDiv = elem.nextElementSibling;
            completedDiv.style.display = completedDiv.style.display === 'none' ? 'block' : 'none';
        });
    });
}

// Función para filtrar alumnos
function filtrarAlumnos(busqueda, alumnos) {
    return alumnos.filter(alumno => alumno.name.toLowerCase().includes(busqueda.toLowerCase()));
}

// Evento de búsqueda
buscarAlumnoInput.addEventListener("input", () => {
    const busqueda = buscarAlumnoInput.value;
    const alumnosFiltrados = filtrarAlumnos(busqueda, alumnosData);
    mostrarAlumnos(alumnosFiltrados);
    //mostrarEstadisticas(alumnosFiltrados);
});

function pintarDatos(url) {

    getAlumnosData(url).then(alumnosData => {
        if (alumnosData) {
            mostrarAlumnos(alumnosData);
        }
    });

    
    //mostrarEstadisticas(alumnosData);
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    const url = `http://127.0.0.1:8000/api/alumnos-by-profesor/`;
    pintarDatos(url);
});
