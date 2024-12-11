import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Alert,
    CircularProgress
} from '@mui/material';
import { fetchAccountTypes, createAccount } from '../../features/accounts/accountThunks';

const AccountForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accountTypes, isLoading, error } = useSelector(state => state.accounts);

    const [formData, setFormData] = useState({
        tipo_cuenta: '',
        moneda: '',
        saldo_inicial: ''
    });

    useEffect(() => {
        dispatch(fetchAccountTypes());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createAccount(formData)).unwrap();
            navigate('/accounts');
        } catch (error) {
            console.error('Error al crear la cuenta:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Crear Nueva Cuenta
            </Typography>

            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Tipo de Cuenta</InputLabel>
                            <Select
                                name="tipo_cuenta"
                                value={formData.tipo_cuenta}
                                onChange={handleChange}
                                required
                            >
                                {accountTypes.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Moneda</InputLabel>
                            <Select
                                name="moneda"
                                value={formData.moneda}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="ARS">Pesos (ARS)</MenuItem>
                                <MenuItem value="USD">Dólares (USD)</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Saldo Inicial"
                            name="saldo_inicial"
                            type="number"
                            value={formData.saldo_inicial}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            required
                            InputProps={{
                                inputProps: { min: 0, step: "0.01" }
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => navigate('/accounts')}
                                variant="outlined"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                            >
                                Crear Cuenta
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AccountForm;