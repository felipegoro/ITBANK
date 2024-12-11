import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAccountDetail, 
    transferFunds, 
    fetchAccountMovements 
} from '../../features/accounts/accountThunks';
import { clearTransferStatus } from '../../features/accounts/accountsSlice';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Modal,
    TextField,
    CircularProgress,
    Alert,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../styles/components/accounts/AccountDetail.module.css';

const AccountDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { 
        selectedAccount, 
        movements, 
        isLoading, 
        transferStatus,
        error 
    } = useSelector((state) => state.accounts);

    const [showTransferModal, setShowTransferModal] = useState(false);
    const [transferData, setTransferData] = useState({
        monto: '',
        cuenta_destino: '',
        descripcion: ''
    });

    // Función auxiliar para extraer mensaje de error
    const getErrorMessage = (error) => {
        if (typeof error === 'string') return error;
        if (error?.detail) return error.detail;
        if (error?.message) return error.message;
        if (error?.messages) return error.messages.join(', ');
        return 'Ha ocurrido un error';
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchAccountDetail(id));
            dispatch(fetchAccountMovements(id));
        }
        return () => {
            dispatch(clearTransferStatus());
        };
    }, [dispatch, id]);

    const handleTransfer = async (e) => {
        e.preventDefault();
        const result = await dispatch(transferFunds({
            accountId: id,
            transferData
        }));

        if (!result.error) {
            setShowTransferModal(false);
            setTransferData({ monto: '', cuenta_destino: '', descripcion: '' });
            dispatch(fetchAccountDetail(id));
            dispatch(fetchAccountMovements(id));
        }
    };

    if (isLoading && !selectedAccount) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className={styles.accountDetailContainer}>
            <Card>
                {error && (
                    <Alert severity="error" sx={{ m: 2 }}>
                        {getErrorMessage(error)}
                    </Alert>
                )}
                
                <CardContent>
                    <Box className={styles.header}>
                        <Button
                            component={Link}
                            to="/accounts"
                            startIcon={<ArrowBackIcon />}
                            sx={{ mb: 2 }}
                        >
                            Volver
                        </Button>
                        <Typography variant="h5" component="h2">
                            {selectedAccount?.tipo_cuenta?.nombre}
                        </Typography>
                    </Box>

                    <Box className={styles.balanceSection}>
                        <Typography variant="subtitle1">Saldo Disponible</Typography>
                        <Typography variant="h4">
                            {selectedAccount?.moneda} {selectedAccount?.saldo?.toLocaleString()}
                        </Typography>
                    </Box>

                    <Box className={styles.actionsSection}>
                        <Button
                            variant="contained"
                            onClick={() => setShowTransferModal(true)}
                            sx={{ mr: 2 }}
                        >
                            Transferir
                        </Button>
                        <Button variant="outlined">
                            Pagar Servicios
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom>
                        Últimos Movimientos
                    </Typography>

                    {movements?.map((movement) => (
                        <Card key={movement.id} sx={{ mb: 1, p: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="subtitle1">
                                        {movement.tipo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(movement.fecha).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Typography 
                                    variant="subtitle1"
                                    color={movement.tipo === 'DEPOSITO' ? 'success.main' : 'error.main'}
                                >
                                    {movement.tipo === 'DEPOSITO' ? '+' : '-'}
                                    {movement.monto?.toLocaleString()}
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <Modal
                open={showTransferModal}
                onClose={() => setShowTransferModal(false)}
            >
                <Box className={styles.modalContent}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Realizar Transferencia
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {getErrorMessage(error)}
                        </Alert>
                    )}

                    <form onSubmit={handleTransfer}>
                        <TextField
                            fullWidth
                            label="Monto"
                            type="number"
                            value={transferData.monto}
                            onChange={(e) => setTransferData({
                                ...transferData,
                                monto: e.target.value
                            })}
                            sx={{ mb: 2 }}
                            required
                            inputProps={{ min: "0", step: "0.01" }}
                        />
                        <TextField
                            fullWidth
                            label="CBU/Alias destino"
                            value={transferData.cuenta_destino}
                            onChange={(e) => setTransferData({
                                ...transferData,
                                cuenta_destino: e.target.value
                            })}
                            sx={{ mb: 2 }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Descripción"
                            value={transferData.descripcion}
                            onChange={(e) => setTransferData({
                                ...transferData,
                                descripcion: e.target.value
                            })}
                            sx={{ mb: 2 }}
                            multiline
                            rows={2}
                        />
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button
                                onClick={() => setShowTransferModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={transferStatus === 'loading'}
                            >
                                {transferStatus === 'loading' ? (
                                    <CircularProgress size={24} />
                                ) : 'Transferir'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default AccountDetail;