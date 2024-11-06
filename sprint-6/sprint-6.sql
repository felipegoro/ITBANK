WHERE customer_name IN ('Lois', 'Hall', 'Hilel', 'Jin', 'Gabriel');
--
DELETE FROM cliente
WHERE customer_name = 'Noel' AND customer_surname = 'David';
--
SELECT loan_type, MAX(loan_total) AS max_importe
FROM prestamo
GROUP BY loan_type
ORDER BY max_importe DESC
LIMIT 1;
--
SELECT account_id, balance
FROM   cuenta
WHERE balance < 0;

--

SELECT nombre, apellido, edad
FROM   vista_clientes
WHERE apellido LIKE '%Z%';

SELECT  customer_name, customer_surname,
strftime('%Y', 'now') - strftime('%Y', dob) - (strftime('%m-%d', 'now') < strftime('%m-%d', dob)) AS edad
FROM cliente
WHERE customer_surname LIKE '%Z%';

--

SELECT v.nombre, v.apellido, v.edad, s.branch_name as nombre_sucursal
FROM vista_clientes as v JOIN sucursal as s
ON v.numero_sucursal = s.branch_id
WHERE v.nombre='Brendan'
ORDER BY  s.branch_name;

--

SELECT loan_id, loan_total
FROM prestamo
WHERE loan_total > 8000 

UNION

SELECT loan_id, loan_total
FROM prestamo
WHERE loan_type = 'PRENDARIO';

--

SELECT loan_id, loan_total
FROM prestamo
WHERE loan_total > (SELECT AVG(loan_total) FROM prestamo);

--

SELECT count(edad) AS menores_50
FROM vista_clientes
WHERE edad < 50;

--

SELECT account_id, balance
FROM cuenta 
WHERE balance > 800000
LIMIT 5;

--

SELECT loan_id,  loan_date, loan_total
FROM prestamo
WHERE loan_date LIKE '%-04-%' OR loan_date LIKE '%-06-%' OR loan_date LIKE '%-08-%'
ORDER BY loan_total DESC;

--

SELECT loan_type, sum(loan_total) AS  loan_total_accu
FROM prestamo
GROUP BY loan_type;
--
SELECT s.branch_name AS sucursal, COUNT(c.customer_id) AS cantidad_clientes
FROM sucursal s
JOIN cliente c ON s.branch_id = c.branch_id
GROUP BY s.branch_name
ORDER BY cantidad_clientes DESC;

--
SELECT s.branch_name AS sucursal,
       CAST(COUNT(e.employee_id) AS REAL) / NULLIF(COUNT(DISTINCT c.customer_id), 0) AS empleados_por_cliente
FROM sucursal s
LEFT JOIN cliente c ON s.branch_id = c.branch_id
LEFT JOIN empleado e ON s.branch_id = e.branch_id
GROUP BY s.branch_name;
--
SELECT s.branch_name AS sucursal, AVG(p.loan_total) AS promedio_creditos
FROM prestamo p
JOIN cliente c ON p.customer_id = c.customer_id
JOIN sucursal s ON c.branch_id = s.branch_id
GROUP BY s.branch_name;
--
CREATE TABLE IF NOT EXISTS auditoria_cuenta (
    old_id INTEGER,
    new_id INTEGER,
    old_balance REAL,
    new_balance REAL,
    old_iban TEXT,
    new_iban TEXT,
    old_type TEXT,
    new_type TEXT,
    user_action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
CREATE TRIGGER IF NOT EXISTS cuenta_update_audit
AFTER UPDATE OF balance, iban, tipo_cuenta ON cuenta
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_cuenta (
        old_id, new_id, old_balance, new_balance, 
        old_iban, new_iban, old_type, new_type, 
        user_action, created_at
    )
    VALUES (
        OLD.account_id, NEW.account_id, 
        OLD.balance, NEW.balance, 
        OLD.iban, NEW.iban, 
        OLD.tipo_cuenta, NEW.tipo_cuenta, 
        'update', CURRENT_TIMESTAMP
    );
END;

--
UPDATE cuenta
SET balance = balance - 10000
WHERE account_id IN (10, 11, 12, 13, 14);

--
CREATE INDEX IF NOT EXISTS idx_cliente_dni ON cliente(customer_DNI);

--
CREATE TABLE IF NOT EXISTS movimientos (
    movimiento_id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_cuenta INTEGER,
    monto REAL,
    tipo_operacion TEXT,
    hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (numero_cuenta) REFERENCES cuenta(account_id)
);

--
BEGIN TRANSACTION;

--
UPDATE cuenta
SET balance = balance - 100000
WHERE account_id = 200;

--
UPDATE cuenta
SET balance = balance + 100000
WHERE account_id = 400;

--
INSERT INTO movimientos (numero_cuenta, monto, tipo_operacion)
VALUES (200, -100000, 'transferencia');

--
INSERT INTO movimientos (numero_cuenta, monto, tipo_operacion)
VALUES (400, 100000, 'transferencia');

--
COMMIT;

--
ROLLBACK;
