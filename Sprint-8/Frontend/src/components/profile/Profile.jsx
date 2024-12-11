import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit, FaUser } from 'react-icons/fa';
import styles from '../../styles/components/profile/Profile.module.css';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.header}>
                <h1>Mi Perfil</h1>
                <Link to="/profile/edit" className={styles.editButton}>
                    <FaEdit /> Editar Perfil
                </Link>
            </div>

            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatarContainer}>
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Perfil" className={styles.avatar} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>
                                <FaUser />
                            </div>
                        )}
                    </div>
                    <div className={styles.userMainInfo}>
                        <h2>{`${user?.nombre || 'Usuario'} ${user?.apellido || ''}`}</h2>
                        <span className={styles.userType}>Cliente Personal</span>
                    </div>
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.infoSection}>
                        <h3>Información Personal</h3>
                        <div className={styles.infoContainer}>
                            <div className={styles.infoItem}>
                                <label>Nombre completo</label>
                                <span>{`${user?.nombre || '-'} ${user?.apellido || '-'}`}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <label>DNI</label>
                                <span>{user?.dni || '-'}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <h3>Información de Contacto</h3>
                        <div className={styles.infoContainer}>
                            <div className={styles.infoItem}>
                                <label>Email</label>
                                <span>{user?.email || '-'}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Teléfono</label>
                                <span>{user?.telefono || '-'}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Dirección</label>
                                <span>{user?.direccion || 'No especificada'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;