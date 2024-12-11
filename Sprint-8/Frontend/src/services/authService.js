// Frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Quitamos /api ya que se configura en las urls de Django

const authService = {
    register: async (userData) => {
        return await axios.post(`${API_URL}/clientes/usuarios/`, userData);  // Ajustamos la ruta para incluir la app 'clientes'
    },
    
    login: async (credentials) => {
        return await axios.post(`${API_URL}/clientes/login/`, credentials);
    },
    
    logout: async () => {
        return await axios.post(`${API_URL}/clientes/logout/`);
    }
};

export default authService;