class Report:
    def __init__(self, cliente):
        self.cliente = cliente

    def generar_html(self, nombre_archivo):
        html_contenido = f"""
        <html>
        <head>
            <title>Reporte de Transacciones</title>
            <style>
                table {{ border-collapse: collapse; width: 100%; }}
                th, td {{ border: 1px solid black; padding: 8px; text-align: left; }}
                th {{ background-color: #f2f2f2; }}
            </style>
        </head>
        <body>
            <h1>Reporte de Transacciones - {self.cliente.nombre} {self.cliente.apellido}</h1>
            <p><strong>DNI:</strong> {self.cliente.dni}</p>
            <p><strong>Tipo de Cliente:</strong> {self.cliente.tipo}</p>
            
            <h2>Transacciones</h2>
            <table>
                <tr>
                    <th>Fecha</th>
                    <th>Tipo de Operación</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Razón de Rechazo</th>
                </tr>"""
        
        for transaccion in self.cliente.transacciones:
            html_contenido += f"""
                <tr>
                    <td>{transaccion.get('fecha', 'N/A')}</td>
                    <td>{transaccion['tipo']}</td>
                    <td>{transaccion['monto']}</td>
                    <td>{transaccion['estado']}</td>
                    <td>{transaccion.get('razonRechazo', '')}</td>
                </tr>"""
        
        html_contenido += """
            </table>
        </body>
        </html>
        """
        
        # Guardar el contenido HTML en un archivo
        with open(nombre_archivo, 'w') as file:
            file.write(html_contenido)
        print(f"Reporte generado: {nombre_archivo}")
