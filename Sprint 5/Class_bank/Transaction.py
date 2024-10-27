class Transaction:
    def __init__(self, status, transaction_type, account_number, amount, date, reason=""):
        self.status = status
        self.transaction_type = transaction_type
        self.account_number = account_number
        self.amount = amount
        self.date = date
        self.reason = reason

    def get_summary(self):
        return {
            "status": self.status,
            "transaction_type": self.transaction_type,
            "account_number": self.account_number,
            "amount": self.amount,
            "date": self.date,
            "reason": self.reason
        }

    def __str__(self):
        return f"{self.transaction_type} on {self.date}: {self.status} - Amount: {self.amount} | Reason: {self.reason}"
