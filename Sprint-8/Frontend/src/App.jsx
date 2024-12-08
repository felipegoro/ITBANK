import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import AccountList from './components/accounts/AccountList';
import AccountDetail from './components/accounts/AccountDetail';
import CardList from './components/cards/CardList';
import CardDetail from './components/cards/CardDetail';
import TransactionList from './components/transactions/TransactionList';
import TransactionForm from './components/transactions/TransactionForm';
import LoanList from './components/loans/LoanList';
import LoanApplication from './components/loans/LoanApplication';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';
import NotFound from './components/common/NotFound';
import './styles/index.css';  // Añade esta línea al inicio de tus imports

const App = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route element={<AuthLayout />}>
                    <Route 
                        path="/login" 
                        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
                    />
                    <Route 
                        path="/register" 
                        element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} 
                    />
                </Route>

                {/* Rutas protegidas */}
                <Route element={<MainLayout />}>
                    <Route 
                        path="/dashboard" 
                        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/accounts" 
                        element={isAuthenticated ? <AccountList /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/accounts/:id" 
                        element={isAuthenticated ? <AccountDetail /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/cards" 
                        element={isAuthenticated ? <CardList /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/cards/:id" 
                        element={isAuthenticated ? <CardDetail /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/transactions" 
                        element={isAuthenticated ? <TransactionList /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/transactions/new" 
                        element={isAuthenticated ? <TransactionForm /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/loans" 
                        element={isAuthenticated ? <LoanList /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/loans/apply" 
                        element={isAuthenticated ? <LoanApplication /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/profile" 
                        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/profile/edit" 
                        element={isAuthenticated ? <ProfileEdit /> : <Navigate to="/login" />} 
                    />
                </Route>

                {/* Ruta por defecto */}
                <Route 
                    path="/" 
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
                />
                
                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;