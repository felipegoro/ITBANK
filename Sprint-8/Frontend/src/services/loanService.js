import api from './api';

const loanService = {
    getAllLoans: async () => {
        try {
            const response = await api.get('/prestamos/');
            if (!response.data) {
                throw new Error('No se recibieron datos del servidor');
            }
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            if (error.response?.status === 403) {
                throw new Error('No tiene permisos para realizar esta acción. Por favor, inicie sesión nuevamente.');
            }
            if (error.response?.data?.detail) {
                throw new Error(error.response.data.detail);
            }
            throw new Error('Error al obtener los préstamos');
        }
    },

    getLoanTypes: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay sesión activa');
            }
    
            const response = await api.get('/prestamos/tipos-prestamo/');
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            }
            
            // Si no hay datos, usar valores por defecto
            return [
                { id: 1, nombre: 'Préstamo Personal' },
                { id: 2, nombre: 'Préstamo Hipotecario' },
                { id: 3, nombre: 'Préstamo Automotriz' },
                { id: 4, nombre: 'Préstamo de Negocios' }
            ];
        } catch (error) {
            if (error.response?.status === 403) {
                throw new Error('No tiene permisos para realizar esta acción. Por favor, inicie sesión nuevamente.');
            }
            throw error;
        }
    },

    applyForLoan: async (loanData) => {
        try {
            // Validar datos antes de enviar
            if (!loanData.tipo_prestamo || !loanData.monto || !loanData.plazo || !loanData.ingreso_mensual || !loanData.motivo) {
                throw new Error('Por favor, complete todos los campos requeridos');
            }

            // Asegurarse de que los valores numéricos sean números
            const formattedData = {
                ...loanData,
                monto: Number(loanData.monto),
                plazo: Number(loanData.plazo),
                ingreso_mensual: Number(loanData.ingreso_mensual)
            };

            const response = await api.post('/prestamos/', formattedData);
            
            if (!response.data) {
                throw new Error('No se recibieron datos del servidor');
            }

            // Verificar si la respuesta contiene un error
            if (response.data.error) {
                throw new Error(response.data.error);
            }

            return response.data;
        } catch (error) {
            // Error de permisos
            if (error.response?.status === 403) {
                throw new Error('No tiene permisos para realizar esta acción. Por favor, inicie sesión nuevamente.');
            }
            
            // Error de validación del servidor
            if (error.response?.data) {
                if (error.response.data.detail) {
                    throw new Error(error.response.data.detail);
                }
                
                // Formatear errores de validación
                const errors = Object.entries(error.response.data)
                    .map(([key, value]) => {
                        const fieldName = key === 'non_field_errors' ? 'Error' : key;
                        const errorMessage = Array.isArray(value) ? value.join(', ') : value;
                        return `${fieldName}: ${errorMessage}`;
                    })
                    .join('\n');
                
                if (errors) {
                    throw new Error(errors);
                }
            }

            // Error genérico o de red
            throw new Error(error.message || 'Error al solicitar el préstamo. Por favor, intente nuevamente.');
        }
    },

    getLoanById: async (id) => {
        try {
            const response = await api.get(`/prestamos/${id}/`);
            if (!response.data) {
                throw new Error('No se recibieron datos del servidor');
            }
            return response.data;
        } catch (error) {
            if (error.response?.status === 403) {
                throw new Error('No tiene permisos para realizar esta acción. Por favor, inicie sesión nuevamente.');
            }
            if (error.response?.data?.detail) {
                throw new Error(error.response.data.detail);
            }
            throw new Error('Error al obtener el detalle del préstamo');
        }
    }
};

export default loanService;