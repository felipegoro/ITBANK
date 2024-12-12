import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Container,
    Paper,
    Alert
} from '@mui/material';
import { createAccount, fetchAccountTypes } from '../../features/accounts/accountThunks';

const AccountForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tipo_cuenta: '',
        moneda: '',
        saldo_inicial: ''
    });
    
    const { isLoading, error } = useSelector(state => state.accounts);
    const accountTypes = useSelector(state => state.accounts.accountTypes);

    useEffect(() => {
        dispatch(fetchAccountTypes());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createAccount(formData)).unwrap();
            navigate('/accounts');
        } catch (err) {
            // El error ya se maneja en el slice
            console.error('Error al crear la cuenta:', err);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper 
                elevation={3} 
                sx={{
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                }}
            >
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom
                    sx={{
                        color: '#1976d2',
                        fontWeight: 600,
                        mb: 4,
                        textAlign: 'center'
                    }}
                >
                    Crear Nueva Cuenta
                </Typography>

                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Tipo de Cuenta</InputLabel>
                        <Select
                            name="tipo_cuenta"
                            value={formData.tipo_cuenta}
                            onChange={handleChange}
                            required
                            sx={{
                                backgroundColor: '#f8f9fa',
                                '&:hover': {
                                    backgroundColor: '#f3f4f6'
                                }
                            }}
                        >
                            {accountTypes?.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Moneda</InputLabel>
                        <Select
                            name="moneda"
                            value={formData.moneda}
                            onChange={handleChange}
                            required
                            sx={{
                                backgroundColor: '#f8f9fa',
                                '&:hover': {
                                    backgroundColor: '#f3f4f6'
                                }
                            }}
                        >
                            <MenuItem value="ARS">Pesos Argentinos (ARS)</MenuItem>
                            <MenuItem value="USD">Dólares (USD)</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        name="saldo_inicial"
                        label="Saldo Inicial"
                        type="number"
                        value={formData.saldo_inicial}
                        onChange={handleChange}
                        required
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f8f9fa',
                                '&:hover': {
                                    backgroundColor: '#f3f4f6'
                                }
                            }
                        }}
                    />

                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        justifyContent: 'flex-end',
                        mt: 4 
                    }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/accounts')}
                            sx={{
                                color: '#666',
                                borderColor: '#666',
                                '&:hover': {
                                    borderColor: '#444',
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                }
                            }}
                        >
                            {isLoading ? 'Creando...' : 'Crear Cuenta'}
                        </Button>
                    </Box>
                </form>

                {error && (
                    <Alert 
                        severity="error" 
                        sx={{ mt: 2 }}
                    >
                        {error}
                    </Alert>
                )}
            </Paper>
        </Container>
    );
};

export default AccountForm;