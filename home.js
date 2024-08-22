document.getElementById('interestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const montoInicial = parseFloat(document.getElementById('monto').value);
    const fechaPago = new Date(document.getElementById('fecha').value);
    const fechaActual = new Date();

    // Calcular los días de diferencia
    const diasTranscurridos = Math.ceil((fechaPago - fechaActual) / (1000 * 3600 * 24));

    // Calcular el monto con interés (1% diario)
    const tasaDiaria = 0.01;
    const montoConInteres = montoInicial * Math.pow(1 + tasaDiaria, diasTranscurridos);

    // Mostrar el resultado
    document.getElementById('resultadoPrestamo').innerHTML = `
        <p>Interés calculado por ${diasTranscurridos} días:</p>
        <p>Monto total a pagar: <strong>$${montoConInteres.toFixed(2)}</strong></p>
    `;
});