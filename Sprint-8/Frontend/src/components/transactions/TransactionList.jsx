import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Container,
    CircularProgress
} from '@mui/material';
import { fetchTransactions } from '../../features/accounts/accountThunks';

const TransactionList = () => {
    const dispatch = useDispatch();
    const { transactions = [] } = useSelector(state => state.accounts) || {};
    const isLoading = useSelector(state => state.accounts.isLoading);
    const error = useSelector(state => state.accounts.error);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completada':
                return '#4caf50';
            case 'pendiente':
                return '#ff9800';
            case 'rechazada':
                return '#f44336';
            default:
                return '#757575';
        }
    };

    const getTypeIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'ingreso':
                return '↑';
            case 'egreso':
                return '↓';
            case 'transferencia':
                return '↔';
            default:
                return '•';
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
                {error}
            </Typography>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper 
                elevation={3} 
                sx={{
                    p: 3,
                    backgroundColor: 'white',
                    borderRadius: 2
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ 
                        mb: 3, 
                        color: '#1976d2',
                        fontWeight: 'bold'
                    }}
                >
                    Historial de Transacciones
                </Typography>
                
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ 
                                    fontWeight: 'bold', 
                                    backgroundColor: '#f5f5f5'
                                }}>
                                    Fecha
                                </TableCell>
                                <TableCell sx={{ 
                                    fontWeight: 'bold', 
                                    backgroundColor: '#f5f5f5'
                                }}>
                                    Tipo
                                </TableCell>
                                <TableCell sx={{ 
                                    fontWeight: 'bold', 
                                    backgroundColor: '#f5f5f5'
                                }}>
                                    Monto
                                </TableCell>
                                <TableCell sx={{ 
                                    fontWeight: 'bold', 
                                    backgroundColor: '#f5f5f5'
                                }}>
                                    Estado
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <TableRow 
                                        key={transaction.id}
                                        sx={{ 
                                            '&:hover': { 
                                                backgroundColor: '#f8f9fa'
                                            }
                                        }}
                                    >
                                        <TableCell>
                                            {new Date(transaction.fecha).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 1 
                                            }}>
                                                <span style={{ fontSize: '1.2em' }}>
                                                    {getTypeIcon(transaction.tipo)}
                                                </span>
                                                {transaction.tipo}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{
                                            color: transaction.tipo?.toLowerCase() === 'ingreso' ? '#4caf50' : '#f44336',
                                            fontWeight: 'bold'
                                        }}>
                                            ${transaction.monto?.toLocaleString('es-ES', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'inline-block',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 1,
                                                backgroundColor: `${getStatusColor(transaction.estado)}20`,
                                                color: getStatusColor(transaction.estado)
                                            }}>
                                                {transaction.estado}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell 
                                        colSpan={4} 
                                        align="center"
                                        sx={{ py: 4 }}
                                    >
                                        <Typography color="text.secondary">
                                            No hay transacciones disponibles
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default TransactionList;