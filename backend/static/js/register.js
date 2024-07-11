document.addEventListener("DOMContentLoaded", function() {
    const crearUsuarioButton = document.getElementById("btn-crear-usuario");

    crearUsuarioButton.addEventListener("click", async function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const birthday = document.getElementById("birthday").value;
        const role = document.getElementById("role").value;

        // Validación de campos vacíos
        if (!username || !password || !email || !birthday || !role) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        const body = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
            role: role
        };

        try {
            const response = await authenticatedFetch('/api/register/', 'POST', body);
            if (response.ok) {
                alert('Usuario creado exitosamente');
                location.reload();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Hubo un error al crear el usuario: ' + (error.message || error));
        }
    });
});


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
        const refreshResponse = await fetch('/api/token/refresh/', {
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

    return response;
}
