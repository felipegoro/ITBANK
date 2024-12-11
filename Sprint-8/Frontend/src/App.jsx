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
import AccountForm from './components/accounts/AccountForm'; 

// Páginas públicas
import About from './components/page/About';
import Contact from './components/page/Contact';
import Help from './components/page/Help';

const App = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Componente de ruta protegida
    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    // Componente de ruta de autenticación
    const AuthRoute = ({ children }) => {
        if (isAuthenticated) {
            return <Navigate to="/dashboard" replace />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                {/* Rutas de autenticación */}
                <Route element={<AuthLayout />}>
                    <Route 
                        path="/login" 
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        } 
                    />
                    <Route 
                        path="/register" 
                        element={
                            <AuthRoute>
                                <Register />
                            </AuthRoute>
                        } 
                    />
                </Route>

                {/* Rutas protegidas */}
                <Route 
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/accounts/new" element={<AccountForm />} />
                    <Route path="/accounts/:id" element={<AccountDetail />} />
                    <Route path="/accounts" element={<AccountList />} />
                    <Route path="/cards" element={<CardList />} />
                    <Route path="/cards/:id" element={<CardDetail />} />
                    <Route path="/transactions" element={<TransactionList />} />
                    <Route path="/transactions/new" element={<TransactionForm />} />
                    <Route path="/loans" element={<LoanList />} />
                    <Route path="/loans/apply" element={<LoanApplication />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<ProfileEdit />} />
                </Route>

                {/* Rutas públicas */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />

                {/* Ruta por defecto */}
                <Route 
                    path="/" 
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    } 
                />

                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;