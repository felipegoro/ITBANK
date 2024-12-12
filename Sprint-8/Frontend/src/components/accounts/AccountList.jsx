import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAccounts } from '../../features/accounts/accountThunks';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    Container,
    Paper,
    useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const AccountList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accounts = [], isLoading, error } = useSelector((state) => state.accounts);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    if (isLoading) {
        return (
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Alert 
                    severity="error" 
                    sx={{ 
                        mt: 4,
                        borderRadius: 2,
                        boxShadow: theme.shadows[3]
                    }}
                >
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                {/* Header */}
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 3, 
                        mb: 4, 
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        borderRadius: 2
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Mis Cuentas
                            </Typography>
                            <Typography variant="subtitle1">
                                Gestiona tus cuentas bancarias
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/accounts/new')}
                            sx={{
                                backgroundColor: 'white',
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[100],
                                }
                            }}
                        >
                            Nueva Cuenta
                        </Button>
                    </Box>
                </Paper>

                {Array.isArray(accounts) && accounts.length > 0 ? (
                    <Grid container spacing={3}>
                        {accounts.map((account) => (
                            <Grid item xs={12} sm={6} md={4} key={account.id}>
                                <Card 
                                    sx={{ 
                                        cursor: 'pointer',
                                        '&:hover': { 
                                            transform: 'translateY(-4px)',
                                            boxShadow: theme.shadows[8]
                                        },
                                        transition: 'all 0.3s ease',
                                        borderRadius: 2,
                                        position: 'relative',
                                        overflow: 'visible'
                                    }}
                                    onClick={() => navigate(`/accounts/${account.id}`)}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -20,
                                            left: 20,
                                            backgroundColor: theme.palette.secondary.main,
                                            borderRadius: '50%',
                                            width: 40,
                                            height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <AccountBalanceIcon />
                                    </Box>
                                    <CardContent sx={{ pt: 4 }}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ mb: 1, color: theme.palette.text.primary }}
                                        >
                                            {account.tipo_cuenta}
                                        </Typography>
                                        <Typography 
                                            color="textSecondary" 
                                            sx={{ mb: 2, fontSize: '0.875rem' }}
                                        >
                                            {account.numero_cuenta}
                                        </Typography>
                                        <Typography 
                                            variant="h5" 
                                            sx={{ 
                                                fontWeight: 'bold',
                                                color: theme.palette.primary.main 
                                            }}
                                        >
                                            ${account.saldo?.toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper 
                        sx={{ 
                            textAlign: 'center', 
                            py: 8,
                            px: 3,
                            borderRadius: 2,
                            backgroundColor: theme.palette.grey[50]
                        }}
                    >
                        <AccountBalanceIcon 
                            sx={{ 
                                fontSize: 60, 
                                color: theme.palette.grey[300],
                                mb: 2
                            }} 
                        />
                        <Typography 
                            variant="h6" 
                            color="textSecondary"
                            gutterBottom
                        >
                            No tienes cuentas creadas aún
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="textSecondary"
                            sx={{ mb: 3 }}
                        >
                            Comienza creando tu primera cuenta bancaria
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/accounts/new')}
                            size="large"
                        >
                            Crear mi primera cuenta
                        </Button>
                    </Paper>
                )}
            </Box>
        </Container>
    );
};

export default AccountList;