from django.db import models
from clientes.models import Cliente


class AccountType(models.Model):  
    type_name = models.CharField(max_length=50)  

    def __str__(self):
        return self.type_name


class Account(models.Model):  
    customer = models.ForeignKey(Cliente, on_delete=models.CASCADE)  
    balance = models.DecimalField(max_digits=12, decimal_places=2)  
    account_type = models.ForeignKey(AccountType, on_delete=models.CASCADE)  

    def __str__(self):
        return f'{self.customer} | Saldo: ${self.balance} | {self.account_type}'
