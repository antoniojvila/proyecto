document.addEventListener("DOMContentLoaded", function() {
    const modalEliminar = document.getElementById("modal-eliminar");
    const modalEditar = document.getElementById("modal-editar");
    const closeButtons = document.querySelectorAll(".close");
    const btnEliminarCancel = document.getElementById("btn-eliminar-cancel");
    const btnEditarCancel = document.getElementById("btn-editar-cancel");
    const buscarUsuarioInput = document.getElementById("buscar-usuario");
    const modalEditarTitle = modalEditar.querySelector("h2");
    const btnEditarConfirm = document.getElementById("btn-editar-confirm");

    let currentUserId;  // Variable para almacenar el ID del usuario actual para editar
    let users = [];  // Variable para almacenar la lista de usuarios

    // Cerrar modales
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            modalEliminar.style.display = "none";
            modalEditar.style.display = "none";
        });
    });

    btnEliminarCancel.addEventListener("click", () => {
        modalEliminar.style.display = "none";
    });

    btnEditarCancel.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == modalEliminar) {
            modalEliminar.style.display = "none";
        }
        if (event.target == modalEditar) {
            modalEditar.style.display = "none";
        }
    };

    // Filtrar usuarios
    buscarUsuarioInput.addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    });

    // Obtener y cargar los usuarios
    async function loadUsers() {
        try {
            const response = await authenticatedFetch('http://localhost:8000/api/manage/users/?role=profesor', 'GET');
            users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        }
    }

    function displayUsers(users) {
        const userList = document.getElementById("user-list");
        userList.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");

            const usernameCell = document.createElement("td");
            usernameCell.textContent = user.username;
            row.appendChild(usernameCell);

            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            const actionsCell = document.createElement("td");
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.addEventListener("click", () => openEditarModal(user.id, user.username, user.email, user.birthday));
            actionsCell.appendChild(btnEditar);

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.addEventListener("click", () => openEliminarModal(user.id));
            actionsCell.appendChild(btnEliminar);

            row.appendChild(actionsCell);
            userList.appendChild(row);
        });
    }

    loadUsers();

    function openEliminarModal(userId) {
        modalEliminar.style.display = "block";
        document.getElementById("btn-eliminar-confirm").onclick = async function() {
            try {
                const response = await authenticatedFetch(`http://localhost:8000/api/manage/users/${userId}/`, 'DELETE');
                if (response.ok) {
                    alert('Usuario eliminado exitosamente');
                    loadUsers();
                } else {
                    throw new Error('Error al eliminar el usuario');
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                alert('Hubo un error al eliminar el usuario');
            }
            modalEliminar.style.display = "none";
        };
    }

    function openEditarModal(userId, username, email, birthday) {
        currentUserId = userId;
        modalEditar.style.display = "block";
        modalEditarTitle.textContent = `Editar Usuario: ${username}`;
        document.getElementById("editar-username").value = username;
        document.getElementById("editar-email").value = email;
        document.getElementById("editar-birthday").value = birthday ? birthday.split('T')[0] : '';

        btnEditarConfirm.onclick = async function() {
            const updatedUsername = document.getElementById("editar-username").value;
            const updatedEmail = document.getElementById("editar-email").value;
            const updatedPassword = document.getElementById("editar-password").value;
            const updatedBirthday = document.getElementById("editar-birthday").value;

            const body = {};
            if (updatedUsername) body.username = updatedUsername;
            if (updatedEmail) body.email = updatedEmail;
            if (updatedPassword) body.password = updatedPassword;
            if (updatedBirthday) body.birthday = updatedBirthday;

            try {
                const response = await authenticatedFetch(`http://localhost:8000/api/manage/users/${currentUserId}/edit/`, 'PATCH', body);
                if (response.ok) {
                    alert('Usuario actualizado exitosamente');
                    loadUsers();
                } else {
                    throw new Error('Error al actualizar el usuario');
                }
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                alert('Hubo un error al actualizar el usuario');
            }
            modalEditar.style.display = "none";
        };
    }

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
});
