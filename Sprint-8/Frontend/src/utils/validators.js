// Validación de email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validación de contraseña
export const isValidPassword = (password) => {
    // Mínimo 8 caracteres, al menos una letra mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

// Validación de número de tarjeta
export const isValidCardNumber = (cardNumber) => {
    // Algoritmo de Luhn
    const digits = cardNumber.replace(/\D/g, '');
    
    if (digits.length !== 16) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
};

// Validación de CVV
export const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
};

// Validación de fecha de expiración
export const isValidExpiryDate = (month, year) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
};

// Validación de monto
export const isValidAmount = (amount, min = 0, max = Infinity) => {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount >= min && numAmount <= max;
};

// Validación de número de cuenta
export const isValidAccountNumber = (accountNumber) => {
    return /^\d{10,12}$/.test(accountNumber);
};

// Validación de número de teléfono
export const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber.replace(/\D/g, ''));
};

// Validación de campos requeridos
export const isRequired = (value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return value !== null;
    return value !== undefined && value !== null && value.toString().trim() !== '';
};

// Validación de longitud
export const isValidLength = (value, min, max) => {
    const length = value.toString().length;
    return length >= min && length <= max;
};

// Validación de transferencia
export const validateTransfer = (transferData) => {
    const errors = {};

    if (!isValidAccountNumber(transferData.destinationAccount)) {
        errors.destinationAccount = 'Número de cuenta inválido';
    }

    if (!isValidAmount(transferData.amount, 1)) {
        errors.amount = 'Monto inválido';
    }

    if (!isRequired(transferData.description)) {
        errors.description = 'La descripción es requerida';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};