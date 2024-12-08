import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/components/profile/Profile.module.css';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="profile-container">
            <h2>Mi Perfil</h2>
            <div className="profile-info">
                <div className="info-group">
                    <label>Nombre:</label>
                    <span>{user?.nombre}</span>
                </div>
                <div className="info-group">
                    <label>Apellido:</label>
                    <span>{user?.apellido}</span>
                </div>
                <div className="info-group">
                    <label>Email:</label>
                    <span>{user?.email}</span>
                </div>
                <div className="info-group">
                    <label>DNI:</label>
                    <span>{user?.dni}</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;