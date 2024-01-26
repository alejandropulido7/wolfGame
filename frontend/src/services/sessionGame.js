import axios from 'axios';


async function createSession(codeSession, idHost, configGame) {
    try {
        const response = await axios.post(`http://localhost:5000/api/sessions`, {
            codeSession,
            idHost,
            configGame
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getSession(idHost) {
    try {
        const response = await axios.get(`http://localhost:5000/api/sessions?idHost=${idHost}`); // Reemplaza con la URL de tu backend
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export {getSession, createSession}