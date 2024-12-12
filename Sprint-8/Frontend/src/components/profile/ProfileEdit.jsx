import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,  } from 'react-redux';
import styles from '../../styles/components/profile/ProfileEdit.module.css';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        apellido: user?.apellido || '',
        email: user?.email || '',
        telefono: user?.telefono || '',
        direccion: user?.direccion || '',
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
            // Aquí iría la lógica para actualizar el perfil
            navigate('/profile');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    return (
        <div className={styles.editContainer}>
            <h1 className={styles.title}>Editar Perfil</h1>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formSection}>
                    <h3>Información Personal</h3>
                    <div className={styles.formGroup}>
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className={styles.input}
                            disabled
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Dirección</label>
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