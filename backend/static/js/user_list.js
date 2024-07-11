document.addEventListener("DOMContentLoaded", function() {
    const modalReasignar = document.getElementById("modal-reasignar");
    const modalEliminar = document.getElementById("modal-eliminar");
    const modalEditar = document.getElementById("modal-editar");
    const closeButtons = document.querySelectorAll(".close");
    const btnReasignarCancel = document.getElementById("btn-reasignar-cancel");
    const btnEliminarCancel = document.getElementById("btn-eliminar-cancel");
    const btnEditarCancel = document.getElementById("btn-editar-cancel");
    const buscarUsuarioInput = document.getElementById("buscar-usuario");
    const modalReasignarTitle = modalReasignar.querySelector("h2");
    const btnReasignarConfirm = document.getElementById("btn-reasignar-confirm");
    const modalEditarTitle = modalEditar.querySelector("h2");
    const btnEditarConfirm = document.getElementById("btn-editar-confirm");

    let currentUserId;  // Variable para almacenar el ID del usuario actual para reasignar/editar
    let users = [];  // Variable para almacenar la lista de usuarios

    // Cerrar modales
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            modalReasignar.style.display = "none";
            modalEliminar.style.display = "none";
            modalEditar.style.display = "none";
        });
    });

    btnReasignarCancel.addEventListener("click", () => {
        modalReasignar.style.display = "none";
    });

    btnEliminarCancel.addEventListener("click", () => {
        modalEliminar.style.display = "none";
    });

    btnEditarCancel.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == modalReasignar) {
            modalReasignar.style.display = "none";
        }
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
            const response = await authenticatedFetch('http://localhost:8000/api/manage/users/', 'GET');
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

            const profesorCell = document.createElement("td");
            profesorCell.textContent = user.profesor ? user.profesor : "N/A";
            row.appendChild(profesorCell);

            const actionsCell = document.createElement("td");
            const btnReasignar = document.createElement("button");
            btnReasignar.textContent = user.profesor ? "Reasignar" : "Asignar";
            btnReasignar.addEventListener("click", () => openReasignarModal(user.id, user.username, !!user.profesor));
            actionsCell.appendChild(btnReasignar);

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

    async function openReasignarModal(userId, username, hasProfesor) {
        currentUserId = userId;
        modalReasignar.style.display = "block";
        modalReasignarTitle.textContent = hasProfesor ? `Reasignar Profesor a ${username}` : `Asignar Profesor a ${username}`;
        btnReasignarConfirm.textContent = hasProfesor ? "Reasignar" : "Asignar";
        try {
            const response = await authenticatedFetch('http://localhost:8000/api/profesores/', 'GET');
            const profesores = await response.json();
            const profesorSelect = document.getElementById("profesor-select-modal");
            profesorSelect.innerHTML = "";

            profesores.forEach(profesor => {
                const option = document.createElement("option");
                option.value = profesor.id;
                option.textContent = profesor.username;
                profesorSelect.appendChild(option);
            });

            // Buscar profesor en el modal
            const buscarProfesorInput = document.getElementById("buscar-profesor-modal");
            buscarProfesorInput.addEventListener("input", function() {
                const searchTerm = this.value.toLowerCase();
                const filteredProfesores = profesores.filter(profesor =>
                    profesor.username.toLowerCase().includes(searchTerm)
                );

                profesorSelect.innerHTML = "";
                filteredProfesores.forEach(profesor => {
                    const option = document.createElement("option");
                    option.value = profesor.id;
                    option.textContent = profesor.username;
                    profesorSelect.appendChild(option);
                });
            });

            document.getElementById("btn-reasignar-confirm").onclick = async function() {
                const selectedProfesorId = profesorSelect.value;
                try {
                    const response = await authenticatedFetch(`http://localhost:8000/api/manage/users/${currentUserId}/reassign/`, 'PATCH', { profesor: selectedProfesorId });
                    if (response.ok) {
                        alert('Profesor reasignado exitosamente');
                        loadUsers();
                    } else {
                        throw new Error('Error al reasignar el profesor');
                    }
                } catch (error) {
                    console.error('Error al reasignar el profesor:', error);
                    alert('Hubo un error al reasignar el profesor');
                }
                modalReasignar.style.display = "none";
            };
        } catch (error) {
            console.error('Error al cargar los profesores:', error);
        }
    }

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
                const response = await authenticatedFetch(`http://localhost:8000/api/manage/users/${currentUserId}/edit/`, 'PUT', body);
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
            const refreshResponse = await fetch('/api/token/refresh/', {
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

        return response;
    }
});
