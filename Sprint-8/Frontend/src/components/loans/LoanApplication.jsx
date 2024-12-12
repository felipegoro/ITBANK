import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Alert,
    CircularProgress,
    InputAdornment,
    Stack
} from '@mui/material';
import { 
    fetchLoanTypes, 
    applyForLoan, 
    selectLoanTypes,
    selectApplyStatus,
    selectLoansError
} from '../../features/loans/loansSlice';

const LoanApplication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loanTypes = useSelector(selectLoanTypes);
    const status = useSelector(selectApplyStatus);
    const error = useSelector(selectLoansError);

    const [formData, setFormData] = useState({
        tipo_prestamo: '',
        monto: '',
        plazo: '',
        ingreso_mensual: '',
        motivo: ''
    });

    useEffect(() => {
        dispatch(fetchLoanTypes());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(applyForLoan(formData));
        if (!result.error) {
            navigate('/loans');
        }
    };

    const plazos = [6, 12, 18, 24, 36, 48, 60];

    return (
        <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: { xs: 3, md: 5 }, 
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    boxShadow: theme => theme.shadows[8]
                }}
            >
                <Stack spacing={4}>
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        color="primary" 
                        align="center"
                        sx={{ 
                            fontWeight: 'bold',
                            mb: 2
                        }}
                    >
                        Solicitar Nuevo Préstamo
                    </Typography>

                    {error && (
                        <Alert 
                            severity="error" 
                            variant="filled"
                            sx={{ borderRadius: 2 }}
                            action={
                                <Button 
                                    color="inherit" 
                                    size="small" 
                                    onClick={() => navigate('/login')}
                                >
                                    Iniciar Sesión
                                </Button>
                            }
                        >
                            {error}
                        </Alert>
                    )}

                    <Box 
                        component="form" 
                        onSubmit={handleSubmit} 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 3 
                        }}
                    >
                        <TextField
                            select
                            fullWidth
                            label="Tipo de Préstamo"
                            name="tipo_prestamo"
                            value={formData.tipo_prestamo}
                            onChange={handleChange}
                            required
                            sx={{ backgroundColor: 'background.paper' }}
                        >
                            {loanTypes.map((type) => (
                                <MenuItem key={type.id} value={type.nombre}>
                                    {type.nombre}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Monto Solicitado"
                            name="monto"
                            type="number"
                            value={formData.monto}
                            onChange={handleChange}
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            sx={{ backgroundColor: 'background.paper' }}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Plazo (meses)"
                            name="plazo"
                            value={formData.plazo}
                            onChange={handleChange}
                            required
                            sx={{ backgroundColor: 'background.paper' }}
                        >
                            {plazos.map((plazo) => (
                                <MenuItem key={plazo} value={plazo}>
                                    {plazo} meses
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Ingreso Mensual"
                            name="ingreso_mensual"
                            type="number"
                            value={formData.ingreso_mensual}
                            onChange={handleChange}
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            sx={{ backgroundColor: 'background.paper' }}
                        />

                        <TextField
                            fullWidth
                            label="Motivo del Préstamo"
                            name="motivo"
                            multiline
                            rows={4}
                            value={formData.motivo}
                            onChange={handleChange}
                            required
                            sx={{ backgroundColor: 'background.paper' }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={status === 'loading'}
                            sx={{
                                py: 2,
                                mt: 2,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: 4,
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {status === 'loading' ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Solicitar Préstamo'
                            )}
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default LoanApplication;