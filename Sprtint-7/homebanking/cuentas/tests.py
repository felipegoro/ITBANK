from django.test import TestCase
from .models import AccountType, Account
from clientes.models import Cliente


class AccountsTestCase(TestCase):
    def setUp(self):
        
        self.client = Cliente.objects.create(
            nombre="María", apellido="García", dni="87654321", fecha_nacimiento="1985-03-15"
        )
        self.account_type_credit = AccountType.objects.create(type_name="Crédito")
        self.account_type_debit = AccountType.objects.create(type_name="Débito")

       
        self.account_credit = Account.objects.create(
            customer=self.client, balance=5000, account_type=self.account_type_credit
        )
        self.account_debit = Account.objects.create(
            customer=self.client, balance=2000, account_type=self.account_type_debit
        )

    def test_account_creation(self):
        self.assertEqual(str(self.account_credit), "María García | Saldo: $5000.00 | Crédito")
        self.assertEqual(str(self.account_debit), "María García | Saldo: $2000.00 | Débito")
