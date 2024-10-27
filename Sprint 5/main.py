import json
import os
from Class_bank.Client import Client
from Class_bank.Transaction import Transaction

def load_transactions(filename):
    """Load transactions from a JSON file."""
    with open(filename, 'r') as file:
        data = json.load(file)
    return data

def process_transactions(data):
    """Process transaction data into Client objects."""
    clients = []
    
    for item in data:
        client = Client(item['numero'], item['nombre'], item['apellido'], item['DNI'], item.get('direccion', 'N/A'))
        for trans in item['transacciones']:
            reason = ""
            if trans['estado'] == 'RECHAZADA':
                reason = determine_rejection_reason(trans['tipo'], trans['monto'], trans['cuentaNumero'])

            transaction = Transaction(
                status=trans['estado'],
                transaction_type=trans['tipo'],
                account_number=trans['cuentaNumero'],
                amount=trans['monto'],
                date=trans['fecha'],
                reason=reason
            )
            client.add_transaction(transaction)
        clients.append(client)

    return clients

def determine_rejection_reason(transaction_type, amount, account_number):
    """Determine the reason for rejection based on transaction type and account status."""
    reasons = {
        "RETIRO_EFECTIVO_CAJERO_AUTOMATICO": "Fondos insuficientes",
        "ALTA_CHEQUERA": "No es elegible para chequera",
        "COMPRAR_DOLAR": "No tiene cuenta en dólares",
        "TRANSFERENCIA_ENVIADA": "Fondos insuficientes para la comisión de transferencia",
        "TRANSFERENCIA_RECIBIDA": "No autorizada",
    }
    return reasons.get(transaction_type, "Razón desconocida")

def generate_html_report(clients):
    """Generate an HTML report from processed clients."""
    html_content = '''
    <html>
        <head>
            <title>Informe de Transacciones</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h1 { color: #333; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1 style="color: #2C3E50;">Informe de Transacciones</h1>
    '''
    
    for client in clients:
        html_content += f'''
            <h2 style="color: #2980B9;">Cliente: {client.name} {client.last_name}</h2>
            <p><strong>DNI:</strong> {client.dni} | <strong>Dirección:</strong> {client.address}</p>
            <table>
                <tr>
                    <th>Fecha</th>
                    <th>Tipo de Transacción</th>
                    <th>Estado</th>
                    <th>Monto</th>
                    <th>Razón</th>
                </tr>
        '''
        
        for transaction in client.transactions:
            status_color = 'green' if transaction.status == 'ACEPTADA' else 'red'
            reason_display = transaction.reason if transaction.reason else "N/A"
            html_content += f'''
                <tr style="background-color: {'#E8F8F5' if transaction.status == 'ACEPTADA' else '#FDEBD0'};">
                    <td>{transaction.date}</td>
                    <td>{transaction.transaction_type}</td>
                    <td style="color: {status_color};"><strong>{transaction.status}</strong></td>
                    <td>{transaction.amount}</td>
                    <td>{reason_display}</td>
                </tr>
            '''
        
        html_content += '</table><br>'

    html_content += '''
        </body>
    </html>
    '''
    
    with open('transaction_report.html', 'w') as file:
        file.write(html_content)

if __name__ == "__main__":
    json_filename = 'transacciones.json'
    
    if os.path.exists(json_filename):
        data = load_transactions(json_filename)
        clients = process_transactions(data)
        generate_html_report(clients)
        print("Informe de transacciones generado con éxito.")
    else:
        print(f"Archivo {json_filename} no encontrado.")
