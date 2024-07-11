document.addEventListener("DOMContentLoaded", () => {
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');
    const scoreElement = document.getElementById('score');
    const successElement = document.getElementById('success');
    const errorsElement = document.getElementById('errors');
    const timeElement = document.getElementById('time');
    const restartButton = document.getElementById('restart');
    const FirstStartButton = document.getElementById('firstStart');
    const backdrop = document.getElementById('backdrop');
    const retryStart = document.getElementById('retryStart');
    const resultBackdrop = document.getElementById('resultBackdrop');
    const finalScore = document.getElementById('finalScore');
    const backToApp = document.getElementById('backToApp');
    const backToAppArrow = document.getElementById('backToAppArrow');

    let selectedLeft = null;
    let data = {};
    let timerInterval;
    let timeRemaining = 60;
    let roundNumber = 0;
    let unitId = 0;

    const mytoken = getTokenFromUrl('token');
    const myrefresh = getTokenFromUrl('refresh');
    
    initializeData();

    async function login(username, password) {
        const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
    }

    async function authenticatedFetch(url, method = 'GET', body = null) {
        let accessToken = mytoken;
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: body ? JSON.stringify(body) : null,
        };
        
        let response = await fetch(url, options);
        console.log(response);
        if (response.status === 401) {
            const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: myrefresh }),
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

    function initializeData() {
        const unitData = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop) }).unit_id;

        unitId = unitData;
        
        fetchSignals(unitData);
        fetchScore();
    }

    function fetchSignals(unitData) {
        authenticatedFetch('http://127.0.0.1:8000/api/signals/?unit_id=' + unitData)
            .then(jsonData => {
                data = jsonData;
            })
            .catch(error => console.error('Error loading signals:', error));
    }

    async function fetchScore() {
        try {
            const scores = await authenticatedFetch('http://127.0.0.1:8000/api/scores/');
            const totalScore = scores.length > 0 ? scores[0]['score'] : 0;
            scoreElement.textContent = totalScore;
            roundNumber = scores.length;
        } catch (error) {
            console.error('Error fetching score:', error);
        }
    }

    function saveScore(success, errors) {
        roundNumber += 1;
        const totalScore = parseInt(scoreElement.textContent) + success;
        const newScore = {
            game: 1,
            hits: success,
            time: 60 - timeRemaining,
            errors: errors
        };

        authenticatedFetch('http://127.0.0.1:8000/api/round-history/', 'POST', newScore)
            .then(data => fetchScore())
            .catch(error => console.error('Error saving score:', error));
    }

    function startGame() {
        backdrop.style.display = "none";
        resultBackdrop.style.display = "none";

        resetScore();
        resetTimer();
        fillContainers();
        startTimer();
        leftColumn.addEventListener('click', handleLeftClick);
        rightColumn.addEventListener('click', handleRightClick);
    }

    function resetGame() {
        resetScore();
        resetTimer();
        fillContainers();
        leftColumn.removeEventListener('click', handleLeftClick);
        rightColumn.removeEventListener('click', handleRightClick);
    }

    function resetScore() {
        successElement.textContent = 0;
        errorsElement.textContent = 0;
    }

    function resetTimer() {
        timeRemaining = 60;
        timeElement.textContent = timeRemaining;
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeRemaining -= 1;
            timeElement.textContent = timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        const success = parseInt(successElement.textContent);
        const errors = parseInt(errorsElement.textContent);
        
        let totalAttempts = success + errors;
        let accuracy = success / totalAttempts;

        const imgBien = "http://127.0.0.1:8000/media/bien.png";
        const imgRegular = "http://127.0.0.1:8000/media/meh.png";
        const imgMal = "http://127.0.0.1:8000/media/mal.png";
        
        resultBackdrop.style.display = "block";

        if (accuracy < 0.5) {
            let container = document.querySelectorAll('.sign-icon')[1]
            let imgElement = document.createElement('img');
            imgElement.src = imgMal;
            imgElement.alt = "Descripción de la imagen";
            imgElement.width = 100;
            container.innerHTML = '';
            container.appendChild(imgElement);
        } else if (accuracy >= 0.5 && accuracy < 0.8) {
            let container = document.querySelectorAll('.sign-icon')[1]
            let imgElement = document.createElement('img');
            imgElement.src = imgRegular;
            imgElement.alt = "Descripción de la imagen";
            imgElement.width = 100;
            container.innerHTML = '';
            container.appendChild(imgElement);
        } else {
            let container = document.querySelectorAll('.sign-icon')[1]
            let imgElement = document.createElement('img');
            imgElement.src = imgBien;
            imgElement.alt = "Descripción de la imagen";
            imgElement.width = 100;
            container.innerHTML = '';
            container.appendChild(imgElement);
        }

        

        finalScore.innerHTML = success;
        saveScore(success, errors);
        resetGame();
    }

    function shuffle(my_array) {
        for (let i = my_array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [my_array[i], my_array[j]] = [my_array[j], my_array[i]];
        }
        return my_array;
    }

    function fillContainers() {
        const shuffledSignals = shuffle([...data.signals]);
        const shuffledResponses = shuffle([...data.responses]);
    
        const signalsSubset = shuffledSignals.slice(0, 4);
        let responsesSubset = shuffledResponses.slice(0, 4);
    
        // Seleccionar un elemento común aleatoriamente
        const commonElementIndex = Math.floor(Math.random() * signalsSubset.length);
        const commonElement = signalsSubset[commonElementIndex];
    
        // Asegurarse de que el elemento común esté en responsesSubset
        const newResponses = responsesSubset.filter(response => response.id !== commonElement.id);
        const replaceIndex = Math.floor(Math.random() * newResponses.length);
    
        responsesSubset = [
            ...newResponses.slice(0, replaceIndex),
            { id: commonElement.id, name: data.responses.find(response => response.id === commonElement.id).name },
            ...newResponses.slice(replaceIndex)
        ];
    
        const signalElements = document.querySelectorAll('.signal');
        const responseElements = document.querySelectorAll('.response');
    
        for (let i = 0; i < signalElements.length; i++) {
            signalElements[i].style.backgroundImage = "url(" + signalsSubset[i].image + ")";
            signalElements[i].style.backgroundPosition = "center";
            signalElements[i].style.backgroundSize = "contain";
            signalElements[i].setAttribute("item", signalsSubset[i].id);
    
            responseElements[i].innerHTML = responsesSubset[i].name;
            responseElements[i].setAttribute("item", responsesSubset[i].id);
        }
    }

    function handleLeftClick(event) {
        handleClick(event, 'left');
    }

    function handleRightClick(event) {
        handleClick(event, 'right');
    }

    function handleClick(event, column) {
        if (timeRemaining <= 0) return; // Ignore clicks if time is up

        const target = event.target;

        if (column === 'left') {
            if (selectedLeft === target) {
                selectedLeft = null;
                removeHighlight();
            } else {
                selectedLeft = target;
                highlightSelected(target, column);
            }
        } else if (column === 'right' && selectedLeft) {
            if (selectedLeft === target) {
                selectedLeft = null;
                removeHighlight();
            } else {
                if (compareElements(selectedLeft, target)) {
                    updateScore('success');
                } else {
                    updateScore('errors');
                }
                fillContainers();
                selectedLeft = null;
                removeHighlight();
            }
        }
    }

    function highlightSelected(element, column) {
        removeHighlight();
        element.classList.add('selected');
    }

    function removeHighlight() {
        const selectedElements = document.querySelectorAll('.selected');
        selectedElements.forEach(el => el.classList.remove('selected'));
    }

    function compareElements(left, right) {
        const leftColumn = left.getAttribute("item");
        const rightColumn = right.getAttribute("item");
        
        return leftColumn === rightColumn;
    }

    function updateScore(type) {
        const score = parseInt(scoreElement.textContent);
        const success = parseInt(successElement.textContent);

        if (type === 'success') {
            successElement.textContent = success + 1;
            scoreElement.textContent = score + 1;
        } else if (type === 'errors') {
            errorsElement.textContent = parseInt(errorsElement.textContent) + 1;
        }
    }

    const backtoAppFunction = () => {
        location.href = "http://localhost:6969/browser/stage/" + unitId;
    }

    restartButton.addEventListener('click', startGame);
    FirstStartButton.addEventListener('click', startGame);
    retryStart.addEventListener('click', startGame);

    backToApp.addEventListener('click', backtoAppFunction);

    function decodeBase64UrlSafe(base64String) {
        // Reemplazar caracteres no estándar
        const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
        
        // Añadir padding si es necesario
        const padding = base64.length % 4 === 0 ? '' : '==='.slice(0, 4 - (base64.length % 4));
        const base64Padded = base64 + padding;

        // Convertir base64 a Uint8Array
        const binaryString = window.atob(base64Padded);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Decodificar bytes a texto usando TextDecoder
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    function getTokenFromUrl(name) {
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search);
        const data = urlParams.get(name);
        return data;

        if (data) {
            try {
                const decodedString = decodeBase64UrlSafe(data);
                return decodedString;
            } catch (e) {
                console.error('Error decoding Base64 string:', e);
                return null;
            }
        }
        return null;
    }
});
