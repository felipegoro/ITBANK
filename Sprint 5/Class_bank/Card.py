class Card:
    def __init__(self, card_number, card_type):
        self.card_number = card_number
        self.card_type = card_type

    def __str__(self):
        return f"Card Number: {self.card_number}, Card Type: {self.card_type}"
