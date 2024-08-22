async function valorDolar(moneda) {
    let url = "https://api.bluelytics.com.ar/v2/latest";
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Accede al valor correspondiente según la moneda solicitada
        if (data[moneda]) {
            let valor = data[moneda].value_avg;
            console.log(valor);
            return valor;
        } else {
            console.error('Moneda no encontrada');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

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


document.getElementById('currencyConverter').addEventListener('submit', async function(event) {
event.preventDefault();

let montoAConvertir = parseFloat(document.getElementById('montopesos').value);
let monedaInput = document.getElementById('moneda').value;

let moneda;
    switch (monedaInput) {
        case 'Dolar Oficial':
            moneda = 'oficial';
            break;
        case 'Dolar Blue':
            moneda = 'blue';
            break;
        case 'Euro Oficial':
            moneda = 'oficial_euro';
            break;
        case 'Euro Blue':
            moneda = 'blue_euro';
            break;
        default:
            console.error('Moneda no válida');
            return;
    }

let Dolar = await valorDolar(moneda);
let valorConvertido = montoAConvertir / Dolar;

document.getElementById('resultadoPrestamo').innerHTML = `
        <p>Son ${valorConvertido.toFixed(2)} ${monedaInput}</p>
    `;
});




