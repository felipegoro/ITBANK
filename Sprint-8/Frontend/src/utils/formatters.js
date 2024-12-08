// Formateo de moneda
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

// Formateo de fechas
export const formatDate = (date, format = 'long') => {
    const dateObj = new Date(date);
    
    const formats = {
        long: { 
            dateStyle: 'long',
            timeStyle: 'short'
        },
        short: { 
            dateStyle: 'short'
        },
        time: {
            timeStyle: 'short'
        }
    };

    return new Intl.DateTimeFormat('es-ES', formats[format]).format(dateObj);
};

// Formateo de número de cuenta
export const formatAccountNumber = (accountNumber) => {
    if (!accountNumber) return '';
    return `****${accountNumber.slice(-4)}`;
};

// Formateo de número de tarjeta
export const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
};

// Formateo de porcentaje
export const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
};

// Formateo de nombre completo
export const formatFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`.trim();
};

// Formateo de número de teléfono
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

// Formateo de estado de transacción
export const formatTransactionStatus = (status) => {
    const statusMap = {
        pending: 'Pendiente',
        completed: 'Completada',
        failed: 'Fallida',
        cancelled: 'Cancelada'
    };
    return statusMap[status] || status;
};

// Formateo de tipo de transacción
export const formatTransactionType = (type) => {
    const typeMap = {
        deposit: 'Depósito',
        withdrawal: 'Retiro',
        transfer: 'Transferencia',
        payment: 'Pago'
    };
    return typeMap[type] || type;
};