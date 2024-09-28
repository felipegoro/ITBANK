"use client";
import React from 'react';
import { useState } from 'react';
import '../styles/Formulario.css';

export default function Formulario() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: '',
    });

const handleChange = (e) => {
     setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/Formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.ok) {
        alert('Mensaje enviado con éxito.');
        setFormData({ nombre: '', email: '', mensaje: '' });
    } else {
        alert('Error al enviar el mensaje.');
    }
};

return (
    <div>
        <h1>Formulario de Contacto</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    required
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
);
}
