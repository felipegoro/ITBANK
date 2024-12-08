import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    selectIsAuthenticated, 
    selectCurrentUser,
    selectAuthLoading,
    selectAuthError,
    checkAuth,
    logout
} from '../features/auth/authSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    useEffect(() => {
        // Verificar el estado de autenticación al montar el componente
        if (!isAuthenticated && !isLoading) {
            dispatch(checkAuth());
        }
    }, [dispatch, isAuthenticated, isLoading]);

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate('/login');
        } catch (error) {
            console.error('Error durante el logout:', error);
        }
    };

    const requireAuth = (callback) => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login');
            return;
        }
        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    const redirectIfAuthenticated = (path = '/dashboard') => {
        if (isAuthenticated) {
            navigate(path);
        }
    };

    return {
        isAuthenticated,
        user,
        isLoading,
        error,
        handleLogout,
        requireAuth,
        redirectIfAuthenticated
    };
};

export default useAuth;