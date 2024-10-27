class Account:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.balance = balance

    def update_balance(self, amount):
        self.balance += amount

    def get_balance(self):
        return self.balance

    def __str__(self):
        return f"Account Number: {self.account_number}, Balance: {self.balance}"
