import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    fetchLoans, 
    selectAllLoans, 
    selectLoansLoading, 
    selectLoansError 
} from '../../features/loans/loansSlice';
import { 
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    CircularProgress,
    Alert,
    Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LoanList = () => {
    const dispatch = useDispatch();
    const loans = useSelector(selectAllLoans);
    const isLoading = useSelector(selectLoansLoading);
    const error = useSelector(selectLoansError);

    useEffect(() => {
        dispatch(fetchLoans());
    }, [dispatch]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'aprobado':
                return 'success';
            case 'pendiente':
                return 'warning';
            case 'rechazado':
                return 'error';
            default:
                return 'default';
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                        Mis Préstamos
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        component={Link}
                        to="/loans/apply"
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.dark'
                            },
                            borderRadius: 2,
                            px: 3
                        }}
                    >
                        Solicitar Préstamo
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {!loans || loans.length === 0 ? (
                        <Grid item xs={12}>
                            <Card sx={{ 
                                textAlign: 'center', 
                                py: 6,
                                backgroundColor: 'grey.50',
                                border: '2px dashed',
                                borderColor: 'grey.300',
                                borderRadius: 2
                            }}>
                                <CardContent>
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        No tienes préstamos activos
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        to="/loans/apply"
                                        startIcon={<AddIcon />}
                                        sx={{ 
                                            mt: 2,
                                            borderRadius: 2,
                                            px: 4,
                                            py: 1
                                        }}
                                    >
                                        Solicitar mi primer préstamo
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ) : (
                        loans.map((loan) => (
                            <Grid item xs={12} md={6} lg={4} key={loan.id}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s ease-in-out',
                                        borderRadius: 2,
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                            <Typography variant="h6" component="h2">
                                                {loan.tipo_prestamo}
                                            </Typography>
                                            <Chip 
                                                label={loan.estado}
                                                color={getStatusColor(loan.estado)}
                                                size="small"
                                                sx={{ 
                                                    fontWeight: 'medium',
                                                    borderRadius: 1.5
                                                }}
                                            />
                                        </Box>
                                        
                                        <Typography 
                                            variant="h4" 
                                            component="div" 
                                            gutterBottom 
                                            color="primary"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            ${loan.monto?.toLocaleString()}
                                        </Typography>
                                        
                                        <Box sx={{ my: 2, flexGrow: 1 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Plazo: {loan.plazo} meses
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Tasa: {loan.tasa_interes}% anual
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Cuota mensual: ${loan.cuota_mensual?.toLocaleString()}
                                            </Typography>
                                        </Box>

                                        <Button
                                            variant="outlined"
                                            component={Link}
                                            to={`/loans/${loan.id}`}
                                            endIcon={<ArrowForwardIcon />}
                                            fullWidth
                                            sx={{ 
                                                mt: 2,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontWeight: 'medium'
                                            }}
                                        >
                                            Ver Detalles
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoanList;