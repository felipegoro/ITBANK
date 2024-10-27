class Client:
    def __init__(self, number, name, last_name, dni, address):
        self.number = number
        self.name = name
        self.last_name = last_name
        self.dni = dni
        self.address = address
        self.transactions = []

    def add_transaction(self, transaction):
        self.transactions.append(transaction)

    def get_summary(self):
        summary = {
            "number": self.number,
            "name": self.name,
            "last_name": self.last_name,
            "dni": self.dni,
            "address": self.address,
            "transactions": [trans.get_summary() for trans in self.transactions]
        }
        return summary
