import React from 'react';
import { Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import AccountList from './components/accounts/AccountList';
import AccountDetail from './components/accounts/AccountDetail';
import CardList from './components/cards/CardList';
import CardDetail from './components/cards/CardDetail';
import LoanList from './components/loans/LoanList';
import LoanApplication from './components/loans/LoanApplication';
import LoanDetail from './components/loans/LoanDetail';
import TransactionList from './components/transactions/TransactionList';
import TransactionForm from './components/transactions/TransactionForm';
import TransactionDetail from './components/transactions/TransactionDetail';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import NotFound from './components/common/NotFound';

// Rutas públicas
const publicRoutes = [
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'reset-password/:token', element: <ResetPassword /> },
            { path: '', element: <Navigate to="/login" replace /> }
        ]
    }
];

// Rutas protegidas
const protectedRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // Dashboard
            { 
                path: 'dashboard',
                element: <Dashboard />,
                title: 'Dashboard',
                icon: 'dashboard'
            },
            
            // Cuentas
            {
                path: 'accounts',
                title: 'Cuentas',
                icon: 'account_balance',
                children: [
                    { path: '', element: <AccountList /> },
                    { path: ':accountId', element: <AccountDetail /> }
                ]
            },
            
            // Tarjetas
            {
                path: 'cards',
                title: 'Tarjetas',
                icon: 'credit_card',
                children: [
                    { path: '', element: <CardList /> },
                    { path: ':cardId', element: <CardDetail /> }
                ]
            },
            
            // Préstamos
            {
                path: 'loans',
                title: 'Préstamos',
                icon: 'payments',
                children: [
                    { path: '', element: <LoanList /> },
                    { path: 'apply', element: <LoanApplication /> },
                    { path: ':loanId', element: <LoanDetail /> }
                ]
            },
            
            // Transacciones
            {
                path: 'transactions',
                title: 'Transacciones',
                icon: 'swap_horiz',
                children: [
                    { path: '', element: <TransactionList /> },
                    { path: 'new', element: <TransactionForm /> },
                    { path: ':transactionId', element: <TransactionDetail /> }
                ]
            },
            
            // Perfil y Configuración
            {
                path: 'profile',
                title: 'Perfil',
                icon: 'person',
                element: <Profile />
            },
            {
                path: 'settings',
                title: 'Configuración',
                icon: 'settings',
                element: <Settings />
            },
            
            // Redirección por defecto
            { 
                path: '', 
                element: <Navigate to="/dashboard" replace /> 
            }
        ]
    }
];

// Ruta 404
const notFoundRoute = {
    path: '*',
    element: <NotFound />
};

// Función para verificar autenticación
const withAuth = (routes) => {
    return routes.map(route => ({
        ...route,
        element: route.auth ? (
            <RequireAuth>{route.element}</RequireAuth>
        ) : (
            route.element
        )
    }));
};

// Componente de protección de rutas
const RequireAuth = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// Configuración final de rutas
const routes = [
    ...publicRoutes,
    ...withAuth(protectedRoutes),
    notFoundRoute
];

// Exportaciones
export { routes, publicRoutes, protectedRoutes };
export default routes;

// Utilidades de navegación
export const getRouteByPath = (path) => {
    const findRoute = (routes, targetPath) => {
        for (const route of routes) {
            if (route.path === targetPath) return route;
            if (route.children) {
                const found = findRoute(route.children, targetPath);
                if (found) return found;
            }
        }
        return null;
    };

    return findRoute([...publicRoutes, ...protectedRoutes], path);
};

export const getBreadcrumbs = (path) => {
    const parts = path.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';

    parts.forEach(part => {
        currentPath += `/${part}`;
        const route = getRouteByPath(currentPath);
        if (route && route.title) {
            breadcrumbs.push({
                path: currentPath,
                title: route.title
            });
        }
    });

    return breadcrumbs;
};