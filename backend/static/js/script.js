// Variables para almacenar los datos
let profesores = [];
let alumnos = [];

// Elementos del DOM
const profesorSelect = document.getElementById("profesor");
const alumnosDisponiblesSelect = document.getElementById("alumnos-disponibles");
const alumnosSeleccionadosSelect = document.getElementById("alumnos-seleccionados");
const buscarProfesorInput = document.getElementById("buscar-profesor");
const buscarAlumnoInput = document.getElementById("buscar-alumno");
const btnAgregarAlumno = document.getElementById("btn-agregar-alumno");
const btnAsignar = document.getElementById("btn-asignar");
const asignacionTitulo = document.getElementById("asignacion-titulo");

async function authenticatedFetch(url, method = 'GET', body = null) {
    let accessToken = localStorage.getItem('access_token');

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
            body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') }),
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

function actualizarEstadoSelect() {
    const privAlumnosDisponiblesSelect = document.getElementById("alumnos-disponibles");

    const privAlumnosSeleccionadosSelect = document.getElementById("alumnos-seleccionados");

    if(privAlumnosDisponiblesSelect.options.length === 0){
        privAlumnosDisponiblesSelect.disabled = true;
    }else{
        privAlumnosDisponiblesSelect.disabled = false;
    }
    
    if(privAlumnosSeleccionadosSelect.options.length === 0){
    
    
        privAlumnosSeleccionadosSelect.disabled = true;
    }else{
        privAlumnosSeleccionadosSelect.disabled = false;
    }
}

// Funciones para cargar y filtrar datos
function cargarDatos() {
    authenticatedFetch('http://localhost:8000/api/profesores/').then(data => {
        profesores = data;
        cargarOpciones(profesorSelect, profesores);
        inicializarBusqueda(buscarProfesorInput, profesores, profesorSelect);
        let  profesorSelectDefault = document.getElementById("profesor");
        let profesorSeleccionadoDefault = profesorSelectDefault.options[profesorSelectDefault.selectedIndex].text;
        asignacionTitulo.textContent = `Se asignará a este profesor: ${profesorSeleccionadoDefault}`;
    });

    authenticatedFetch('http://localhost:8000/api/alumnos-without-profesor/').then(data => {
        alumnos = data;
    
        cargarOpciones(alumnosDisponiblesSelect, alumnos);
        inicializarBusqueda(buscarAlumnoInput, alumnos, alumnosDisponiblesSelect);
        actualizarEstadoSelect();
    });
}

function cargarOpciones(selectElement, opciones) {
    selectElement.innerHTML = opciones.map(opcion => `<option value="${opcion.id}">${opcion.username}</option>`).join('');
}

function filtrarOpciones(inputElement, opciones, selectElement) {
    const busqueda = inputElement.value.toLowerCase();
    const opcionesFiltradas = opciones.filter(opcion => opcion.username.toLowerCase().includes(busqueda));
    cargarOpciones(selectElement, opcionesFiltradas);
}

function inicializarBusqueda(inputElement, opciones, selectElement) {
    inputElement.addEventListener("input", () => filtrarOpciones(inputElement, opciones, selectElement));
}

// Eventos
function inicializarEventos() {
    btnAgregarAlumno.addEventListener("click", () => {
        const opcionesSeleccionadas = Array.from(alumnosDisponiblesSelect.selectedOptions);
        opcionesSeleccionadas.forEach(option => {
        
            alumnosSeleccionadosSelect.add(new Option(option.text, option.value));
            option.remove();
        });
        actualizarEstadoSelect();
    });

    btnAsignar.addEventListener("click", () => {
        const profesorSeleccionado = profesorSelect.value;
        const alumnosSeleccionados = Array.from(alumnosSeleccionadosSelect.options).map(option => option.value);

        if (profesorSeleccionado && alumnosSeleccionados.length > 0) {
            authenticatedFetch('http://localhost:8000/api/asociar-profesor/', 'POST', {
                'alumnos': alumnosSeleccionados,
                'profesor': profesorSeleccionado
            }).then(() => {
                alert(`Alumnos asignados correctamente al profesor ${profesorSelect.textContent}`);
            
                location.reload();
            });
        } else {
            alert("Debe seleccionar un profesor y al menos un alumno.");
        }
    });

    alumnosSeleccionadosSelect.addEventListener("dblclick", (event) => {
        alumnosDisponiblesSelect.add(new Option(event.target.text, event.target.value));
        event.target.remove();
        actualizarEstadoSelect();
    });

    profesorSelect.addEventListener("change", () => {
        const profesorSeleccionado = profesorSelect.options[profesorSelect.selectedIndex].text;
        asignacionTitulo.textContent = `Se asignará a este profesor: ${profesorSeleccionado}`;
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
    inicializarEventos();
});
