import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/components/profile/ProfileEdit.module.css';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        telefono: user?.telefono || '',
        direccion: user?.direccion || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí irá la lógica para actualizar el perfil
            // await dispatch(updateProfile(formData));
            navigate('/profile');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    return (
        <div className={styles.editContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Editar Perfil</h1>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Información Personal</h2>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            disabled
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button 
                        type="button" 
                        className={styles.cancelButton}
                        onClick={() => navigate('/profile')}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className={styles.saveButton}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;